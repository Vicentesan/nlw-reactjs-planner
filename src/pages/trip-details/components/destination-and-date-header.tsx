import { format } from 'date-fns'
import { Calendar, MapPin, Settings2 } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/buttons'
import { api } from '@/lib/axios'

interface DestinationAndDateHeaderProps {
  tripId: string
}

interface Trip {
  id: string
  destination: string
  startsAt: string
  endsAt: string
  isConfirmed: boolean
}

export function DestinationAndDateHeader({
  tripId,
}: DestinationAndDateHeaderProps) {
  const [trip, setTrip] = useState<Trip | undefined>()

  useEffect(() => {
    api.get(`trips/${tripId}`).then((response) => setTrip(response.data.trip))
  }, [tripId])

  const displayedDate = trip
    ? `${format(trip.startsAt, 'dd/MM/yy')} a ${format(trip.endsAt, 'dd/MM/yy')}`
    : null

  return (
    <div className="flex h-16 w-full items-center justify-between rounded-xl bg-zinc-900 px-6 shadow-shape">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className="text-lg text-zinc-100">{displayedDate}</span>
        </div>

        <div className="h-6 w-px bg-zinc-800" />

        <Button variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      </div>
    </div>
  )
}
