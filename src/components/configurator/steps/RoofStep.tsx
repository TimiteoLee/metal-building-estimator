'use client'

import { useConfiguratorStore } from '@/store/configurator-store'
import { ROOF_STYLES, ROOF_PITCHES, OVERHANG_OPTIONS } from '@/lib/constants'
import { StepCard } from '@/components/ui/StepCard'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

export function RoofStep() {
  const roof = useConfiguratorStore((s) => s.config.roof)
  const setRoof = useConfiguratorStore((s) => s.setRoof)
  const nextStep = useConfiguratorStore((s) => s.nextStep)
  const prevStep = useConfiguratorStore((s) => s.prevStep)
  const markStepComplete = useConfiguratorStore((s) => s.markStepComplete)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Roof Configuration</h2>
      <p className="text-gray-600 mb-6">Choose your roof style, pitch, and overhang.</p>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Roof Style</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ROOF_STYLES.map((style) => (
              <StepCard
                key={style.value}
                title={style.label}
                description={style.description}
                selected={roof.style === style.value}
                onClick={() => setRoof({ style: style.value })}
              />
            ))}
          </div>
        </div>

        <Select
          label="Roof Pitch"
          value={roof.pitch}
          onChange={(e) => setRoof({ pitch: e.target.value as typeof roof.pitch })}
          options={ROOF_PITCHES.map((p) => ({ value: p.value, label: p.label }))}
        />

        <Select
          label="Overhang"
          value={roof.overhang}
          onChange={(e) => setRoof({ overhang: e.target.value as typeof roof.overhang })}
          options={OVERHANG_OPTIONS.map((o) => ({ value: o, label: o === '0"' ? 'No Overhang' : o }))}
        />
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button
          onClick={() => {
            markStepComplete('roof')
            nextStep()
          }}
        >
          Next: Colors
        </Button>
      </div>
    </div>
  )
}
