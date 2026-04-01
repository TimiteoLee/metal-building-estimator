'use client'

import { useConfiguratorStore } from '@/store/configurator-store'
import { WIDTH_OPTIONS, LENGTH_OPTIONS, LEG_HEIGHT_OPTIONS } from '@/lib/constants'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

export function DimensionsStep() {
  const dimensions = useConfiguratorStore((s) => s.config.dimensions)
  const setDimensions = useConfiguratorStore((s) => s.setDimensions)
  const nextStep = useConfiguratorStore((s) => s.nextStep)
  const prevStep = useConfiguratorStore((s) => s.prevStep)
  const markStepComplete = useConfiguratorStore((s) => s.markStepComplete)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Dimensions</h2>
      <p className="text-gray-600 mb-6">Choose the width, length, and leg height for your building.</p>

      <div className="space-y-6 mb-8">
        <Select
          label={`Width (${dimensions.width}')`}
          value={String(dimensions.width)}
          onChange={(e) => setDimensions(Number(e.target.value), dimensions.length, dimensions.legHeight)}
          options={WIDTH_OPTIONS.map((w) => ({ value: String(w), label: `${w} feet` }))}
        />
        <Select
          label={`Length (${dimensions.length}')`}
          value={String(dimensions.length)}
          onChange={(e) => setDimensions(dimensions.width, Number(e.target.value), dimensions.legHeight)}
          options={LENGTH_OPTIONS.map((l) => ({ value: String(l), label: `${l} feet` }))}
        />
        <Select
          label={`Leg Height (${dimensions.legHeight}')`}
          value={String(dimensions.legHeight)}
          onChange={(e) => setDimensions(dimensions.width, dimensions.length, Number(e.target.value))}
          options={LEG_HEIGHT_OPTIONS.map((h) => ({ value: String(h), label: `${h} feet` }))}
        />

        <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-800">
          Building footprint: {dimensions.width}&apos; x {dimensions.length}&apos; = {dimensions.width * dimensions.length} sq ft
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button
          onClick={() => {
            markStepComplete('dimensions')
            nextStep()
          }}
        >
          Next: Roof
        </Button>
      </div>
    </div>
  )
}
