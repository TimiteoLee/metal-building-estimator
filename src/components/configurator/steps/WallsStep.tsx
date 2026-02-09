'use client'

import { useConfiguratorStore } from '@/store/configurator-store'
import { WALL_TYPES } from '@/lib/constants'
import type { WallPosition, WallType, SidingDirection } from '@/types/building'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

const WALLS: { position: WallPosition; label: string }[] = [
  { position: 'front', label: 'Front Wall' },
  { position: 'back', label: 'Back Wall' },
  { position: 'left', label: 'Left Wall' },
  { position: 'right', label: 'Right Wall' },
]

export function WallsStep() {
  const walls = useConfiguratorStore((s) => s.config.walls)
  const setWall = useConfiguratorStore((s) => s.setWall)
  const nextStep = useConfiguratorStore((s) => s.nextStep)
  const prevStep = useConfiguratorStore((s) => s.prevStep)
  const markStepComplete = useConfiguratorStore((s) => s.markStepComplete)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Wall Configuration</h2>
      <p className="text-gray-600 mb-6">Configure each wall of your building.</p>

      <div className="space-y-6 mb-8">
        {WALLS.map(({ position, label }) => {
          const wall = walls[position]
          return (
            <div key={position} className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-3">{label}</h3>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Wall Type"
                  value={wall.type}
                  onChange={(e) => setWall(position, { type: e.target.value as WallType })}
                  options={WALL_TYPES.map((w) => ({ value: w.value, label: w.label }))}
                />
                {wall.type !== 'open' && (
                  <Select
                    label="Siding Direction"
                    value={wall.sidingDirection}
                    onChange={(e) => setWall(position, { sidingDirection: e.target.value as SidingDirection })}
                    options={[
                      { value: 'horizontal', label: 'Horizontal' },
                      { value: 'vertical', label: 'Vertical' },
                    ]}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button
          onClick={() => {
            markStepComplete('walls')
            nextStep()
          }}
        >
          Next: Doors
        </Button>
      </div>
    </div>
  )
}
