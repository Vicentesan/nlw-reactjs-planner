import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Activities } from './components/activities'
import { DestinationAndDateHeader } from './components/destination-and-date-header'
import { Guests } from './components/guests'
import { ImportantLinks } from './components/important-links'
import { ConfirmParticipationModal } from './components/modals/confirm-participation-modal'
import { CreateActivityModal } from './components/modals/create-activity-modal'

export function TripDetailsPage({
  confirmParticipant,
}: {
  confirmParticipant?: boolean
}) {
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] =
    useState<boolean>(false)
  const [, setIsCreateLinkModalOpen] = useState<boolean>(false)
  const [, setIsManageGuestsModalOpen] = useState<boolean>(false)

  function turnOppositePrevBooleanCreateActivityModal() {
    setIsCreateActivityModalOpen((prev) => !prev)
  }

  function turnOppositePrevBooleanCreateLinkModal() {
    setIsCreateLinkModalOpen((prev) => !prev)
  }

  function turnOppositePrevBooleanManageGuestsModal() {
    setIsManageGuestsModalOpen((prev) => !prev)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <DestinationAndDateHeader />

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

          <Activities />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks
            turnOppositePrevBooleanCreateLinkModal={
              turnOppositePrevBooleanCreateLinkModal
            }
          />

          <div className="h-px w-full bg-zinc-800" />

          <Guests
            turnOppositePrevBooleanManageGuestsModal={
              turnOppositePrevBooleanManageGuestsModal
            }
          />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal
          turnOppositePrevBooleanCreateActivityModal={
            turnOppositePrevBooleanCreateActivityModal
          }
        />
      )}

      {confirmParticipant && <ConfirmParticipationModal />}
    </div>
  )
}
