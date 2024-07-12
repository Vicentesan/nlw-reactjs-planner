import { CircleCheck, CircleDashed, UserCog } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Button } from '@/components/buttons'
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
  const { tripId } = useParams()
  const [tripParticipants, setTripParticipants] = useState<TripParticipant[]>(
    [],
  )

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
