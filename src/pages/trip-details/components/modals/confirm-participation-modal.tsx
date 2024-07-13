import { format } from 'date-fns'
import { Loader2, Mail, User, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContextSelector } from 'use-context-selector'

import { Button } from '@/components/ui/button'
import { TripContext } from '@/contexts/trip-context'
import { api } from '@/lib/axios'

interface Trip {
  id: string
  destination: string
  startsAt: string
  endsAt: string
  isConfirmed: boolean
}

export function ConfirmParticipationModal() {
  const [
    isHandleConfirmParticipationLoading,
    setIsHandleConfirmParticipationLoading,
  ] = useState<boolean>(false)

  const [trip, setTrip] = useState<Trip | undefined>()
  const [participantName, setParticipantName] = useState<string | undefined>()
  const [participantEmail, setParticipantEmail] = useState<string | undefined>()

  const { participantId } = useParams()

  const tripId = useContextSelector(TripContext, (ctx) => ctx.tripId)

  if (!tripId) throw new Error('Trip ID not found')

  if (!participantId) return

  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => setTrip(response.data.trip))
    api.get(`participants/${participantId}`).then((response) => {
      setParticipantEmail(response.data.participant.email)
      setParticipantName(response.data.participant.name)
    })
  }, [tripId, participantId])

  const displayedDate = trip
    ? `${format(trip.startsAt, 'dd/MM/yy')} a ${format(trip.endsAt, 'dd/MM/yy')}`
    : null

  async function handleConfirmParticipation(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault()

    setIsHandleConfirmParticipationLoading(true)

    try {
      await api
        .post(`/participants/${participantId}/confirm`, {
          name: participantName,
          email: participantEmail,
        })
        .then(async () => {
          window.document.location.replace(`/trips/${tripId}`)
        })
    } catch (err) {
      setIsHandleConfirmParticipationLoading(false)

      throw new Error(err as string)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[540px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Confirmar participação</h2>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              // onClick={turnOppositePrevBooleanCreateActivityModal} TODO: Implement this function
            >
              <X className="size-5 text-zinc-400 transition-colors duration-200 hover:text-zinc-300" />
            </Button>
          </div>

          <p className="text-sm text-zinc-400">
            Você foi convidado(a) para participar de uma viagem para{' '}
            <strong className="font-bold text-zinc-100">
              {trip?.destination}
            </strong>{' '}
            nas datas de{' '}
            <strong className="font-bold text-zinc-100">{displayedDate}</strong>
            .
          </p>
          <p className="text-sm text-zinc-400">
            Para confirmar sua presença na viagem, preencha os dados abaixo:
          </p>
        </div>

        <form onSubmit={handleConfirmParticipation} className="space-y-4">
          <div className="space-y-2">
            <div className="flex h-14 items-center gap-2 rounded-lg bg-zinc-950 stroke-zinc-800 px-4">
              <User className="size-5 text-zinc-400" />
              <input
                placeholder="Seu nome completo"
                required
                value={participantName || ''}
                onChange={(e) => setParticipantName(e.target.value)}
                className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex h-14 items-center gap-2 rounded-lg bg-zinc-950 stroke-zinc-800 px-4">
              <Mail className="size-5 text-zinc-400" />
              <input
                type="email"
                placeholder="Seu e-mail pessoal"
                required
                value={participantEmail || ''}
                onChange={(e) => setParticipantEmail(e.target.value)}
                className="w-40 flex-1 bg-transparent text-lg font-medium placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isHandleConfirmParticipationLoading}
            size="full"
          >
            {isHandleConfirmParticipationLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              'Confirmar minha presença'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
