'use client'

interface StepCardProps {
  title: string
  description?: string
  selected: boolean
  onClick: () => void
  children?: React.ReactNode
}

export function StepCard({ title, description, selected, onClick, children }: StepCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-lg border-2 p-4 transition-all ${
        selected
          ? 'border-blue-500 bg-blue-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      {children && <div className="mb-3">{children}</div>}
      <h4 className={`font-medium ${selected ? 'text-blue-900' : 'text-gray-900'}`}>{title}</h4>
      {description && (
        <p className={`text-sm mt-1 ${selected ? 'text-blue-700' : 'text-gray-500'}`}>
          {description}
        </p>
      )}
    </button>
  )
}
