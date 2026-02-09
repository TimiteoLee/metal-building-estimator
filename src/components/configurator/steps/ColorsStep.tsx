'use client'

import { useConfiguratorStore } from '@/store/configurator-store'
import { ROOF_COLORS, TRIM_COLORS, SIDING_COLORS } from '@/lib/constants'
import { ColorSwatch } from '@/components/ui/ColorSwatch'
import { Button } from '@/components/ui/Button'

export function ColorsStep() {
  const colors = useConfiguratorStore((s) => s.config.colors)
  const setColors = useConfiguratorStore((s) => s.setColors)
  const nextStep = useConfiguratorStore((s) => s.nextStep)
  const prevStep = useConfiguratorStore((s) => s.prevStep)
  const markStepComplete = useConfiguratorStore((s) => s.markStepComplete)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Colors</h2>
      <p className="text-gray-600 mb-6">Select colors for your roof, trim, and siding.</p>

      <div className="space-y-8 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Roof Color</label>
          <div className="flex flex-wrap gap-1">
            {ROOF_COLORS.map((color) => (
              <ColorSwatch
                key={color.id}
                color={color}
                selected={colors.roof === color.id}
                onClick={() => setColors({ roof: color.id })}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Trim Color</label>
          <div className="flex flex-wrap gap-1">
            {TRIM_COLORS.map((color) => (
              <ColorSwatch
                key={color.id}
                color={color}
                selected={colors.trim === color.id}
                onClick={() => setColors({ trim: color.id })}
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Siding Color</label>
          <div className="flex flex-wrap gap-1">
            {SIDING_COLORS.map((color) => (
              <ColorSwatch
                key={color.id}
                color={color}
                selected={colors.siding === color.id}
                onClick={() => setColors({ siding: color.id })}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button
          onClick={() => {
            markStepComplete('colors')
            nextStep()
          }}
        >
          Next: Walls
        </Button>
      </div>
    </div>
  )
}
