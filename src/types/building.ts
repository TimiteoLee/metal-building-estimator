// ============================================================
// Metal Building Estimator — Core Domain Types
// ============================================================

export type BuildingCategory = 'metal_building' | 'post_frame' | 'carport' | 'shed'

export type RoofStyle = 'vertical' | 'horizontal' | 'a_frame'
export type RoofPitch = '3/12' | '4/12' | '5/12' | '6/12'
export type SidingDirection = 'horizontal' | 'vertical'
export type WallType = 'open' | 'fully_enclosed' | 'gable_end' | 'side_gap_panel'
export type DoorType = 'garage' | 'walk' | 'frameout'
export type WallPosition = 'front' | 'back' | 'left' | 'right'
export type Gauge = '14' | '12'
export type BraceType = 'standard' | 'heavy_duty'
export type TrussType = 'standard' | 'heavy_duty'
export type InstallationSurface = 'concrete' | 'gravel' | 'dirt' | 'asphalt'

// ── Dimensions ──────────────────────────────────────────────

export interface Dimensions {
  width: number   // feet, 10-60
  length: number  // feet, 10-100
  legHeight: number // feet, 6-20
}

// ── Roof ────────────────────────────────────────────────────

export interface RoofConfig {
  style: RoofStyle
  pitch: RoofPitch
  overhang: '0"' | '6"' | '12"'
}

// ── Colors ──────────────────────────────────────────────────

export interface ColorOption {
  id: string
  name: string
  hex: string
  group?: string
}

export interface ColorConfig {
  roof: string      // color option ID
  trim: string
  siding: string
}

// ── Walls ───────────────────────────────────────────────────

export interface WallConfig {
  type: WallType
  sidingDirection: SidingDirection
  panelCutFee?: boolean  // for side gap panels
}

// ── Doors ───────────────────────────────────────────────────

export interface DoorPlacement {
  id: string
  type: DoorType
  wall: WallPosition
  width: number
  height: number
  position: number  // offset from left edge in feet
}

// ── Lean-Tos (discriminated union) ──────────────────────────

export type LeanToConfig =
  | { enabled: false }
  | {
      enabled: true
      width: number
      length: number
      legHeight: number
      roofPitch: RoofPitch
      gauge: Gauge
      brace: BraceType
      walls: {
        outer: WallConfig
        front: WallConfig
        back: WallConfig
      }
      doors: DoorPlacement[]
    }

// ── Full Building Configuration ─────────────────────────────

export interface BuildingConfig {
  category: BuildingCategory
  styleId: string
  styleName: string
  dimensions: Dimensions
  roof: RoofConfig
  colors: ColorConfig
  walls: {
    front: WallConfig
    back: WallConfig
    left: WallConfig
    right: WallConfig
  }
  doors: DoorPlacement[]
  leftLeanTo: LeanToConfig
  rightLeanTo: LeanToConfig
  gauge: Gauge
  brace: BraceType
  trusses: TrussType
  installationSurface: InstallationSurface
}

// ── Pricing ─────────────────────────────────────────────────

export interface PricingLineItem {
  label: string
  price: number
  section?: 'base' | 'main' | 'left_lean_to' | 'right_lean_to' | 'fees'
}

export interface PricingBreakdown {
  basePrice: number
  lineItems: PricingLineItem[]
  buildingEstimate: number
  materialSurchargePercent: number
  materialSurcharge: number
  subtotal: number
  taxRate: number
  salesTax: number
  discretionarySurtax: number
  totalTax: number
  total: number
  depositPercent: number
  depositAmount: number
  balanceDue: number
}

// ── Customer / Quote ────────────────────────────────────────

export interface CustomerInfo {
  name: string
  email: string
  phone: string
  deliveryZip: string
  additionalComments: string
}

// ── Building Style (from DB) ────────────────────────────────

export interface BuildingStyle {
  id: string
  name: string
  category: BuildingCategory
  basePrices: Record<string, number>  // "12x20" -> 1800
  availableOptions?: Record<string, string[]>
  sortOrder: number
}

// ── Wizard state ────────────────────────────────────────────

export type WizardStep =
  | 'building_type'
  | 'style'
  | 'dimensions'
  | 'roof'
  | 'colors'
  | 'walls'
  | 'doors'
  | 'lean_tos'
  | 'options'
  | 'review'

export const WIZARD_STEPS: WizardStep[] = [
  'building_type',
  'style',
  'dimensions',
  'roof',
  'colors',
  'walls',
  'doors',
  'lean_tos',
  'options',
  'review',
]

export const STEP_LABELS: Record<WizardStep, string> = {
  building_type: 'Building Type',
  style: 'Style',
  dimensions: 'Dimensions',
  roof: 'Roof',
  colors: 'Colors',
  walls: 'Walls',
  doors: 'Doors',
  lean_tos: 'Lean-Tos',
  options: 'Options',
  review: 'Review & Submit',
}
