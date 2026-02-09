-- Metal Building Estimator — Initial Schema
-- ============================================================

-- Building styles and their base pricing
CREATE TABLE building_styles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('metal_building', 'post_frame', 'carport', 'shed')),
  base_prices JSONB NOT NULL DEFAULT '{}',
  available_options JSONB,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Configurable options and their prices
CREATE TABLE pricing_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  price_modifier DECIMAL(10,2) DEFAULT 0,
  price_type TEXT DEFAULT 'flat' CHECK (price_type IN ('flat', 'per_sqft', 'per_linear_ft')),
  metadata JSONB,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Lean-to addition pricing
CREATE TABLE lean_to_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_prices JSONB NOT NULL DEFAULT '{}',
  connection_fee DECIMAL(10,2) DEFAULT 120,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Wall enclosure options
CREATE TABLE wall_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  applicable_positions TEXT[] NOT NULL,
  siding_styles TEXT[],
  base_price DECIMAL(10,2) DEFAULT 0,
  price_type TEXT DEFAULT 'flat',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Door options
CREATE TABLE door_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('garage', 'walk', 'frameout')),
  name TEXT NOT NULL,
  width_ft DECIMAL(5,2),
  height_ft DECIMAL(5,2),
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Saved customer configurations / quotes
CREATE TABLE configurations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  delivery_zip TEXT,
  delivery_region TEXT,
  config_data JSONB NOT NULL,
  pricing_snapshot JSONB,
  building_estimate DECIMAL(10,2) NOT NULL,
  material_surcharge DECIMAL(10,2) NOT NULL DEFAULT 0,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,4) NOT NULL DEFAULT 0,
  total_tax DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  deposit_percent DECIMAL(5,2) NOT NULL DEFAULT 10,
  deposit_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  balance_due DECIMAL(10,2) NOT NULL DEFAULT 0,
  additional_comments TEXT,
  screenshot_urls TEXT[],
  pdf_url TEXT,
  status TEXT DEFAULT 'submitted' CHECK (status IN ('draft', 'submitted', 'contacted', 'won', 'lost')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Company / admin settings
CREATE TABLE admin_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT DEFAULT 'Metal Buildings Co.',
  company_logo_url TEXT,
  company_phone TEXT,
  company_email TEXT,
  company_address TEXT,
  default_tax_rate DECIMAL(5,4) DEFAULT 0.06,
  default_deposit_percent DECIMAL(5,2) DEFAULT 10,
  material_surcharge_percent DECIMAL(5,4) DEFAULT 0.15,
  notification_email TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_configurations_status ON configurations(status);
CREATE INDEX idx_configurations_created ON configurations(created_at DESC);
-- NOTE: No index needed on configurations(quote_number) — UNIQUE constraint creates one.
CREATE INDEX idx_pricing_options_category ON pricing_options(category);
CREATE INDEX idx_building_styles_category ON building_styles(category);

-- Enable RLS on all tables
ALTER TABLE building_styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE lean_to_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE wall_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE door_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Public read for pricing tables (anyone can view prices)
CREATE POLICY "Anyone can read building_styles" ON building_styles FOR SELECT USING (true);
CREATE POLICY "Anyone can read pricing_options" ON pricing_options FOR SELECT USING (true);
CREATE POLICY "Anyone can read lean_to_pricing" ON lean_to_pricing FOR SELECT USING (true);
CREATE POLICY "Anyone can read wall_options" ON wall_options FOR SELECT USING (true);
CREATE POLICY "Anyone can read door_options" ON door_options FOR SELECT USING (true);
CREATE POLICY "Anyone can read admin_settings" ON admin_settings FOR SELECT USING (true);

-- Anyone can insert configurations (customer submissions)
CREATE POLICY "Anyone can insert configurations" ON configurations FOR INSERT WITH CHECK (true);

-- TODO: Replace this open SELECT policy with an RPC function that returns only
-- non-PII columns (config_data, pricing_snapshot, building_estimate, etc.) filtered
-- by quote_number. Postgres RLS cannot restrict columns, so use a security-definer
-- view or function to hide customer_name, customer_email, customer_phone.
CREATE POLICY "Public read configurations"
  ON configurations FOR SELECT USING (true);

-- Admin write policies (requires admin role in JWT custom claims)
CREATE POLICY "Admins can manage building_styles"
  ON building_styles FOR ALL USING (auth.jwt() ->> 'user_role' = 'admin');
CREATE POLICY "Admins can manage pricing_options"
  ON pricing_options FOR ALL USING (auth.jwt() ->> 'user_role' = 'admin');
CREATE POLICY "Admins can manage lean_to_pricing"
  ON lean_to_pricing FOR ALL USING (auth.jwt() ->> 'user_role' = 'admin');
CREATE POLICY "Admins can manage wall_options"
  ON wall_options FOR ALL USING (auth.jwt() ->> 'user_role' = 'admin');
CREATE POLICY "Admins can manage door_options"
  ON door_options FOR ALL USING (auth.jwt() ->> 'user_role' = 'admin');
CREATE POLICY "Admins can update configurations"
  ON configurations FOR UPDATE USING (auth.jwt() ->> 'user_role' = 'admin');
CREATE POLICY "Admins can manage admin_settings"
  ON admin_settings FOR ALL USING (auth.jwt() ->> 'user_role' = 'admin');

-- Singleton constraint: ensure only one row in admin_settings.
-- We add a column that is always TRUE and put a UNIQUE constraint on it.
ALTER TABLE admin_settings ADD COLUMN is_singleton BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE admin_settings ADD CONSTRAINT admin_settings_singleton UNIQUE (is_singleton);
ALTER TABLE admin_settings ADD CONSTRAINT admin_settings_singleton_check CHECK (is_singleton = TRUE);

-- Auto-update updated_at on row modification
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_configurations_updated_at
  BEFORE UPDATE ON configurations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_admin_settings_updated_at
  BEFORE UPDATE ON admin_settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Insert default admin settings
INSERT INTO admin_settings (company_name, default_tax_rate, default_deposit_percent, material_surcharge_percent)
VALUES ('Metal Buildings Co.', 0.06, 10, 0.15);
