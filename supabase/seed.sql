-- Seed data based on IdeaRoom / Elite Buildings reference
-- ============================================================

-- Building Styles
INSERT INTO building_styles (name, category, base_prices, sort_order) VALUES
  ('Step Down Barn', 'metal_building', '{"12x20": 1800, "12x21": 1890, "15x20": 2340, "15x21": 2460, "18x20": 2700, "18x21": 2835, "20x20": 3000, "20x21": 3150, "20x25": 3750, "20x30": 4500, "24x25": 4500, "24x30": 5400, "24x35": 6300, "24x40": 7200, "30x30": 6750, "30x35": 7875, "30x40": 9000, "30x50": 11250}', 1),
  ('Regular Barn', 'metal_building', '{"12x20": 1680, "12x21": 1764, "15x20": 2100, "15x21": 2205, "18x20": 2520, "18x21": 2646, "20x20": 2800, "20x21": 2940, "20x25": 3500, "20x30": 4200, "24x25": 4200, "24x30": 5040, "24x35": 5880, "24x40": 6720, "30x30": 6300, "30x35": 7350, "30x40": 8400, "30x50": 10500}', 2),
  ('A-Frame Vertical', 'metal_building', '{"12x20": 1920, "12x21": 2016, "15x20": 2400, "15x21": 2520, "18x20": 2880, "18x21": 3024, "20x20": 3200, "20x21": 3360, "20x25": 4000, "20x30": 4800, "24x25": 4800, "24x30": 5760, "24x35": 6720, "24x40": 7680, "30x30": 7200, "30x35": 8400, "30x40": 9600, "30x50": 12000}', 3),
  ('Regular Style', 'carport', '{"12x20": 1200, "12x21": 1260, "15x20": 1500, "15x21": 1575, "18x20": 1800, "18x21": 1890, "20x20": 2000, "20x21": 2100, "24x25": 3000, "24x30": 3600, "30x30": 4500, "30x40": 6000}', 1),
  ('A-Frame Carport', 'carport', '{"12x20": 1440, "12x21": 1512, "15x20": 1800, "15x21": 1890, "18x20": 2160, "18x21": 2268, "20x20": 2400, "20x21": 2520, "24x25": 3600, "24x30": 4320, "30x30": 5400, "30x40": 7200}', 2),
  ('Post Frame Barn', 'post_frame', '{"20x20": 4500, "20x30": 6750, "24x30": 8100, "24x40": 10800, "30x30": 10125, "30x40": 13500, "30x50": 16875, "40x40": 18000, "40x60": 27000}', 1),
  ('Garden Shed', 'shed', '{"8x10": 1200, "8x12": 1440, "10x10": 1500, "10x12": 1800, "10x16": 2400, "12x12": 2160, "12x16": 2880, "12x20": 3600}', 1);

-- Wall Options
INSERT INTO wall_options (name, applicable_positions, siding_styles, base_price, sort_order) VALUES
  ('Open', '{front,back,left,right}', '{horizontal,vertical}', 0, 1),
  ('Fully Enclosed', '{front,back,left,right}', '{horizontal,vertical}', 275, 2),
  ('Gable End', '{front,back}', '{horizontal,vertical}', 350, 3),
  ('Side Gap Panel', '{left,right}', '{horizontal,vertical}', 200, 4);

-- Door Options
INSERT INTO door_options (type, name, width_ft, height_ft, price) VALUES
  ('garage', '8'' x 8'' Garage Door', 8, 8, 700),
  ('garage', '9'' x 8'' Garage Door', 9, 8, 750),
  ('garage', '10'' x 8'' Garage Door', 10, 8, 800),
  ('garage', '10'' x 10'' Garage Door', 10, 10, 980),
  ('garage', '12'' x 10'' Garage Door', 12, 10, 1100),
  ('garage', '12'' x 12'' Garage Door', 12, 12, 1250),
  ('walk', '3'' x 7'' Walk Door', 3, 7, 350),
  ('walk', '4'' x 7'' Walk Door', 4, 7, 400),
  ('frameout', '6'' x 5'' Custom Frameout', 6, 5, 150),
  ('frameout', '8'' x 7'' Custom Frameout', 8, 7, 200),
  ('frameout', '10'' x 8'' Custom Frameout', 10, 8, 250);

-- Lean-to Pricing
INSERT INTO lean_to_pricing (base_prices, connection_fee) VALUES
  ('{"8x20": 1100, "8x21": 1155, "10x20": 1350, "10x21": 1390, "10x25": 1600, "10x30": 1900, "12x20": 1540, "12x21": 1590, "12x25": 1850, "12x30": 2200, "15x20": 1840, "15x21": 1890, "15x25": 2250, "15x30": 2700}', 120);

-- Pricing Options (per-category modifiers)
INSERT INTO pricing_options (category, name, price_modifier, price_type, metadata, sort_order) VALUES
  ('gauge', '14-Gauge Framing', 0, 'flat', '{"default": true}', 1),
  ('gauge', '12-Gauge Framing', 500, 'flat', NULL, 2),
  ('brace', 'Standard Bracing', 0, 'flat', '{"default": true}', 1),
  ('brace', 'Heavy Duty Bracing', 300, 'flat', NULL, 2),
  ('truss', 'Standard Trusses', 0, 'flat', '{"default": true}', 1),
  ('truss', 'Heavy Duty Trusses', 400, 'flat', NULL, 2),
  ('leg_height', '6'' Leg Height', 0, 'flat', '{"height": 6}', 1),
  ('leg_height', '7'' Leg Height', 0, 'flat', '{"height": 7}', 2),
  ('leg_height', '8'' Leg Height', 0, 'flat', '{"height": 8}', 3),
  ('leg_height', '9'' Leg Height', 0, 'flat', '{"height": 9, "default": true}', 4),
  ('leg_height', '10'' Leg Height', 100, 'flat', '{"height": 10}', 5),
  ('leg_height', '12'' Leg Height', 250, 'flat', '{"height": 12}', 6),
  ('leg_height', '14'' Leg Height', 450, 'flat', '{"height": 14}', 7),
  ('roof_pitch', '3/12 Pitch', 0, 'flat', '{"pitch": "3/12"}', 1),
  ('roof_pitch', '4/12 Pitch', 0, 'flat', '{"pitch": "4/12", "default": true}', 2),
  ('roof_pitch', '5/12 Pitch', 100, 'flat', '{"pitch": "5/12"}', 3),
  ('roof_pitch', '6/12 Pitch', 200, 'flat', '{"pitch": "6/12"}', 4);
