'use client'

import { useEffect } from 'react'
import { useConfiguratorStore } from '@/store/configurator-store'
import { StepSidebar } from './StepSidebar'
import { PricingDisplay } from './PricingDisplay'
import { BuildingTypeStep } from './steps/BuildingTypeStep'
import { StyleStep } from './steps/StyleStep'
import { DimensionsStep } from './steps/DimensionsStep'
import { RoofStep } from './steps/RoofStep'
import { ColorsStep } from './steps/ColorsStep'
import { WallsStep } from './steps/WallsStep'
import { DoorsStep } from './steps/DoorsStep'
import { LeanToStep } from './steps/LeanToStep'
import { OptionsStep } from './steps/OptionsStep'
import { ReviewStep } from './steps/ReviewStep'
import dynamic from 'next/dynamic'

const BuildingViewer = dynamic(
  () => import('@/components/viewer/BuildingViewer').then((mod) => mod.BuildingViewer),
  { ssr: false, loading: () => <ViewerPlaceholder /> },
)

function ViewerPlaceholder() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-100 to-sky-50 rounded-lg flex items-center justify-center text-gray-400">
      <div className="text-center">
        <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
        <p className="text-sm">Loading 3D Viewer...</p>
      </div>
    </div>
  )
}

const STEP_COMPONENTS: Record<string, React.ComponentType> = {
  building_type: BuildingTypeStep,
  style: StyleStep,
  dimensions: DimensionsStep,
  roof: RoofStep,
  colors: ColorsStep,
  walls: WallsStep,
  doors: DoorsStep,
  lean_tos: LeanToStep,
  options: OptionsStep,
  review: ReviewStep,
}

export function ConfiguratorLayout() {
  const currentStep = useConfiguratorStore((s) => s.currentStep)
  const recalculatePricing = useConfiguratorStore((s) => s.recalculatePricing)

  useEffect(() => {
    recalculatePricing()
  }, [recalculatePricing])

  const StepComponent = STEP_COMPONENTS[currentStep]

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <h1 className="text-lg font-bold text-gray-900">Metal Buildings Co.</h1>
        <span className="text-sm text-gray-500">Building Configurator</span>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar — steps + pricing */}
        <aside className="w-72 bg-white border-r border-gray-200 flex flex-col overflow-y-auto flex-shrink-0">
          <div className="p-4 flex-1">
            <StepSidebar />
          </div>
          <div className="p-4 border-t border-gray-200">
            <PricingDisplay />
          </div>
        </aside>

        {/* Center — step form */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6 min-w-0">
          <div className="max-w-2xl">
            {StepComponent && <StepComponent />}
          </div>
        </main>

        {/* Right — 3D viewer */}
        <aside className="w-[480px] bg-gray-100 border-l border-gray-200 flex-shrink-0 p-4">
          <div className="w-full h-full rounded-lg overflow-hidden">
            <BuildingViewer />
          </div>
        </aside>
      </div>
    </div>
  )
}
