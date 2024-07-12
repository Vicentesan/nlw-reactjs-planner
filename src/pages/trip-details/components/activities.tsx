import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CircleCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { api } from '@/lib/axios'

interface TripActivity {
  date: string
  activities: {
    id: string
    title: string
    occursAt: string
  }[]
}

export function Activities() {
  const { tripId } = useParams()
  const [tripActivities, setTripActivities] = useState<TripActivity[]>([])

  useEffect(() => {
    api
      .get(`/trips/${tripId}/activities`)
      .then((response) => setTripActivities(response.data.activities))
  }, [tripId])

  return (
    <div className="space-y-8">
      {tripActivities.map((category) => (
        <div className="space-y-2.5" key={category.date}>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold text-zinc-300">
              Dia{' '}
              {format(category.date, 'd', {
                locale: ptBR,
              })}
            </span>
            <span className="text-xs text-zinc-500">
              {format(category.date, 'eeee', {
                locale: ptBR,
              })
                .charAt(0)
                .toUpperCase() +
                format(category.date, 'eeee', {
                  locale: ptBR,
                }).slice(1)}
            </span>
          </div>
          {category.activities.length > 0 ? (
            <div className="space-y-2.5">
              {category.activities.map((ac) => (
                <div key={ac.id}>
                  <div className="flex items-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 shadow-shape">
                    <CircleCheck className="size-5 text-lime-300" />
                    <span className="text-zinc-100">{ac.title}</span>
                    <span className="ml-auto text-sm text-zinc-400">
                      {format(new Date(ac.occursAt), "HH:mm'h'", {
                        locale: ptBR,
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              Nenhuma atividade cadastrada nessa data.
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
