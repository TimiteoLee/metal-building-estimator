'use client'

import type { ColorOption } from '@/types/building'

interface ColorSwatchProps {
  color: ColorOption
  selected: boolean
  onClick: () => void
}

export function ColorSwatch({ color, selected, onClick }: ColorSwatchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all ${
        selected ? 'bg-blue-50 ring-2 ring-blue-500' : 'hover:bg-gray-50'
      }`}
      title={color.name}
    >
      <div
        className={`w-10 h-10 rounded-full border-2 transition-all ${
          selected ? 'border-blue-500 scale-110' : 'border-gray-200 group-hover:border-gray-400'
        }`}
        style={{ backgroundColor: color.hex }}
      />
      <span className="text-xs text-gray-600 text-center leading-tight">{color.name}</span>
    </button>
  )
}
