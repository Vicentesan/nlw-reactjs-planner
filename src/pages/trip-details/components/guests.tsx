import { CircleCheck, CircleDashed, UserCog } from 'lucide-react'

import { Button } from '@/components/buttons'

interface GuestsProps {
  turnOppositePrevBooleanManageGuestsModal: () => void
}

export function Guests({
  turnOppositePrevBooleanManageGuestsModal,
}: GuestsProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Convidados</h3>

      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Jessica White
            </span>
            <span className="block truncate text-sm text-zinc-400">
              jessica.white44@yahoo.com
            </span>
          </div>
          <CircleDashed className="size-5 shrink-0 text-zinc-400" />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">
              Dr. Rita Pacocha
            </span>
            <span className="block truncate text-sm text-zinc-400">
              lacy.stiedemann@gmail.com
            </span>
          </div>
          <CircleCheck className="size-5 shrink-0 text-lime-300" />
        </div>
      </div>

      <Button
        onClick={turnOppositePrevBooleanManageGuestsModal}
        variant="secondary"
        size="full"
      >
        <UserCog className="size-5" />
        <span>Gerenciar convidados</span>
      </Button>
    </div>
  )
}
