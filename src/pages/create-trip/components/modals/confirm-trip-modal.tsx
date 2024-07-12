import { Loader2, Mail, User, X } from 'lucide-react'

import { Button } from '@/components/buttons'

interface ConfirmTripModalProps {
  turnGuestOppositePrevBooleanConfirmTripModal: () => void
  handleCreateTrip: (e: React.FormEvent<HTMLFormElement>) => void
  setOwnerName: (ownerName: string) => void
  setOwnerEmail: (ownerEmail: string) => void
  isHandleCreateTripLoading: boolean
}

export function ConfirmTripModal({
  turnGuestOppositePrevBooleanConfirmTripModal,
  handleCreateTrip,
  setOwnerName,
  setOwnerEmail,
  isHandleCreateTripLoading,
}: ConfirmTripModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Confirmar criação da viagem
            </h2>
            <button
              type="button"
              onClick={turnGuestOppositePrevBooleanConfirmTripModal}
            >
              <X className="size-5 text-zinc-400 transition-colors duration-200 hover:text-zinc-300" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Para concluir a criação da viagem para{' '}
            <span className="font-semibold text-zinc-100">
              Florianópolis, Brasil
            </span>{' '}
            nas datas de{' '}
            <span className="font-semibold text-zinc-100">
              16 a <br /> 27 de Agosto de 2024
            </span>{' '}
            preencha seus dados abaixo:
          </p>
        </div>

        <form onSubmit={handleCreateTrip} className="space-y-4">
          <div className="space-y-2">
            <div className="flex h-14 items-center gap-2 rounded-lg bg-zinc-950 stroke-zinc-800 px-4">
              <User className="size-5 text-zinc-400" />
              <input
                name="name"
                placeholder="Seu nome completo"
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex h-14 items-center gap-2 rounded-lg bg-zinc-950 stroke-zinc-800 px-4">
              <Mail className="size-5 text-zinc-400" />
              <input
                type="email"
                name="email"
                placeholder="Seu e-mail pessoal"
                onChange={(e) => setOwnerEmail(e.target.value)}
                className="w-40 flex-1 bg-transparent text-lg font-medium placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <Button
            type="submit"
            size="full"
            disabled={isHandleCreateTripLoading}
          >
            {isHandleCreateTripLoading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              'Confirmar criação da viagem'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
