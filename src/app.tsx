import {
  ArrowRight,
  Calendar,
  MapPin,
  Settings2,
  UserRoundPlus,
} from 'lucide-react'
import { useState } from 'react'

export function App() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState<boolean>(false)

  function turnGuestOppositePrevBooleanInput() {
    setIsGuestInputOpen((prev) => !prev)
  }

  return (
    <div className="bg-heroPattern flex h-screen items-center justify-center bg-center bg-no-repeat">
      <div className="w-full max-w-3xl space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <div className="shadow-shape flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4">
            <div className="flex flex-1 items-center gap-2">
              <MapPin className="size-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Para onde você vai?"
                className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
                disabled={isGuestInputOpen}
              />
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Quando?"
                className="w-40 bg-transparent text-lg placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
                disabled={isGuestInputOpen}
              />
            </div>

            <div className="h-6 w-px bg-zinc-800" />

            {isGuestInputOpen ? (
              <button
                onClick={turnGuestOppositePrevBooleanInput}
                className="flex items-center gap-2 rounded-lg bg-zinc-800 px-5 py-2 font-medium text-zinc-200 transition-colors duration-200 hover:bg-zinc-700"
              >
                Alterar local/data
                <Settings2 className="size-5" />
              </button>
            ) : (
              <button
                onClick={turnGuestOppositePrevBooleanInput}
                className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 transition-colors duration-200 hover:bg-lime-400"
              >
                Continuar
                <ArrowRight className="size-5" />
              </button>
            )}
          </div>

          {isGuestInputOpen && (
            <div className="shadow-shape flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4">
              <div className="flex flex-1 items-center gap-2">
                <UserRoundPlus className="size-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Quem estará na viagem?"
                  className="flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none"
                />
              </div>

              <div className="h-6 w-px bg-zinc-800" />

              <button className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 transition-colors duration-200 hover:bg-lime-400">
                Confirmar viagem
                <ArrowRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pela plann.er você automaticamente concorda{' '}
          <br /> com nossos{' '}
          <a href="#" className="text-zinc-300 underline underline-offset-4">
            termos de uso
          </a>{' '}
          e{' '}
          <a href="#" className="text-zinc-300 underline underline-offset-4">
            políticas de privacidade
          </a>
          .
        </p>
      </div>
    </div>
  )
}
