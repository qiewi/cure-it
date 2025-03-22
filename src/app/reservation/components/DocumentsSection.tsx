"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download } from "lucide-react"

interface Document {
  name: string
  size: string
  id: number
}

interface DocumentsSectionProps {
  documents: Document[]
  onDownload?: (id: number) => void
}

export function DocumentsSection({ documents, onDownload }: DocumentsSectionProps) {
  return (
    <Card className="p-3 sm:p-4 h-full">
      <h3 className="font-semibold text-sm sm:text-base">Dokumen</h3>
      <div className="space-y-2">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between rounded-lg border p-2 sm:p-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="sm:w-5 sm:h-5"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <div>
                <p className="font-medium text-sm sm:text-base">{doc.name}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{doc.size}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 sm:h-8 sm:w-8"
              onClick={() => onDownload && onDownload(doc.id)}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}

