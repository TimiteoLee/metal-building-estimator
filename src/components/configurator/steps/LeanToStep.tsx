'use client'

import { useConfiguratorStore } from '@/store/configurator-store'
import { WIDTH_OPTIONS, LENGTH_OPTIONS, LEG_HEIGHT_OPTIONS, WALL_TYPES, GAUGE_OPTIONS, BRACE_OPTIONS, ROOF_PITCHES } from '@/lib/constants'
import type { LeanToConfig, WallType, SidingDirection, RoofPitch, Gauge, BraceType } from '@/types/building'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

function LeanToPanel({
  side,
  config,
  onChange,
}: {
  side: 'left' | 'right'
  config: LeanToConfig
  onChange: (config: LeanToConfig) => void
}) {
  const label = side === 'left' ? 'Left' : 'Right'
  const enabled = config.enabled

  const toggleEnabled = () => {
    if (enabled) {
      onChange({ enabled: false })
    } else {
      onChange({
        enabled: true,
        width: 10,
        length: 21,
        legHeight: 7,
        roofPitch: '3/12',
        gauge: '14',
        brace: 'standard',
        walls: {
          outer: { type: 'open', sidingDirection: 'horizontal' },
          front: { type: 'open', sidingDirection: 'horizontal' },
          back: { type: 'open', sidingDirection: 'horizontal' },
        },
        doors: [],
      })
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">{label} Lean-To</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={toggleEnabled}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">Enable</span>
        </label>
      </div>

      {enabled && config.enabled && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Select
              label="Width"
              value={String(config.width)}
              onChange={(e) => onChange({ ...config, width: Number(e.target.value) })}
              options={WIDTH_OPTIONS.filter((w) => w <= 20).map((w) => ({ value: String(w), label: `${w}'` }))}
            />
            <Select
              label="Length"
              value={String(config.length)}
              onChange={(e) => onChange({ ...config, length: Number(e.target.value) })}
              options={LENGTH_OPTIONS.filter((l) => l <= 50).map((l) => ({ value: String(l), label: `${l}'` }))}
            />
            <Select
              label="Leg Height"
              value={String(config.legHeight)}
              onChange={(e) => onChange({ ...config, legHeight: Number(e.target.value) })}
              options={LEG_HEIGHT_OPTIONS.map((h) => ({ value: String(h), label: `${h}'` }))}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Select
              label="Roof Pitch"
              value={config.roofPitch}
              onChange={(e) => onChange({ ...config, roofPitch: e.target.value as RoofPitch })}
              options={ROOF_PITCHES.map((p) => ({ value: p.value, label: p.label }))}
            />
            <Select
              label="Gauge"
              value={config.gauge}
              onChange={(e) => onChange({ ...config, gauge: e.target.value as Gauge })}
              options={GAUGE_OPTIONS.map((g) => ({ value: g.value, label: g.label }))}
            />
            <Select
              label="Bracing"
              value={config.brace}
              onChange={(e) => onChange({ ...config, brace: e.target.value as BraceType })}
              options={BRACE_OPTIONS.map((b) => ({ value: b.value, label: b.label }))}
            />
          </div>
          <div className="border-t border-gray-100 pt-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">Walls</label>
            <div className="space-y-2">
              {(['outer', 'front', 'back'] as const).map((pos) => (
                <div key={pos} className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 w-16 capitalize">{pos}</span>
                  <Select
                    value={config.walls[pos].type}
                    onChange={(e) =>
                      onChange({
                        ...config,
                        walls: {
                          ...config.walls,
                          [pos]: { ...config.walls[pos], type: e.target.value as WallType },
                        },
                      })
                    }
                    options={WALL_TYPES.map((w) => ({ value: w.value, label: w.label }))}
                  />
                  {config.walls[pos].type !== 'open' && (
                    <Select
                      value={config.walls[pos].sidingDirection}
                      onChange={(e) =>
                        onChange({
                          ...config,
                          walls: {
                            ...config.walls,
                            [pos]: { ...config.walls[pos], sidingDirection: e.target.value as SidingDirection },
                          },
                        })
                      }
                      options={[
                        { value: 'horizontal', label: 'Horizontal' },
                        { value: 'vertical', label: 'Vertical' },
                      ]}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function LeanToStep() {
  const leftLeanTo = useConfiguratorStore((s) => s.config.leftLeanTo)
  const rightLeanTo = useConfiguratorStore((s) => s.config.rightLeanTo)
  const setLeanTo = useConfiguratorStore((s) => s.setLeanTo)
  const nextStep = useConfiguratorStore((s) => s.nextStep)
  const prevStep = useConfiguratorStore((s) => s.prevStep)
  const markStepComplete = useConfiguratorStore((s) => s.markStepComplete)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Lean-To Additions</h2>
      <p className="text-gray-600 mb-6">Optionally add lean-to structures to the left and/or right side of your building.</p>

      <div className="space-y-6 mb-8">
        <LeanToPanel side="left" config={leftLeanTo} onChange={(c) => setLeanTo('left', c)} />
        <LeanToPanel side="right" config={rightLeanTo} onChange={(c) => setLeanTo('right', c)} />
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button
          onClick={() => {
            markStepComplete('lean_tos')
            nextStep()
          }}
        >
          Next: Options
        </Button>
      </div>
    </div>
  )
}
