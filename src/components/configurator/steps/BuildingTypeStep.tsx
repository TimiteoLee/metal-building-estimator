'use client'

import { useConfiguratorStore } from '@/store/configurator-store'
import { BUILDING_CATEGORIES } from '@/lib/constants'
import { StepCard } from '@/components/ui/StepCard'
import { Button } from '@/components/ui/Button'

export function BuildingTypeStep() {
  const category = useConfiguratorStore((s) => s.config.category)
  const setCategory = useConfiguratorStore((s) => s.setCategory)
  const nextStep = useConfiguratorStore((s) => s.nextStep)
  const markStepComplete = useConfiguratorStore((s) => s.markStepComplete)

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Building Type</h2>
      <p className="text-gray-600 mb-6">Select the type of structure you want to build.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {BUILDING_CATEGORIES.map((cat) => (
          <StepCard
            key={cat.value}
            title={cat.label}
            description={cat.description}
            selected={category === cat.value}
            onClick={() => setCategory(cat.value)}
          />
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => {
            markStepComplete('building_type')
            nextStep()
          }}
          disabled={!category}
        >
          Next: Choose Style
        </Button>
      </div>
    </div>
  )
}
