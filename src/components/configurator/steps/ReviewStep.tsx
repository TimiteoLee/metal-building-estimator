'use client'

import { useState } from 'react'
import { useConfiguratorStore } from '@/store/configurator-store'
import { ROOF_COLORS, TRIM_COLORS, SIDING_COLORS } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/format'

function getColorName(id: string, colors: { id: string; name: string }[]): string {
  return colors.find((c) => c.id === id)?.name || id
}

export function ReviewStep() {
  const config = useConfiguratorStore((s) => s.config)
  const pricing = useConfiguratorStore((s) => s.pricing)
  const prevStep = useConfiguratorStore((s) => s.prevStep)

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryZip: '',
    additionalComments: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config,
          customer,
          screenshotUrls: [],
        }),
      })
      if (!res.ok) {
        const errData = await res.json().catch(() => ({ error: 'Submission failed' }))
        setError(errData.error || 'Submission failed. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Failed to submit quote. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quote Submitted!</h2>
        <p className="text-gray-600 mb-4">
          Check your email at <span className="font-medium">{customer.email}</span> for your PDF proposal.
        </p>
        <p className="text-sm text-gray-500">
          If you don&apos;t receive it within 5 minutes, please contact us.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
      <p className="text-gray-600 mb-6">Review your configuration and submit for a detailed proposal.</p>

      {/* Spec Summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Building Summary</h3>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <dt className="text-gray-500">Style</dt>
          <dd className="font-medium">{config.styleName}</dd>
          <dt className="text-gray-500">Dimensions</dt>
          <dd className="font-medium">{config.dimensions.width}&apos; x {config.dimensions.length}&apos; x {config.dimensions.legHeight}&apos;</dd>
          <dt className="text-gray-500">Roof</dt>
          <dd className="font-medium">{config.roof.style.replace('_', ' ')} — {config.roof.pitch}</dd>
          <dt className="text-gray-500">Roof Color</dt>
          <dd className="font-medium">{getColorName(config.colors.roof, ROOF_COLORS)}</dd>
          <dt className="text-gray-500">Trim Color</dt>
          <dd className="font-medium">{getColorName(config.colors.trim, TRIM_COLORS)}</dd>
          <dt className="text-gray-500">Siding Color</dt>
          <dd className="font-medium">{getColorName(config.colors.siding, SIDING_COLORS)}</dd>
          <dt className="text-gray-500">Gauge</dt>
          <dd className="font-medium">{config.gauge}-Gauge</dd>
          <dt className="text-gray-500">Bracing</dt>
          <dd className="font-medium capitalize">{config.brace.replace('_', ' ')}</dd>
          <dt className="text-gray-500">Trusses</dt>
          <dd className="font-medium capitalize">{config.trusses.replace('_', ' ')}</dd>
          <dt className="text-gray-500">Surface</dt>
          <dd className="font-medium capitalize">{config.installationSurface}</dd>
        </dl>

        {/* Walls */}
        <h4 className="font-medium text-gray-900 mt-4 mb-2">Walls</h4>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
          {(['front', 'back', 'left', 'right'] as const).map((pos) => (
            <div key={pos} className="contents">
              <dt className="text-gray-500 capitalize">{pos}</dt>
              <dd className="font-medium capitalize">{config.walls[pos].type.replace(/_/g, ' ')}</dd>
            </div>
          ))}
        </dl>

        {/* Doors */}
        {config.doors.length > 0 && (
          <>
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Doors</h4>
            <ul className="text-sm space-y-1">
              {config.doors.map((door) => (
                <li key={door.id} className="text-gray-600">
                  {door.width}&apos; x {door.height}&apos; {door.type} door on {door.wall} wall
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Lean-Tos */}
        {(config.leftLeanTo.enabled || config.rightLeanTo.enabled) && (
          <>
            <h4 className="font-medium text-gray-900 mt-4 mb-2">Lean-Tos</h4>
            <ul className="text-sm space-y-1">
              {config.leftLeanTo.enabled && (
                <li className="text-gray-600">Left: {config.leftLeanTo.width}&apos; x {config.leftLeanTo.length}&apos;</li>
              )}
              {config.rightLeanTo.enabled && (
                <li className="text-gray-600">Right: {config.rightLeanTo.width}&apos; x {config.rightLeanTo.length}&apos;</li>
              )}
            </ul>
          </>
        )}
      </div>

      {/* Pricing Breakdown */}
      {pricing && (
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Pricing Breakdown</h3>
          <div className="space-y-1 text-sm">
            {pricing.lineItems.map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{formatCurrency(item.price)}</span>
              </div>
            ))}
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-medium">
              <span>Building Estimate</span>
              <span>{formatCurrency(pricing.buildingEstimate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Material Surcharge ({(pricing.materialSurchargePercent * 100).toFixed(0)}%)</span>
              <span>{formatCurrency(pricing.materialSurcharge)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Subtotal</span>
              <span>{formatCurrency(pricing.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Sales Tax ({(pricing.taxRate * 100).toFixed(0)}%)</span>
              <span>{formatCurrency(pricing.salesTax)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Surtax</span>
              <span>{formatCurrency(pricing.discretionarySurtax)}</span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-blue-600">{formatCurrency(pricing.total)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Deposit ({(pricing.depositPercent * 100).toFixed(0)}%)</span>
              <span>{formatCurrency(pricing.depositAmount)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Balance Due</span>
              <span>{formatCurrency(pricing.balanceDue)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Customer Info Form */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Your Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              value={customer.name}
              onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={customer.email}
              onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              value={customer.phone}
              onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery ZIP Code *</label>
            <input
              type="text"
              value={customer.deliveryZip}
              onChange={(e) => setCustomer((c) => ({ ...c, deliveryZip: e.target.value }))}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="33610"
              maxLength={5}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
            <textarea
              value={customer.additionalComments}
              onChange={(e) => setCustomer((c) => ({ ...c, additionalComments: e.target.value }))}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              rows={3}
              placeholder="Any special requirements or questions..."
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-between">
        <Button variant="secondary" onClick={prevStep}>Back</Button>
        <Button
          onClick={handleSubmit}
          disabled={submitting || !customer.name || !customer.email || !customer.deliveryZip}
          size="lg"
        >
          {submitting ? 'Submitting...' : 'Submit & Get Proposal'}
        </Button>
      </div>
    </div>
  )
}
