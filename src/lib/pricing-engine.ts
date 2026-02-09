import type { BuildingConfig, PricingBreakdown, PricingLineItem, BuildingStyle, LeanToConfig } from '@/types/building'

interface PricingData {
  styles: BuildingStyle[]
  materialSurchargePercent: number
  taxRate: number
  depositPercent: number
  wallPrices: Record<string, number>
  doorPrices: Record<string, number>
  gaugePremium: number
  bracePremium: number
  trussPremium: number
  connectionFee: number
  leanToPrices: Record<string, number>
}

function lookupBasePrice(style: BuildingStyle | undefined, width: number, length: number): number {
  if (!style) return 0
  const key = `${width}x${length}`
  if (style.basePrices[key] !== undefined) return style.basePrices[key]
  // Find closest match by area
  const targetArea = width * length
  let closest = ''
  let closestDiff = Infinity
  for (const k of Object.keys(style.basePrices)) {
    const [w, l] = k.split('x').map(Number)
    const diff = Math.abs(w * l - targetArea)
    if (diff < closestDiff) {
      closestDiff = diff
      closest = k
    }
  }
  return closest ? style.basePrices[closest] : 0
}

function calculateLeanTo(
  leanTo: LeanToConfig,
  side: 'left' | 'right',
  data: PricingData,
): PricingLineItem[] {
  if (!leanTo.enabled) return []
  const items: PricingLineItem[] = []
  const section = side === 'left' ? 'left_lean_to' : 'right_lean_to'
  const label = side === 'left' ? 'Left Lean-To' : 'Right Lean-To'

  const key = `${leanTo.width}x${leanTo.length}`
  const basePrice = data.leanToPrices[key] || 0
  items.push({ label: `${label} Base (${leanTo.width}'x${leanTo.length}')`, price: basePrice, section })
  items.push({ label: `${label} Connection Fee`, price: data.connectionFee, section })

  // Lean-to walls
  for (const [pos, wall] of Object.entries(leanTo.walls)) {
    if (wall.type !== 'open') {
      const wallPrice = data.wallPrices[wall.type] || 0
      items.push({ label: `${label} ${pos} Wall (${wall.type.replace('_', ' ')})`, price: wallPrice, section })
    }
  }

  // Lean-to doors
  for (const door of leanTo.doors) {
    const doorKey = `${door.type}_${door.width}x${door.height}`
    const doorPrice = data.doorPrices[doorKey] || data.doorPrices[door.type] || 0
    items.push({ label: `${label} ${door.type} Door (${door.width}'x${door.height}')`, price: doorPrice, section })
  }

  // Lean-to gauge upgrade
  if (leanTo.gauge === '12') {
    items.push({ label: `${label} 12-Gauge Upgrade`, price: data.gaugePremium, section })
  }

  return items
}

export function calculatePricing(config: BuildingConfig, data: PricingData): PricingBreakdown {
  const style = data.styles.find(s => s.id === config.styleId)
  const lineItems: PricingLineItem[] = []

  // Base price
  const basePrice = lookupBasePrice(style, config.dimensions.width, config.dimensions.length)
  lineItems.push({ label: `${config.styleName || 'Building'} Base Price (${config.dimensions.width}'x${config.dimensions.length}')`, price: basePrice, section: 'base' })

  // Walls
  for (const [pos, wall] of Object.entries(config.walls)) {
    if (wall.type !== 'open') {
      const wallPrice = data.wallPrices[wall.type] || 0
      lineItems.push({ label: `${pos} Wall (${wall.type.replace(/_/g, ' ')})`, price: wallPrice, section: 'main' })
    }
  }

  // Doors
  for (const door of config.doors) {
    const doorKey = `${door.type}_${door.width}x${door.height}`
    const doorPrice = data.doorPrices[doorKey] || data.doorPrices[door.type] || 0
    lineItems.push({ label: `${door.type} Door (${door.width}'x${door.height}') — ${door.wall} wall`, price: doorPrice, section: 'main' })
  }

  // Gauge upgrade
  if (config.gauge === '12') {
    lineItems.push({ label: '12-Gauge Framing Upgrade', price: data.gaugePremium, section: 'main' })
  }

  // Brace upgrade
  if (config.brace === 'heavy_duty') {
    lineItems.push({ label: 'Heavy Duty Bracing', price: data.bracePremium, section: 'main' })
  }

  // Truss upgrade
  if (config.trusses === 'heavy_duty') {
    lineItems.push({ label: 'Heavy Duty Trusses', price: data.trussPremium, section: 'main' })
  }

  // Lean-tos
  lineItems.push(...calculateLeanTo(config.leftLeanTo, 'left', data))
  lineItems.push(...calculateLeanTo(config.rightLeanTo, 'right', data))

  // Totals
  const buildingEstimate = lineItems.reduce((sum, item) => sum + item.price, 0)
  const materialSurcharge = Math.round(buildingEstimate * data.materialSurchargePercent * 100) / 100
  const subtotal = buildingEstimate + materialSurcharge
  const salesTax = Math.round(subtotal * data.taxRate * 100) / 100
  const discretionarySurtax = Math.round(Math.min(subtotal, 5000) * 0.005 * 100) / 100
  const totalTax = salesTax + discretionarySurtax
  const total = Math.round((subtotal + totalTax) * 100) / 100
  const depositAmount = Math.round(buildingEstimate * data.depositPercent * 100) / 100
  const balanceDue = Math.round((total - depositAmount) * 100) / 100

  return {
    basePrice,
    lineItems,
    buildingEstimate,
    materialSurchargePercent: data.materialSurchargePercent,
    materialSurcharge,
    subtotal,
    taxRate: data.taxRate,
    salesTax,
    discretionarySurtax,
    totalTax,
    total,
    depositPercent: data.depositPercent,
    depositAmount,
    balanceDue,
  }
}

// Default pricing data for when Supabase is not connected
export const DEFAULT_PRICING_DATA: PricingData = {
  styles: [
    {
      id: 'step-down-barn',
      name: 'Step Down Barn',
      category: 'metal_building',
      basePrices: {
        '12x20': 1800, '12x21': 1890, '15x20': 2340, '15x21': 2460,
        '18x20': 2700, '18x21': 2835, '20x20': 3000, '20x21': 3150,
        '20x25': 3750, '20x30': 4500, '24x25': 4500, '24x30': 5400,
        '24x35': 6300, '24x40': 7200, '30x30': 6750, '30x35': 7875,
        '30x40': 9000, '30x50': 11250,
      },
      sortOrder: 1,
    },
    {
      id: 'regular-barn',
      name: 'Regular Barn',
      category: 'metal_building',
      basePrices: {
        '12x20': 1680, '12x21': 1764, '15x20': 2100, '15x21': 2205,
        '18x20': 2520, '18x21': 2646, '20x20': 2800, '20x21': 2940,
        '20x25': 3500, '20x30': 4200, '24x25': 4200, '24x30': 5040,
        '24x35': 5880, '24x40': 6720, '30x30': 6300, '30x35': 7350,
        '30x40': 8400, '30x50': 10500,
      },
      sortOrder: 2,
    },
    {
      id: 'a-frame-vertical',
      name: 'A-Frame Vertical',
      category: 'metal_building',
      basePrices: {
        '12x20': 1920, '12x21': 2016, '15x20': 2400, '15x21': 2520,
        '18x20': 2880, '18x21': 3024, '20x20': 3200, '20x21': 3360,
        '20x25': 4000, '20x30': 4800, '24x25': 4800, '24x30': 5760,
        '24x35': 6720, '24x40': 7680, '30x30': 7200, '30x35': 8400,
        '30x40': 9600, '30x50': 12000,
      },
      sortOrder: 3,
    },
    {
      id: 'regular-style',
      name: 'Regular Style',
      category: 'carport',
      basePrices: {
        '12x20': 1200, '12x21': 1260, '15x20': 1500, '15x21': 1575,
        '18x20': 1800, '18x21': 1890, '20x20': 2000, '20x21': 2100,
        '24x25': 3000, '24x30': 3600, '30x30': 4500, '30x40': 6000,
      },
      sortOrder: 1,
    },
    {
      id: 'a-frame-carport',
      name: 'A-Frame Carport',
      category: 'carport',
      basePrices: {
        '12x20': 1440, '12x21': 1512, '15x20': 1800, '15x21': 1890,
        '18x20': 2160, '18x21': 2268, '20x20': 2400, '20x21': 2520,
        '24x25': 3600, '24x30': 4320, '30x30': 5400, '30x40': 7200,
      },
      sortOrder: 2,
    },
    {
      id: 'post-frame-barn',
      name: 'Post Frame Barn',
      category: 'post_frame',
      basePrices: {
        '20x20': 4500, '20x30': 6750, '24x30': 8100, '24x40': 10800,
        '30x30': 10125, '30x40': 13500, '30x50': 16875, '40x40': 18000,
        '40x60': 27000,
      },
      sortOrder: 1,
    },
    {
      id: 'garden-shed',
      name: 'Garden Shed',
      category: 'shed',
      basePrices: {
        '8x10': 1200, '8x12': 1440, '10x10': 1500, '10x12': 1800,
        '10x16': 2400, '12x12': 2160, '12x16': 2880, '12x20': 3600,
      },
      sortOrder: 1,
    },
  ],
  materialSurchargePercent: 0.15,
  taxRate: 0.06,
  depositPercent: 0.10,
  wallPrices: {
    fully_enclosed: 275,
    gable_end: 350,
    side_gap_panel: 200,
  },
  doorPrices: {
    garage: 800,
    walk: 350,
    frameout: 150,
    'garage_10x10': 980,
    'garage_10x8': 800,
    'garage_12x10': 1100,
    'garage_12x12': 1250,
    'garage_9x8': 750,
    'garage_8x8': 700,
    'walk_3x7': 350,
    'walk_4x7': 400,
  },
  gaugePremium: 500,
  bracePremium: 300,
  trussPremium: 400,
  connectionFee: 120,
  leanToPrices: {
    '8x20': 1100,
    '8x21': 1155,
    '10x20': 1350,
    '10x21': 1390,
    '10x25': 1600,
    '10x30': 1900,
    '12x20': 1540,
    '12x21': 1590,
    '12x25': 1850,
    '12x30': 2200,
    '15x20': 1840,
    '15x21': 1890,
    '15x25': 2250,
    '15x30': 2700,
  },
}
