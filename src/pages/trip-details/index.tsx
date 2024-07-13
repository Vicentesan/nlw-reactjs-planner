import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { InviteGuestsModal } from '@/components/invite-guests-modal'
import { api } from '@/lib/axios'

import { Activities } from './components/activities'
import { DestinationAndDateHeader } from './components/destination-and-date-header'
import { Guests } from './components/guests'
import { ImportantLinks } from './components/important-links'
import { ConfirmParticipationModal } from './components/modals/confirm-participation-modal'
import { CreateActivityModal } from './components/modals/create-activity-modal'
import { CreateNewLinkModal } from './components/modals/create-new-link-modal'

export function TripDetailsPage({
  confirmParticipant,
}: {
  confirmParticipant?: boolean
}) {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState<boolean>(false)
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] =
    useState<boolean>(false)
  const [isManageGuestsModalOpen, setIsManageGuestsModalOpen] =
    useState<boolean>(false)

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])

  const { tripId } = useParams()

  if (!tripId) return null

  function turnOppositePrevBooleanCreateActivityModal() {
    setIsCreateActivityModalOpen((prev) => !prev)
  }

  function turnGuestOppositePrevBooleanInviteModal() {
    setIsManageGuestsModalOpen((prev) => !prev)
  }

  function turnOppositePrevBooleanCreateLinkModal() {
    setIsCreateLinkModalOpen((prev) => !prev)
  }

  function turnOppositePrevBooleanManageGuestsModal() {
    setIsManageGuestsModalOpen((prev) => !prev)
  }

  const [isHandleInviteLoading, setIsHandleInviteLoading] =
    useState<boolean>(false)

  async function handleInvite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (emailsToInvite.length < 0) return

    setIsHandleInviteLoading(true)

    try {
      await api
        .post(`/trips/${tripId}/invites`, {
          emails: emailsToInvite,
        })
        .then(async () => {
          setIsHandleInviteLoading(false)
          setTimeout(() => {
            window.document.location.reload()
          }, 3000)
        })
    } catch (err) {
      setIsHandleInviteLoading(false)

      throw new Error(err as string)
    }
  }

  function removeEmailsFromInvites(emailToRemove: string) {
    const newEmailsToInviteList = emailsToInvite.filter(
      (email) => email !== emailToRemove,
    )

    setEmailsToInvite(newEmailsToInviteList)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <DestinationAndDateHeader tripId={tripId} />

      <main className="flex gap-16">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <button
              onClick={turnOppositePrevBooleanCreateActivityModal}
              className="flex items-center gap-2 rounded-lg bg-lime-300 px-5 py-2 font-medium text-lime-950 transition-colors duration-200 hover:bg-lime-400"
            >
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>

          <Activities tripId={tripId} />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks
            tripId={tripId}
            turnOppositePrevBooleanCreateLinkModal={
              turnOppositePrevBooleanCreateLinkModal
            }
          />

          <div className="h-px w-full bg-zinc-800" />

          <Guests
            tripId={tripId}
            turnOppositePrevBooleanManageGuestsModal={
              turnOppositePrevBooleanManageGuestsModal
            }
          />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          tripId={tripId}
          turnOppositePrevBooleanCreateActivityModal={
            turnOppositePrevBooleanCreateActivityModal
          }
        />
      )}

      {isCreateLinkModalOpen && (
        <CreateNewLinkModal
          tripId={tripId}
          turnOppositePrevBooleanCreateLinkModal={
            turnOppositePrevBooleanCreateLinkModal
          }
        />
      )}

      {isManageGuestsModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          setEmailsToInvite={setEmailsToInvite}
          handleInvite={handleInvite}
          removeEmailsFromInvites={removeEmailsFromInvites}
          turnGuestOppositePrevBooleanInviteModal={
            turnGuestOppositePrevBooleanInviteModal
          }
          sendInvitesButton
          isHandleInviteLoading={isHandleInviteLoading}
        />
      )}

      {confirmParticipant && <ConfirmParticipationModal tripId={tripId} />}
    </div>
  )
}
