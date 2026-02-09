import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { generateQuoteNumber } from '@/lib/quote-number'
import { calculatePricing, DEFAULT_PRICING_DATA } from '@/lib/pricing-engine'

const CustomerSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phone: z.string().max(20).optional().default(''),
  deliveryZip: z.string().regex(/^\d{5}$/, 'Must be a 5-digit ZIP code'),
  additionalComments: z.string().max(2000).optional().default(''),
})

const SubmissionSchema = z.object({
  config: z.object({
    category: z.enum(['metal_building', 'post_frame', 'carport', 'shed']),
    styleId: z.string(),
    styleName: z.string(),
    dimensions: z.object({
      width: z.number().min(10).max(60),
      length: z.number().min(10).max(100),
      legHeight: z.number().min(6).max(20),
    }),
    roof: z.object({
      style: z.enum(['vertical', 'horizontal', 'a_frame']),
      pitch: z.enum(['3/12', '4/12', '5/12', '6/12']),
      overhang: z.enum(['0"', '6"', '12"']),
    }),
    colors: z.object({
      roof: z.string(),
      trim: z.string(),
      siding: z.string(),
    }),
    walls: z.record(z.object({
      type: z.enum(['open', 'fully_enclosed', 'gable_end', 'side_gap_panel']),
      sidingDirection: z.enum(['horizontal', 'vertical']),
      panelCutFee: z.boolean().optional(),
    })),
    doors: z.array(z.object({
      id: z.string(),
      type: z.enum(['garage', 'walk', 'frameout']),
      wall: z.enum(['front', 'back', 'left', 'right']),
      width: z.number(),
      height: z.number(),
      position: z.number(),
    })),
    leftLeanTo: z.union([
      z.object({ enabled: z.literal(false) }),
      z.object({
        enabled: z.literal(true),
        width: z.number(),
        length: z.number(),
        legHeight: z.number(),
        roofPitch: z.string(),
        gauge: z.string(),
        brace: z.string(),
        walls: z.record(z.any()),
        doors: z.array(z.any()),
      }),
    ]),
    rightLeanTo: z.union([
      z.object({ enabled: z.literal(false) }),
      z.object({
        enabled: z.literal(true),
        width: z.number(),
        length: z.number(),
        legHeight: z.number(),
        roofPitch: z.string(),
        gauge: z.string(),
        brace: z.string(),
        walls: z.record(z.any()),
        doors: z.array(z.any()),
      }),
    ]),
    gauge: z.enum(['14', '12']),
    brace: z.enum(['standard', 'heavy_duty']),
    trusses: z.enum(['standard', 'heavy_duty']),
    installationSurface: z.enum(['concrete', 'gravel', 'dirt', 'asphalt']),
  }),
  customer: CustomerSchema,
  screenshotUrls: z.array(z.string()).optional().default([]),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = SubmissionSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid submission data', details: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const { config, customer, screenshotUrls } = parsed.data

    // Server-side pricing recalculation (never trust client)
    const pricing = calculatePricing(config as Parameters<typeof calculatePricing>[0], {
      ...DEFAULT_PRICING_DATA,
      styles: [], // Would fetch from Supabase in production
    })

    const quoteNumber = generateQuoteNumber()

    // In production, save to Supabase here:
    // const { data, error } = await supabase.from('configurations').insert({ ... })

    // In production: save to Supabase, generate PDF, send email
    console.log('Quote submitted:', { quoteNumber, customerEmail: customer.email, total: pricing.total, screenshotCount: screenshotUrls.length })

    return NextResponse.json({
      success: true,
      quoteNumber,
      total: pricing.total,
    })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
