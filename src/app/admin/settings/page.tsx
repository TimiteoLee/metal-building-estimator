'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Metal Buildings Co.',
    companyPhone: '',
    companyEmail: '',
    companyAddress: '',
    taxRate: '6',
    depositPercent: '10',
    materialSurcharge: '15',
    notificationEmail: '',
  })

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="max-w-2xl space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Company Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings((s) => ({ ...s, companyName: e.target.value }))}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={settings.companyPhone}
                onChange={(e) => setSettings((s) => ({ ...s, companyPhone: e.target.value }))}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={settings.companyEmail}
                onChange={(e) => setSettings((s) => ({ ...s, companyEmail: e.target.value }))}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={settings.companyAddress}
                onChange={(e) => setSettings((s) => ({ ...s, companyAddress: e.target.value }))}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                rows={2}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Financial Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sales Tax Rate (%)</label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings((s) => ({ ...s, taxRate: e.target.value }))}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                min="0"
                max="20"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deposit Percentage (%)</label>
              <input
                type="number"
                value={settings.depositPercent}
                onChange={(e) => setSettings((s) => ({ ...s, depositPercent: e.target.value }))}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material Surcharge (%)</label>
              <input
                type="number"
                value={settings.materialSurcharge}
                onChange={(e) => setSettings((s) => ({ ...s, materialSurcharge: e.target.value }))}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                min="0"
                max="50"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Notifications</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notification Email</label>
            <input
              type="email"
              value={settings.notificationEmail}
              onChange={(e) => setSettings((s) => ({ ...s, notificationEmail: e.target.value }))}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              placeholder="admin@company.com"
            />
            <p className="text-xs text-gray-500 mt-1">Receive a notification when a new quote is submitted.</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => alert('Connect Supabase to save settings')}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
