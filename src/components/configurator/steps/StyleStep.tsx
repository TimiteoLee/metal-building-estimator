'use client'

import { useConfiguratorStore } from '@/store/configurator-store'
import { StepCard } from '@/components/ui/StepCard'
import { Button } from '@/components/ui/Button'

// Hardcoded styles per category (will be fetched from DB later)
const STYLES_BY_CATEGORY: Record<string, { id: string; name: string; description: string }[]> = {
  metal_building: [
    { id: 'step-down-barn', name: 'Step Down Barn', description: 'Classic barn profile with step-down sides' },
    { id: 'regular-barn', name: 'Regular Barn', description: 'Traditional barn style' },
    { id: 'a-frame-vertical', name: 'A-Frame Vertical', description: 'Peaked roof with vertical panels' },
  ],
  carport: [
    { id: 'regular-style', name: 'Regular Style', description: 'Standard carport design' },
    { id: 'a-frame-carport', name: 'A-Frame Carport', description: 'Peaked carport roof' },
  ],
  post_frame: [
    { id: 'post-frame-barn', name: 'Post Frame Barn', description: 'Wood post construction with metal siding' },
  ],
  shed: [
    { id: 'garden-shed', name: 'Garden Shed', description: 'Compact storage building' },
  ],
}

export function StyleStep() {
  const category = useConfiguratorStore((s) => s.config.category)
  const styleId = useConfiguratorStore((s) => s.config.styleId)
  const setStyle = useConfiguratorStore((s) => s.setStyle)
  const nextStep = useConfiguratorStore((s) => s.nextStep)
  const prevStep = useConfiguratorStore((s) => s.prevStep)
  const markStepComplete = useConfiguratorStore((s) => s.markStepComplete)

  const styles = STYLES_BY_CATEGORY[category] || []

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Style</h2>
      <p className="text-gray-600 mb-6">Select a building style that fits your needs.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {styles.map((style) => (
          <StepCard
            key={style.id}
            title={style.name}
            description={style.description}
            selected={styleId === style.id}
            onClick={() => setStyle(style.id, style.name)}
          />
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button
          onClick={() => {
            markStepComplete('style')
            nextStep()
          }}
          disabled={!styleId}
        >
          Next: Dimensions
        </Button>
      </div>
    </div>
  )
}
