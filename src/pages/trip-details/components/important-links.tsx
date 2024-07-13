import { Link2, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/buttons'
import { api } from '@/lib/axios'

interface ImportantLinksProps {
  turnOppositePrevBooleanCreateLinkModal: () => void
  tripId: string
}

interface ImportantLink {
  id: string
  title: string
  url: string
}

export function ImportantLinks({
  turnOppositePrevBooleanCreateLinkModal,
  tripId,
}: ImportantLinksProps) {
  const [importantLinks, setImportantLinks] = useState<ImportantLink[]>([])

  useEffect(() => {
    api
      .get(`trips/${tripId}/links`)
      .then((response) => setImportantLinks(response.data.links))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Links importantes</h3>

      <div className="space-y-5">
        {importantLinks.map((link) => (
          <div
            className="flex items-center justify-between gap-4"
            key={link.id}
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {link.title}
              </span>
              <a
                href={link.url}
                target="_blank"
                className="block truncate text-xs text-zinc-400 transition-colors duration-200 hover:text-zinc-200"
              >
                {link.url}
              </a>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(link.url)}
              className="shrink-0 cursor-pointer bg-transparent text-zinc-400 transition-colors duration-200 hover:text-lime-300"
            >
              <Link2 className="size-5" />
            </button>
          </div>
        ))}
      </div>

      <Button
        onClick={turnOppositePrevBooleanCreateLinkModal}
        variant="secondary"
        size="full"
      >
        <Plus className="size-5" />
        <span>Cadastrar novo link</span>
      </Button>
    </div>
  )
}
