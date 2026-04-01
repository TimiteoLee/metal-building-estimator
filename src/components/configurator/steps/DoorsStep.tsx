'use client'

import { useConfiguratorStore } from '@/store/configurator-store'
import { STANDARD_GARAGE_DOORS, STANDARD_WALK_DOORS, MAX_DOORS_PER_WALL } from '@/lib/constants'
import type { DoorType, WallPosition } from '@/types/building'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { nanoid } from 'nanoid'

export function DoorsStep() {
  const doors = useConfiguratorStore((s) => s.config.doors)
  const walls = useConfiguratorStore((s) => s.config.walls)
  const addDoor = useConfiguratorStore((s) => s.addDoor)
  const removeDoor = useConfiguratorStore((s) => s.removeDoor)
  const updateDoor = useConfiguratorStore((s) => s.updateDoor)
  const nextStep = useConfiguratorStore((s) => s.nextStep)
  const prevStep = useConfiguratorStore((s) => s.prevStep)
  const markStepComplete = useConfiguratorStore((s) => s.markStepComplete)

  const doorsOnWall = (wall: WallPosition) => doors.filter((d) => d.wall === wall)

  const canAddDoor = (wall: WallPosition) => {
    if (walls[wall].type === 'open') return false
    return doorsOnWall(wall).length < MAX_DOORS_PER_WALL
  }

  const handleAddDoor = (type: DoorType) => {
    const defaults = type === 'garage'
      ? { width: 10, height: 10 }
      : type === 'walk'
        ? { width: 3, height: 7 }
        : { width: 6, height: 5 }

    addDoor({
      id: nanoid(8),
      type,
      wall: 'front',
      width: defaults.width,
      height: defaults.height,
      position: 2,
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Doors</h2>
      <p className="text-gray-600 mb-6">Add garage doors, walk doors, or custom frameouts.</p>

      {/* Existing doors */}
      {doors.length > 0 && (
        <div className="space-y-4 mb-6">
          {doors.map((door) => (
            <div key={door.id} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900 capitalize">{door.type} Door</h4>
                <button
                  onClick={() => removeDoor(door.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Select
                  label="Wall"
                  value={door.wall}
                  onChange={(e) => updateDoor(door.id, { wall: e.target.value as WallPosition })}
                  options={(['front', 'back', 'left', 'right'] as const)
                    .filter((w) => walls[w].type !== 'open' || w === door.wall)
                    .map((w) => ({ value: w, label: w.charAt(0).toUpperCase() + w.slice(1) }))}
                />
                <Select
                  label="Size"
                  value={`${door.width}x${door.height}`}
                  onChange={(e) => {
                    const [w, h] = e.target.value.split('x').map(Number)
                    updateDoor(door.id, { width: w, height: h })
                  }}
                  options={
                    door.type === 'garage'
                      ? STANDARD_GARAGE_DOORS.map((d) => ({ value: `${d.width}x${d.height}`, label: d.label }))
                      : door.type === 'walk'
                        ? STANDARD_WALK_DOORS.map((d) => ({ value: `${d.width}x${d.height}`, label: d.label }))
                        : [
                            { value: '6x5', label: "6' x 5'" },
                            { value: '8x7', label: "8' x 7'" },
                            { value: '10x8', label: "10' x 8'" },
                          ]
                  }
                />
                <Select
                  label="Position (ft from left)"
                  value={String(door.position)}
                  onChange={(e) => updateDoor(door.id, { position: Number(e.target.value) })}
                  options={Array.from({ length: 20 }, (_, i) => ({
                    value: String(i + 1),
                    label: `${i + 1}'`,
                  }))}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add door buttons */}
      <div className="flex gap-3 mb-8">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleAddDoor('garage')}
          disabled={!['front', 'back', 'left', 'right'].some(w => canAddDoor(w as WallPosition))}
        >
          + Garage Door
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleAddDoor('walk')}
          disabled={!['front', 'back', 'left', 'right'].some(w => canAddDoor(w as WallPosition))}
        >
          + Walk Door
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleAddDoor('frameout')}
          disabled={!['front', 'back', 'left', 'right'].some(w => canAddDoor(w as WallPosition))}
        >
          + Frameout
        </Button>
      </div>

      {doors.length === 0 && (
        <p className="text-sm text-gray-500 mb-8">No doors added yet. Doors can only be added to enclosed walls.</p>
      )}

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button
          onClick={() => {
            markStepComplete('doors')
            nextStep()
          }}
        >
          Next: Lean-Tos
        </Button>
      </div>
    </div>
  )
}
