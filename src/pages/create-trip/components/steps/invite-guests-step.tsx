import { ArrowRight, UserRoundPlus } from 'lucide-react'

import { Button } from '@/components/ui/button'

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
      <button
        type="button"
        onClick={turnGuestOppositePrevBooleanInviteModal}
        className="flex flex-1 items-center gap-4 bg-transparent text-zinc-400 hover:bg-transparent"
      >
        <>
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
        </>
      </button>

      <Button onClick={turnGuestOppositePrevBooleanConfirmTripModal}>
        Confirmar viagem
        <ArrowRight className="size-5" />
      </Button>
    </div>
  )
}
