import { Card } from "@/components/ui/card"

interface PaymentItem {
  label: string
  amount: string | number
  // If amount is a string, it should be formatted like "Rp 20.000,00"
  // If amount is a number, it represents the value in the smallest currency unit (e.g., cents)
}

interface PaymentSectionProps {
  items: PaymentItem[]
}

export function PaymentSection({ items }: PaymentSectionProps) {
  // Function to parse currency strings like "Rp 20.000,00" to numbers
  const parseCurrency = (value: string | number): number => {
    if (typeof value === "number") return value

    // Remove currency symbol, dots, and replace comma with dot for decimal
    const numericValue = value
      .replace(/[^\d,]/g, "") // Remove all non-digit and non-comma characters
      .replace(/\./g, "") // Remove dots (thousand separators)
      .replace(",", ".") // Replace comma with dot for decimal

    return Number.parseFloat(numericValue) || 0
  }

  // Function to format numbers to currency strings
  const formatCurrency = (value: number): string => {
    return `Rp ${value
      .toLocaleString("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
      .replace(".", ",")}` // Replace dot with comma for decimal
  }

  // Calculate total from all items
  const total = items.reduce((sum, item) => sum + parseCurrency(item.amount), 0)

  return (
    <Card className="p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
        <div>
            <h3 className="font-semibold text-sm sm:text-base">Pembayaran</h3>
            <p className="mb-3 sm:mb-4 text-xs sm:text-sm text-muted-foreground">
                Berikut adalah keterangan pembayaran dari layanan yang Anda pesan
            </p>
        </div>
      
        <div className="space-y-2">
            {items.map((item, index) => (
            <div key={index} className="flex justify-between text-sm sm:text-base">
                <span>{item.label}</span>
                <span>{typeof item.amount === "string" ? item.amount : formatCurrency(item.amount)}</span>
            </div>
            ))}
            <div className="mt-3 sm:mt-4 flex justify-between border-t pt-3 sm:pt-4 font-semibold text-sm sm:text-base">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
            </div>
        </div>
    </Card>
  )
}

