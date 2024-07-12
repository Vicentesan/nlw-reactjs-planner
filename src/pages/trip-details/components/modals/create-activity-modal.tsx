import { Calendar, Tag, X } from 'lucide-react'

import { Button } from '@/components/buttons'

interface CreateActivityModalProps {
  turnOppositePrevBooleanCreateActivityModal: () => void
}

export function CreateActivityModal({
  turnOppositePrevBooleanCreateActivityModal,
}: CreateActivityModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button
              type="button"
              onClick={turnOppositePrevBooleanCreateActivityModal}
            >
              <X className="size-5 text-zinc-400 transition-colors duration-200 hover:text-zinc-300" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar as atividades.
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <div className="flex h-14 items-center gap-2 rounded-lg bg-zinc-950 stroke-zinc-800 px-4">
              <Tag className="size-5 text-zinc-400" />
              <input
                name="title"
                placeholder="Qual a atividade?"
                className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg bg-zinc-950 stroke-zinc-800 px-4">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="datetime-local"
                name="occursAt"
                placeholder="Data e horário da atividade"
                className="w-40 flex-1 bg-transparent text-lg font-medium placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <Button size="full">Salvar atividade</Button>
        </form>
      </div>
    </div>
  )
}
