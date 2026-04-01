'use client'

import { useConfiguratorStore } from '@/store/configurator-store'
import { GAUGE_OPTIONS, BRACE_OPTIONS, TRUSS_OPTIONS, SURFACE_OPTIONS } from '@/lib/constants'
import type { BraceType, TrussType, InstallationSurface } from '@/types/building'
import { StepCard } from '@/components/ui/StepCard'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

export function OptionsStep() {
  const config = useConfiguratorStore((s) => s.config)
  const setGauge = useConfiguratorStore((s) => s.setGauge)
  const setBrace = useConfiguratorStore((s) => s.setBrace)
  const setTrusses = useConfiguratorStore((s) => s.setTrusses)
  const setInstallationSurface = useConfiguratorStore((s) => s.setInstallationSurface)
  const nextStep = useConfiguratorStore((s) => s.nextStep)
  const prevStep = useConfiguratorStore((s) => s.prevStep)
  const markStepComplete = useConfiguratorStore((s) => s.markStepComplete)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Additional Options</h2>
      <p className="text-gray-600 mb-6">Configure framing gauge, bracing, trusses, and installation surface.</p>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Framing Gauge</label>
          <div className="grid grid-cols-2 gap-3">
            {GAUGE_OPTIONS.map((opt) => (
              <StepCard
                key={opt.value}
                title={opt.label}
                description={opt.description}
                selected={config.gauge === opt.value}
                onClick={() => setGauge(opt.value)}
              />
            ))}
          </div>
        </div>

        <Select
          label="Bracing"
          value={config.brace}
          onChange={(e) => setBrace(e.target.value as BraceType)}
          options={BRACE_OPTIONS.map((b) => ({ value: b.value, label: b.label }))}
        />

        <Select
          label="Trusses"
          value={config.trusses}
          onChange={(e) => setTrusses(e.target.value as TrussType)}
          options={TRUSS_OPTIONS.map((t) => ({ value: t.value, label: t.label }))}
        />

        <Select
          label="Installation Surface"
          value={config.installationSurface}
          onChange={(e) => setInstallationSurface(e.target.value as InstallationSurface)}
          options={SURFACE_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
        />
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button
          onClick={() => {
            markStepComplete('options')
            nextStep()
          }}
        >
          Next: Review & Submit
        </Button>
      </div>
    </div>
  )
}
