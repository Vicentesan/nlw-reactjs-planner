import { Link2, Plus } from 'lucide-react'

import { Button } from '../../../components/buttons'

interface ImportantLinksProps {
  turnOppositePrevBooleanCreateLinkModal: () => void
}

export function ImportantLinks({
  turnOppositePrevBooleanCreateLinkModal,
}: ImportantLinksProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Links importantes</h3>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Reserva do AirBnB
            </span>
            <a
              href="#"
              className="block truncate text-xs text-zinc-400 transition-colors duration-200 hover:text-zinc-200"
            >
              https://www.airbnb.com.br/rooms/104700011
            </a>
          </div>
          <Link2 className="size-5 shrink-0 text-zinc-400" />
          {/* cursor-pointer transition-colors duration-200 hover:text-lime-300 */}
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Regras da casa
            </span>
            <a
              href="#"
              className="block truncate text-xs text-zinc-400 transition-colors duration-200 hover:text-zinc-200"
            >
              https://www.notion.com/pages/1047000112354648336?adults=13&children=0&infants=0&pets=0&wishlist_item_id=11003621872995&check_in=2024-08-17&check_out=2024-08-26&source_impression_id=p3_1717600906_P3DL0E-bJZzguEci&previous_page_section_name=1000
            </a>
          </div>
          <Link2 className="size-5 shrink-0 text-zinc-400" />
          {/* cursor-pointer transition-colors duration-200 hover:text-lime-300 */}
        </div>
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
