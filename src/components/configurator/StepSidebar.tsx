'use client'

import { useConfiguratorStore } from '@/store/configurator-store'
import { WIZARD_STEPS, STEP_LABELS, type WizardStep } from '@/types/building'

export function StepSidebar() {
  const currentStep = useConfiguratorStore((s) => s.currentStep)
  const completedSteps = useConfiguratorStore((s) => s.completedSteps)
  const goToStep = useConfiguratorStore((s) => s.goToStep)

  return (
    <nav className="space-y-1">
      {WIZARD_STEPS.map((step, index) => {
        const isCurrent = step === currentStep
        const isCompleted = completedSteps.has(step)
        const canNavigate = isCompleted || isCurrent

        return (
          <button
            key={step}
            onClick={() => canNavigate && goToStep(step)}
            disabled={!canNavigate}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isCurrent
                ? 'bg-blue-50 text-blue-700'
                : isCompleted
                  ? 'text-gray-700 hover:bg-gray-100 cursor-pointer'
                  : 'text-gray-400 cursor-not-allowed'
            }`}
          >
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                isCurrent
                  ? 'bg-blue-600 text-white'
                  : isCompleted
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {isCompleted ? (
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </span>
            {STEP_LABELS[step as WizardStep]}
          </button>
        )
      })}
    </nav>
  )
}
