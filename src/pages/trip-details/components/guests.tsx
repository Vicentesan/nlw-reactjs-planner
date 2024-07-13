import { CircleCheck, CircleDashed, FolderClosed, UserCog } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/buttons'
import { api } from '@/lib/axios'

interface GuestsProps {
  turnOppositePrevBooleanManageGuestsModal: () => void
  tripId: string
}

interface TripParticipant {
  id: string
  name?: string | null
  email: string
  isConfirmed: boolean
}

export function Guests({
  turnOppositePrevBooleanManageGuestsModal,
  tripId,
}: GuestsProps) {
  const [tripParticipants, setTripParticipants] = useState<TripParticipant[]>(
    [],
  )

  const [hasManageButtonBeenClicked, setHasManageButtonBeenClicked] =
    useState<boolean>(false)

  function handleManageButton(buttonType?: 'invite' | 'remove') {
    if (!buttonType) return setHasManageButtonBeenClicked((prev) => !prev)

    if (buttonType === 'invite')
      return turnOppositePrevBooleanManageGuestsModal()

    if (buttonType === 'remove') {
      // TODO: implement remove functionality
    }
  }

  useEffect(() => {
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
              variant="primary"
              size="full"
            >
              <UserCog className="size-5" />
              <span>Convidar</span>
            </Button>
            <Button
              onClick={() => handleManageButton('remove')}
              variant="danger"
              size="full"
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
