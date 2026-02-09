import type { ColorOption, BuildingCategory, WallType, DoorType, RoofStyle, RoofPitch, Gauge, BraceType, TrussType, InstallationSurface } from '@/types/building'

// ── Color Palettes ──────────────────────────────────────────

export const ROOF_COLORS: ColorOption[] = [
  { id: 'old-town-gray', name: 'Old Town Gray', hex: '#7A7D7F', group: 'neutrals' },
  { id: 'charcoal-gray', name: 'Charcoal Gray', hex: '#4A4E51', group: 'neutrals' },
  { id: 'ash-gray', name: 'Ash Gray', hex: '#999B9C', group: 'neutrals' },
  { id: 'barn-red', name: 'Barn Red', hex: '#7C1A1A', group: 'reds' },
  { id: 'crimson-red', name: 'Crimson Red', hex: '#8B1A1A', group: 'reds' },
  { id: 'galvalume', name: 'Galvalume', hex: '#B8B8B8', group: 'metallic' },
  { id: 'burnished-slate', name: 'Burnished Slate', hex: '#5C5D5E', group: 'neutrals' },
  { id: 'evergreen', name: 'Evergreen', hex: '#2F4F2F', group: 'greens' },
  { id: 'hunter-green', name: 'Hunter Green', hex: '#355E3B', group: 'greens' },
  { id: 'white', name: 'White', hex: '#F5F5F5', group: 'neutrals' },
  { id: 'black', name: 'Black', hex: '#1A1A1A', group: 'neutrals' },
  { id: 'clay', name: 'Clay', hex: '#B4836B', group: 'earth_tones' },
  { id: 'light-stone', name: 'Light Stone', hex: '#C5B9A0', group: 'earth_tones' },
  { id: 'tan', name: 'Tan', hex: '#D2B48C', group: 'earth_tones' },
]

export const TRIM_COLORS: ColorOption[] = [
  { id: 'white', name: 'White', hex: '#FFFFFF', group: 'neutrals' },
  { id: 'black', name: 'Black', hex: '#1A1A1A', group: 'neutrals' },
  { id: 'crimson-red', name: 'Crimson Red', hex: '#8B1A1A', group: 'reds' },
  { id: 'barn-red', name: 'Barn Red', hex: '#7C1A1A', group: 'reds' },
  { id: 'charcoal-gray', name: 'Charcoal Gray', hex: '#4A4E51', group: 'neutrals' },
  { id: 'old-town-gray', name: 'Old Town Gray', hex: '#7A7D7F', group: 'neutrals' },
  { id: 'burnished-slate', name: 'Burnished Slate', hex: '#5C5D5E', group: 'neutrals' },
  { id: 'evergreen', name: 'Evergreen', hex: '#2F4F2F', group: 'greens' },
  { id: 'clay', name: 'Clay', hex: '#B4836B', group: 'earth_tones' },
  { id: 'light-stone', name: 'Light Stone', hex: '#C5B9A0', group: 'earth_tones' },
  { id: 'tan', name: 'Tan', hex: '#D2B48C', group: 'earth_tones' },
  { id: 'galvalume', name: 'Galvalume', hex: '#B8B8B8', group: 'metallic' },
]

export const SIDING_COLORS: ColorOption[] = [
  { id: 'light-stone', name: 'Light Stone', hex: '#C5B9A0', group: 'earth_tones' },
  { id: 'clay', name: 'Clay', hex: '#B4836B', group: 'earth_tones' },
  { id: 'white', name: 'White', hex: '#F5F5F5', group: 'neutrals' },
  { id: 'tan', name: 'Tan', hex: '#D2B48C', group: 'earth_tones' },
  { id: 'ash-gray', name: 'Ash Gray', hex: '#999B9C', group: 'neutrals' },
  { id: 'charcoal-gray', name: 'Charcoal Gray', hex: '#4A4E51', group: 'neutrals' },
  { id: 'old-town-gray', name: 'Old Town Gray', hex: '#7A7D7F', group: 'neutrals' },
  { id: 'barn-red', name: 'Barn Red', hex: '#7C1A1A', group: 'reds' },
  { id: 'crimson-red', name: 'Crimson Red', hex: '#8B1A1A', group: 'reds' },
  { id: 'evergreen', name: 'Evergreen', hex: '#2F4F2F', group: 'greens' },
  { id: 'burnished-slate', name: 'Burnished Slate', hex: '#5C5D5E', group: 'neutrals' },
  { id: 'black', name: 'Black', hex: '#1A1A1A', group: 'neutrals' },
]

// ── Dimension Ranges ────────────────────────────────────────

export const WIDTH_OPTIONS = Array.from({ length: 26 }, (_, i) => 10 + i * 2) // 10, 12, 14, ... 60
export const LENGTH_OPTIONS = Array.from({ length: 91 }, (_, i) => 10 + i)    // 10, 11, 12, ... 100
export const LEG_HEIGHT_OPTIONS = Array.from({ length: 15 }, (_, i) => 6 + i) // 6, 7, 8, ... 20

// ── Building Categories ─────────────────────────────────────

export const BUILDING_CATEGORIES: { value: BuildingCategory; label: string; description: string }[] = [
  { value: 'metal_building', label: 'Metal Building', description: 'Pre-engineered steel structures for workshops, garages, and storage' },
  { value: 'post_frame', label: 'Post Frame', description: 'Wood post construction with metal siding for barns and agricultural buildings' },
  { value: 'carport', label: 'Carport', description: 'Open or partially enclosed vehicle shelters' },
  { value: 'shed', label: 'Shed', description: 'Compact storage buildings' },
]

// ── Roof Styles ─────────────────────────────────────────────

export const ROOF_STYLES: { value: RoofStyle; label: string; description: string }[] = [
  { value: 'a_frame', label: 'A-Frame (Vertical)', description: 'Peaked roof with vertical panels — best for rain/snow' },
  { value: 'vertical', label: 'Vertical', description: 'Vertical ridge cap panels' },
  { value: 'horizontal', label: 'Horizontal (Regular)', description: 'Standard horizontal panels — most economical' },
]

export const ROOF_PITCHES: { value: RoofPitch; label: string }[] = [
  { value: '3/12', label: '3/12 (Low)' },
  { value: '4/12', label: '4/12 (Standard)' },
  { value: '5/12', label: '5/12 (Medium)' },
  { value: '6/12', label: '6/12 (Steep)' },
]

export const OVERHANG_OPTIONS = ['0"', '6"', '12"'] as const

// ── Wall Types ──────────────────────────────────────────────

export const WALL_TYPES: { value: WallType; label: string; description: string }[] = [
  { value: 'open', label: 'Open', description: 'No wall panel' },
  { value: 'fully_enclosed', label: 'Fully Enclosed', description: 'Full height wall panel' },
  { value: 'gable_end', label: 'Gable End', description: 'Triangular top section enclosed' },
  { value: 'side_gap_panel', label: 'Side Gap Panel', description: 'Partial panel with gap at bottom' },
]

// ── Door Types ──────────────────────────────────────────────

export const DOOR_TYPES: { value: DoorType; label: string }[] = [
  { value: 'garage', label: 'Garage Door' },
  { value: 'walk', label: 'Walk Door' },
  { value: 'frameout', label: 'Custom Frameout' },
]

export const STANDARD_GARAGE_DOORS = [
  { width: 8, height: 8, label: "8' x 8'" },
  { width: 9, height: 8, label: "9' x 8'" },
  { width: 10, height: 8, label: "10' x 8'" },
  { width: 10, height: 10, label: "10' x 10'" },
  { width: 12, height: 10, label: "12' x 10'" },
  { width: 12, height: 12, label: "12' x 12'" },
]

export const STANDARD_WALK_DOORS = [
  { width: 3, height: 7, label: "3' x 7'" },
  { width: 4, height: 7, label: "4' x 7'" },
]

// ── Options ─────────────────────────────────────────────────

export const GAUGE_OPTIONS: { value: Gauge; label: string; description: string }[] = [
  { value: '14', label: '14-Gauge', description: 'Standard framing' },
  { value: '12', label: '12-Gauge', description: 'Heavy-duty framing (thicker steel)' },
]

export const BRACE_OPTIONS: { value: BraceType; label: string }[] = [
  { value: 'standard', label: 'Standard Bracing' },
  { value: 'heavy_duty', label: 'Heavy Duty Bracing' },
]

export const TRUSS_OPTIONS: { value: TrussType; label: string }[] = [
  { value: 'standard', label: 'Standard Trusses' },
  { value: 'heavy_duty', label: 'Heavy Duty Trusses' },
]

export const SURFACE_OPTIONS: { value: InstallationSurface; label: string }[] = [
  { value: 'concrete', label: 'Concrete' },
  { value: 'gravel', label: 'Gravel' },
  { value: 'dirt', label: 'Dirt' },
  { value: 'asphalt', label: 'Asphalt' },
]

// ── Default Building Config ─────────────────────────────────

export const DEFAULT_WALL_CONFIG = {
  type: 'open' as WallType,
  sidingDirection: 'horizontal' as const,
}

export const DEFAULT_LEAN_TO = { enabled: false as const }

export const DEFAULT_BUILDING_CONFIG = {
  category: 'metal_building' as BuildingCategory,
  styleId: '',
  styleName: '',
  dimensions: { width: 20, length: 21, legHeight: 9 },
  roof: { style: 'a_frame' as RoofStyle, pitch: '4/12' as RoofPitch, overhang: '0"' as const },
  colors: { roof: 'old-town-gray', trim: 'white', siding: 'light-stone' },
  walls: {
    front: { ...DEFAULT_WALL_CONFIG },
    back: { ...DEFAULT_WALL_CONFIG },
    left: { ...DEFAULT_WALL_CONFIG },
    right: { ...DEFAULT_WALL_CONFIG },
  },
  doors: [],
  leftLeanTo: DEFAULT_LEAN_TO,
  rightLeanTo: DEFAULT_LEAN_TO,
  gauge: '14' as Gauge,
  brace: 'standard' as BraceType,
  trusses: 'standard' as TrussType,
  installationSurface: 'concrete' as InstallationSurface,
}

// ── Max constraints ─────────────────────────────────────────

export const MAX_DOORS_PER_WALL = 3
export const MAX_LEAN_TO_WIDTH_RATIO = 1.0  // lean-to width <= main building width
