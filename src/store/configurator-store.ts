'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type {
  BuildingCategory, BuildingConfig, WallConfig, DoorPlacement,
  LeanToConfig, RoofConfig, ColorConfig, Gauge, BraceType,
  TrussType, InstallationSurface, WizardStep, PricingBreakdown,
  BuildingStyle,
} from '@/types/building'
import { DEFAULT_BUILDING_CONFIG } from '@/lib/constants'
import { WIZARD_STEPS } from '@/types/building'
import { calculatePricing, DEFAULT_PRICING_DATA } from '@/lib/pricing-engine'

interface ConfiguratorState {
  // Building config
  config: BuildingConfig

  // Wizard state
  currentStep: WizardStep
  completedSteps: Set<WizardStep>

  // Pricing
  pricing: PricingBreakdown | null
  pricingStyles: BuildingStyle[]

  // Actions — building
  setCategory: (category: BuildingCategory) => void
  setStyle: (styleId: string, styleName: string) => void
  setDimensions: (width: number, length: number, legHeight: number) => void
  setRoof: (roof: Partial<RoofConfig>) => void
  setColors: (colors: Partial<ColorConfig>) => void
  setWall: (position: 'front' | 'back' | 'left' | 'right', wall: Partial<WallConfig>) => void
  addDoor: (door: DoorPlacement) => void
  removeDoor: (doorId: string) => void
  updateDoor: (doorId: string, updates: Partial<DoorPlacement>) => void
  setLeanTo: (side: 'left' | 'right', config: LeanToConfig) => void
  setGauge: (gauge: Gauge) => void
  setBrace: (brace: BraceType) => void
  setTrusses: (trusses: TrussType) => void
  setInstallationSurface: (surface: InstallationSurface) => void

  // Actions — wizard
  goToStep: (step: WizardStep) => void
  nextStep: () => void
  prevStep: () => void
  markStepComplete: (step: WizardStep) => void

  // Actions — pricing
  setPricingStyles: (styles: BuildingStyle[]) => void
  recalculatePricing: () => void

  // Actions — reset
  resetConfig: () => void
}

export const useConfiguratorStore = create<ConfiguratorState>()(
  persist(
    immer((set, get) => ({
      config: { ...DEFAULT_BUILDING_CONFIG } as BuildingConfig,
      currentStep: 'building_type' as WizardStep,
      completedSteps: new Set<WizardStep>(),
      pricing: null,
      pricingStyles: [],

      // Building actions
      setCategory: (category) => {
        set((state) => {
          state.config.category = category
          state.config.styleId = ''
          state.config.styleName = ''
        })
        get().recalculatePricing()
      },

      setStyle: (styleId, styleName) => {
        set((state) => {
          state.config.styleId = styleId
          state.config.styleName = styleName
        })
        get().recalculatePricing()
      },

      setDimensions: (width, length, legHeight) => {
        set((state) => {
          state.config.dimensions = { width, length, legHeight }
        })
        get().recalculatePricing()
      },

      setRoof: (roof) => {
        set((state) => {
          Object.assign(state.config.roof, roof)
        })
        get().recalculatePricing()
      },

      setColors: (colors) => {
        set((state) => {
          Object.assign(state.config.colors, colors)
        })
      },

      setWall: (position, wall) => {
        set((state) => {
          Object.assign(state.config.walls[position], wall)
        })
        get().recalculatePricing()
      },

      addDoor: (door) => {
        set((state) => {
          state.config.doors.push(door)
        })
        get().recalculatePricing()
      },

      removeDoor: (doorId) => {
        set((state) => {
          state.config.doors = state.config.doors.filter(d => d.id !== doorId)
        })
        get().recalculatePricing()
      },

      updateDoor: (doorId, updates) => {
        set((state) => {
          const door = state.config.doors.find(d => d.id === doorId)
          if (door) Object.assign(door, updates)
        })
        get().recalculatePricing()
      },

      setLeanTo: (side, config) => {
        set((state) => {
          if (side === 'left') {
            state.config.leftLeanTo = config
          } else {
            state.config.rightLeanTo = config
          }
        })
        get().recalculatePricing()
      },

      setGauge: (gauge) => {
        set((state) => { state.config.gauge = gauge })
        get().recalculatePricing()
      },

      setBrace: (brace) => {
        set((state) => { state.config.brace = brace })
        get().recalculatePricing()
      },

      setTrusses: (trusses) => {
        set((state) => { state.config.trusses = trusses })
        get().recalculatePricing()
      },

      setInstallationSurface: (surface) => {
        set((state) => { state.config.installationSurface = surface })
      },

      // Wizard actions
      goToStep: (step) => {
        set((state) => { state.currentStep = step })
      },

      nextStep: () => {
        const { currentStep } = get()
        const currentIndex = WIZARD_STEPS.indexOf(currentStep)
        if (currentIndex < WIZARD_STEPS.length - 1) {
          set((state) => {
            state.completedSteps.add(currentStep)
            state.currentStep = WIZARD_STEPS[currentIndex + 1]
          })
        }
      },

      prevStep: () => {
        const { currentStep } = get()
        const currentIndex = WIZARD_STEPS.indexOf(currentStep)
        if (currentIndex > 0) {
          set((state) => {
            state.currentStep = WIZARD_STEPS[currentIndex - 1]
          })
        }
      },

      markStepComplete: (step) => {
        set((state) => { state.completedSteps.add(step) })
      },

      // Pricing actions
      setPricingStyles: (styles) => {
        set((state) => { state.pricingStyles = styles as BuildingStyle[] })
        get().recalculatePricing()
      },

      recalculatePricing: () => {
        const { config, pricingStyles } = get()
        const data = {
          ...DEFAULT_PRICING_DATA,
          styles: pricingStyles,
        }
        const pricing = calculatePricing(config, data)
        set((state) => { state.pricing = pricing })
      },

      // Reset
      resetConfig: () => {
        set((state) => {
          state.config = { ...DEFAULT_BUILDING_CONFIG } as BuildingConfig
          state.currentStep = 'building_type'
          state.completedSteps = new Set()
          state.pricing = null
        })
      },
    })),
    {
      name: 'metal-building-configurator',
      partialize: (state) => ({
        config: state.config,
        currentStep: state.currentStep,
        completedSteps: Array.from(state.completedSteps),
      }),
      merge: (persisted, current) => {
        const p = persisted as Record<string, unknown> | undefined
        if (!p) return current
        return {
          ...current,
          config: (p.config as BuildingConfig) || current.config,
          currentStep: (p.currentStep as WizardStep) || current.currentStep,
          completedSteps: new Set((p.completedSteps as WizardStep[]) || []),
        }
      },
    },
  ),
)
