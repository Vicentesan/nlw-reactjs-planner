import { AtSign, Loader2, Plus, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/buttons'

interface InviteGuestsModalProps {
  turnGuestOppositePrevBooleanInviteModal: () => void
  setEmailsToInvite?: (email: string[]) => void
  removeEmailsFromInvites: (email: string) => void
  handleInvite: (e: React.FormEvent<HTMLFormElement>) => void
  emailsToInvite: string[]
  sendInvitesButton?: boolean
  isHandleInviteLoading?: boolean
}

export function InviteGuestsModal({
  turnGuestOppositePrevBooleanInviteModal,
  setEmailsToInvite,
  removeEmailsFromInvites,
  handleInvite,
  emailsToInvite,
  sendInvitesButton,
  isHandleInviteLoading,
}: InviteGuestsModalProps) {
  const [shouldIInviteEmail, setShouldIInviteEmail] = useState<string>()

  console.log(emailsToInvite)

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[640px] space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecionar convidados</h2>
            <button
              type="button"
              onClick={turnGuestOppositePrevBooleanInviteModal}
            >
              <X className="size-5 text-zinc-400 transition-colors duration-200 hover:text-zinc-300" />
            </button>
          </div>

          <p className="text-sm text-zinc-400">
            Os convidados irão receber e-mails para confirmar a participação na
            viagem.
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

        <form onSubmit={handleInvite} className="flex flex-col space-y-6">
          <div className="flex items-center gap-2 rounded-lg bg-zinc-950 stroke-zinc-800 px-4 py-2.5">
            <div className="flex flex-1 items-center gap-2">
              <AtSign className="size-5 text-zinc-400" />
              <input
                type="email"
                name="email"
                value={shouldIInviteEmail ?? ''}
                onChange={
                  setShouldIInviteEmail
                    ? (e) => setShouldIInviteEmail(e.target.value)
                    : undefined
                }
                placeholder="Digite o e-mail do convidado"
                className="w-40 flex-1 bg-transparent text-lg placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
              />
            </div>

            <Button
              onClick={
                sendInvitesButton && setEmailsToInvite
                  ? () => {
                      if (emailsToInvite.length > 0 || !shouldIInviteEmail)
                        return

                      setEmailsToInvite([...emailsToInvite, shouldIInviteEmail])
                      setShouldIInviteEmail('')
                    }
                  : undefined
              }
              type={sendInvitesButton ? 'button' : 'submit'}
              disabled={isHandleInviteLoading ?? isHandleInviteLoading}
            >
              Convidar
              <Plus className="size-5" />
            </Button>
          </div>

          {sendInvitesButton && (
            <Button
              type="submit"
              variant="primary"
              size="full"
              disabled={
                (emailsToInvite.length <= 0 || isHandleInviteLoading) ??
                isHandleInviteLoading
              }
            >
              {isHandleInviteLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                'Enviar convites'
              )}
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}
