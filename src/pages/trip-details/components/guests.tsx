import { CircleCheck, CircleDashed, FolderClosed, UserCog } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useContextSelector } from 'use-context-selector'

import { Button } from '@/components/ui/button'
import { TripContext } from '@/contexts/trip-context'
import { api } from '@/lib/axios'

interface GuestsProps {
  turnOppositePrevBooleanManageGuestsModal: () => void
}

interface TripParticipant {
  id: string
  name?: string | null
  email: string
  isConfirmed: boolean
}

export function Guests({
  turnOppositePrevBooleanManageGuestsModal,
}: GuestsProps) {
  const [tripParticipants, setTripParticipants] = useState<TripParticipant[]>(
    [],
  )

  const [hasManageButtonBeenClicked, setHasManageButtonBeenClicked] =
    useState<boolean>(false)

  const tripId = useContextSelector(TripContext, (ctx) => ctx.tripId)

  function handleManageButton(buttonType?: 'invite' | 'remove') {
    if (!tripId) throw new Error('Trip ID not found')
    if (!buttonType) return setHasManageButtonBeenClicked((prev) => !prev)

    if (buttonType === 'invite')
      return turnOppositePrevBooleanManageGuestsModal()

    if (buttonType === 'remove') {
      // TODO: implement remove functionality
    }
  }

  useEffect(() => {
    if (!tripId) throw new Error('Trip ID not found')

    api
      .get(`trips/${tripId}/participants`)
      .then((response) => setTripParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Convidados</h3>

      <div className="space-y-5">
        {tripParticipants?.map((p, i) => (
          <div className="flex items-center justify-between gap-4" key={p.id}>
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {p.name ?? ` Não identificado | Convidado ${i + 1}`}
              </span>
              <span className="block truncate text-sm text-zinc-400">
                {p.email}
              </span>
            </div>
            {p.isConfirmed ? (
              <CircleCheck className="size-5 shrink-0 text-lime-300" />
            ) : (
              <CircleDashed className="size-5 shrink-0 text-zinc-400" />
            )}
          </div>
        ))}
      </div>

      {hasManageButtonBeenClicked ? (
        <>
          <div className="flex space-x-2">
            <Button
              onClick={() => handleManageButton('invite')}
              className="w-full" // here we cont use size="full", because we don't want the h-11
            >
              <UserCog className="size-5" />
              <span>Convidar</span>
            </Button>
            <Button
              onClick={() => handleManageButton('remove')}
              className="w-full" // here we cont use size="full", because we don't want the h-11
              variant="destructive"
              disabled
            >
              <UserCog className="size-5" />
              <span>Remover</span>
            </Button>
          </div>

          <div className="h-px w-full bg-zinc-800" />

          <Button
            onClick={() => handleManageButton()}
            variant="secondary"
            size="full"
          >
            <FolderClosed className="size-5" />
            <span>Fechar gerenciamento</span>
          </Button>

          <div className="h-px w-full bg-zinc-800" />

          <p className="text-center text-sm text-zinc-500">
            funcionalidade de <strong>remoção</strong> ainda esta sendo
            desenvolvida
          </p>
        </>
      ) : (
        <Button
          onClick={() => handleManageButton()}
          variant="secondary"
          size="full"
        >
          <UserCog className="size-5" />
          <span>Gerenciar convidados</span>
        </Button>
      )}
    </div>
  )
}
