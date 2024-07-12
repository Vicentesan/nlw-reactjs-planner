import { ArrowRight, UserRoundPlus } from 'lucide-react'

import { Button } from '../../../../components/buttons'

interface InviteGuestsStepProps {
  turnGuestOppositePrevBooleanInviteModal: () => void
  turnGuestOppositePrevBooleanConfirmTripModal: () => void
  emailsToInvite: string[]
}

export function InviteGuestsStep({
  turnGuestOppositePrevBooleanInviteModal,
  turnGuestOppositePrevBooleanConfirmTripModal,
  emailsToInvite,
}: InviteGuestsStepProps) {
  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <Button
        type="button"
        onClick={turnGuestOppositePrevBooleanInviteModal}
        className="flex flex-1 items-center gap-2 text-zinc-400"
      >
        <UserRoundPlus className="size-5" />
        {emailsToInvite.length > 0 ? (
          <span className="flex-1 text-left text-lg text-zinc-100">
            {emailsToInvite.length} pessoa(s) convidada(s)
          </span>
        ) : (
          <span className="flex-1 text-left text-lg text-zinc-400">
            Quem estará na viagem?
          </span>
        )}
      </Button>

      <div className="h-6 w-px bg-zinc-800" />

      <Button
        onClick={turnGuestOppositePrevBooleanConfirmTripModal}
        className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 transition-colors duration-200 hover:bg-lime-400"
      >
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}
