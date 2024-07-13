import { Calendar, CircleCheck, Loader2, Tag, X } from 'lucide-react'
import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TripContext } from '@/contexts/trip-context'
import { api } from '@/lib/axios'

interface CreateActivityModalProps {
  turnOppositePrevBooleanCreateActivityModal: () => void
}

export function CreateActivityModal({
  turnOppositePrevBooleanCreateActivityModal,
}: CreateActivityModalProps) {
  const [isHandleCreateActivityLoading, setIsHandleCreateActivityLoading] =
    useState<boolean>(false)
  const [isHandleCreateActivityDone, setIsHandleCreateActivityDone] =
    useState<boolean>(false)

  const tripId = useContextSelector(TripContext, (ctx) => ctx.tripId)

  async function handleCreateActivity(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!tripId) throw new Error('Trip ID not found')

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title')?.toString()
    const occursAt = formData.get('occursAt')?.toString()

    if (!title || !occursAt) return

    setIsHandleCreateActivityLoading(true)

    try {
      await api
        .post(`/trips/${tripId}/activities`, {
          title,
          occursAt,
        })
        .then(async () => {
          setIsHandleCreateActivityLoading(false)
          setIsHandleCreateActivityDone(true)
          setTimeout(() => {
            window.document.location.reload()
          }, 3000)
        })
    } catch (err) {
      setIsHandleCreateActivityLoading(false)

      throw new Error(err as string)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={turnOppositePrevBooleanCreateActivityModal}
            >
              <X className="size-5 text-zinc-400 transition-colors duration-200 hover:text-zinc-300" />
            </Button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form onSubmit={handleCreateActivity} className="space-y-4">
          <div className="space-y-2">
            <div className="flex h-14 items-center gap-2 rounded-lg bg-zinc-950 stroke-zinc-800 px-4">
              <Tag className="size-5 text-zinc-400" />
              <Input
                name="title"
                placeholder="Qual a atividade?"
                className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg bg-zinc-950 stroke-zinc-800 px-4">
              <Calendar className="size-5 text-zinc-400" />
              <Input
                type="datetime-local"
                name="occursAt"
                placeholder="Data e horário da atividade"
                className="w-40 flex-1 bg-transparent text-lg font-medium placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <Button
            disabled={
              isHandleCreateActivityLoading || isHandleCreateActivityDone
            }
            size="full"
          >
            {isHandleCreateActivityLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : isHandleCreateActivityDone ? (
              <CircleCheck className="size-5" />
            ) : (
              'Salvar atividade'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
