import {
  ArrowRight,
  AtSign,
  Calendar,
  MapPin,
  Plus,
  Settings2,
  UserRoundPlus,
  X,
} from 'lucide-react'
import { useState } from 'react'

export function App() {
  const [isGuestInputOpen, setIsGuestInputOpen] = useState<boolean>(false)
  const [isGuestModalOpen, setIsGuestModalOpen] = useState<boolean>(false)

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    'vikom.sanchez@gmail.com',
  ])

  function turnGuestOppositePrevBooleanInput() {
    setIsGuestInputOpen((prev) => !prev)
  }

  function turnGuestOppositePrevBooleanModal() {
    setIsGuestModalOpen((prev) => !prev)
  }

  function handleInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const email = data.get('email')?.toString()

    if (!email || emailsToInvite.includes(email.toLowerCase())) return

    setEmailsToInvite((prev) => [...prev, email.toLowerCase()])

    e.currentTarget.reset()
  }

  function removeEmailsFromInvites(emailToRemove: string) {
    const newEmailsToInviteList = emailsToInvite.filter(
      (email) => email !== emailToRemove,
    )

    setEmailsToInvite(newEmailsToInviteList)
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
              <button
                type="button"
                onClick={turnGuestOppositePrevBooleanModal}
                className="flex flex-1 items-center gap-2 text-zinc-400"
              >
                <UserRoundPlus className="size-5" />
                <span className="flex-1 text-left text-lg placeholder-zinc-400">
                  Quem estará na viagem?
                </span>
              </button>

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

      {isGuestModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="shadow-shape w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecionar convidados</h2>
                <button
                  type="button"
                  onClick={turnGuestOppositePrevBooleanModal}
                >
                  <X className="size-5 text-zinc-400 transition-colors duration-200 hover:text-zinc-300" />
                </button>
              </div>

              <p className="text-sm text-zinc-400">
                Os convidados irão receber e-mails para confirmar a participação
                na viagem.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {emailsToInvite.map((email, i) => (
                <div
                  key={`${email}-${i}`}
                  className="flex items-center gap-2 rounded-md bg-zinc-800 px-2.5 py-1.5"
                >
                  <span className="text-zinc-300">{email}</span>
                  <button
                    onClick={() => removeEmailsFromInvites(email)}
                    type="button"
                  >
                    <X className="size-4 text-zinc-400 transition-colors duration-200 hover:text-zinc-300" />
                  </button>
                </div>
              ))}
            </div>

            <div className="h-px w-full bg-zinc-800" />

            <form
              onSubmit={handleInvite}
              className="flex items-center gap-2 rounded-lg bg-zinc-950 stroke-zinc-800 px-4 py-2.5"
            >
              <div className="flex flex-1 items-center gap-2">
                <AtSign className="size-5 text-zinc-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado"
                  className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 transition-colors duration-200 hover:bg-lime-400"
              >
                Convidar
                <Plus className="size-5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
