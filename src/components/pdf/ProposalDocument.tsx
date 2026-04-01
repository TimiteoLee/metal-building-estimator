/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer'
import type { BuildingConfig, PricingBreakdown, CustomerInfo } from '@/types/building'
import { formatCurrency } from '@/lib/format'

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  companyName: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  quoteNumber: { fontSize: 10, color: '#666' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#1a1a1a' },
  subtitle: { fontSize: 14, textAlign: 'center', color: '#666', marginBottom: 30 },
  renderImage: { width: '100%', height: 400, objectFit: 'contain', marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, color: '#1a1a1a', borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: '#eee' },
  label: { color: '#444', flex: 1 },
  value: { fontWeight: 'bold', textAlign: 'right' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderTopWidth: 2, borderTopColor: '#333', marginTop: 5 },
  totalLabel: { fontSize: 14, fontWeight: 'bold', color: '#1a1a1a' },
  totalValue: { fontSize: 14, fontWeight: 'bold', color: '#2563eb' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 8, color: '#999' },
  customerSection: { marginBottom: 20, padding: 15, backgroundColor: '#f8f9fa', borderRadius: 4 },
  customerLabel: { fontSize: 9, color: '#666', marginBottom: 2 },
  customerValue: { fontSize: 11, fontWeight: 'bold', marginBottom: 8 },
})

interface ProposalDocumentProps {
  quoteNumber: string
  config: BuildingConfig
  pricing: PricingBreakdown
  customer: CustomerInfo
  companyName: string
  screenshotUrls: string[]
}

export function ProposalDocument({
  quoteNumber,
  config,
  pricing,
  customer,
  companyName,
  screenshotUrls,
}: ProposalDocumentProps) {
  return (
    <Document>
      {/* Page 1: Cover */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.quoteNumber}>Quote #{quoteNumber}</Text>
        </View>
        <Text style={styles.title}>Custom Building Proposal</Text>
        <Text style={styles.subtitle}>
          {config.styleName} — {config.dimensions.width}&apos; x {config.dimensions.length}&apos; x {config.dimensions.legHeight}&apos;
        </Text>
        {screenshotUrls[0] && (
          <Image src={screenshotUrls[0]} style={styles.renderImage} />
        )}
        <View style={styles.customerSection}>
          <Text style={styles.customerLabel}>Prepared for</Text>
          <Text style={styles.customerValue}>{customer.name}</Text>
          <Text style={styles.customerLabel}>Email</Text>
          <Text style={styles.customerValue}>{customer.email}</Text>
          {customer.phone && (
            <>
              <Text style={styles.customerLabel}>Phone</Text>
              <Text style={styles.customerValue}>{customer.phone}</Text>
            </>
          )}
          <Text style={styles.customerLabel}>Delivery ZIP</Text>
          <Text style={styles.customerValue}>{customer.deliveryZip}</Text>
        </View>
        <Text style={styles.footer}>{companyName} — Generated {new Date().toLocaleDateString()}</Text>
      </Page>

      {/* Pages 2-5: 3D Renders */}
      {screenshotUrls.slice(0, 4).map((url, i) => (
        <Page key={i} size="LETTER" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.companyName}>{companyName}</Text>
            <Text style={styles.quoteNumber}>Quote #{quoteNumber}</Text>
          </View>
          <Image src={url} style={{ width: '100%', height: 500, objectFit: 'contain' }} />
          <Text style={{ textAlign: 'center', color: '#666', marginTop: 10 }}>
            View {i + 1} of 4
          </Text>
          <Text style={styles.footer}>{companyName} — Generated {new Date().toLocaleDateString()}</Text>
        </Page>
      ))}

      {/* Pricing Summary Page */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.quoteNumber}>Quote #{quoteNumber}</Text>
        </View>
        <Text style={styles.sectionTitle}>Pricing Summary</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Building Estimate</Text>
          <Text style={styles.value}>{formatCurrency(pricing.buildingEstimate)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Material Surcharge ({(pricing.materialSurchargePercent * 100).toFixed(0)}%)</Text>
          <Text style={styles.value}>{formatCurrency(pricing.materialSurcharge)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>{formatCurrency(pricing.subtotal)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sales Tax ({(pricing.taxRate * 100).toFixed(1)}%)</Text>
          <Text style={styles.value}>{formatCurrency(pricing.salesTax)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Discretionary Surtax</Text>
          <Text style={styles.value}>{formatCurrency(pricing.discretionarySurtax)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total Tax</Text>
          <Text style={styles.value}>{formatCurrency(pricing.totalTax)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatCurrency(pricing.total)}</Text>
        </View>
        <View style={[styles.row, { marginTop: 10 }]}>
          <Text style={styles.label}>Required Deposit ({(pricing.depositPercent * 100).toFixed(0)}%)</Text>
          <Text style={styles.value}>{formatCurrency(pricing.depositAmount)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Balance Due at Installation</Text>
          <Text style={styles.value}>{formatCurrency(pricing.balanceDue)}</Text>
        </View>

        {customer.additionalComments && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitle}>Additional Comments</Text>
            <Text style={{ color: '#444' }}>{customer.additionalComments}</Text>
          </View>
        )}

        <Text style={styles.footer}>{companyName} — Generated {new Date().toLocaleDateString()}</Text>
      </Page>

      {/* Spec Sheet Page */}
      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.companyName}>{companyName}</Text>
          <Text style={styles.quoteNumber}>Quote #{quoteNumber}</Text>
        </View>
        <Text style={styles.sectionTitle}>Itemized Specifications</Text>

        {pricing.lineItems.map((item, i) => (
          <View key={i} style={styles.row}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.value}>{formatCurrency(item.price)}</Text>
          </View>
        ))}

        <View style={{ marginTop: 20 }}>
          <Text style={styles.sectionTitle}>Building Details</Text>
          {[
            ['Style', config.styleName],
            ['Dimensions', `${config.dimensions.width}' x ${config.dimensions.length}' x ${config.dimensions.legHeight}'`],
            ['Roof Style', config.roof.style.replace(/_/g, ' ')],
            ['Roof Pitch', config.roof.pitch],
            ['Overhang', config.roof.overhang],
            ['Gauge', `${config.gauge}-Gauge`],
            ['Bracing', config.brace.replace(/_/g, ' ')],
            ['Trusses', config.trusses.replace(/_/g, ' ')],
            ['Installation Surface', config.installationSurface],
          ].map(([label, value], i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>{companyName} — Generated {new Date().toLocaleDateString()}</Text>
      </Page>
    </Document>
  )
}
