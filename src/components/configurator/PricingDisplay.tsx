'use client'

import { useConfiguratorStore } from '@/store/configurator-store'
import { formatCurrency } from '@/lib/format'

export function PricingDisplay() {
  const pricing = useConfiguratorStore((s) => s.pricing)

  if (!pricing) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 text-center text-sm text-gray-500">
        Select a building style to see pricing
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Estimated Pricing</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Building Estimate</span>
          <span className="font-medium">{formatCurrency(pricing.buildingEstimate)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Material Surcharge ({(pricing.materialSurchargePercent * 100).toFixed(0)}%)</span>
          <span className="font-medium">{formatCurrency(pricing.materialSurcharge)}</span>
        </div>
        <div className="border-t border-gray-100 pt-2 flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatCurrency(pricing.subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Tax ({(pricing.taxRate * 100).toFixed(0)}%)</span>
          <span className="font-medium">{formatCurrency(pricing.totalTax)}</span>
        </div>
        <div className="border-t border-gray-200 pt-2 flex justify-between text-base">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-blue-600">{formatCurrency(pricing.total)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Deposit ({(pricing.depositPercent * 100).toFixed(0)}%)</span>
          <span>{formatCurrency(pricing.depositAmount)}</span>
        </div>
      </div>
    </div>
  )
}
