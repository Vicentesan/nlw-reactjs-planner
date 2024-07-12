import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { useNavigate } from 'react-router-dom'

import { api } from '@/lib/axios'

import { ConfirmTripModal } from './components/modals/confirm-trip-modal'
import { InviteGuestsModal } from './components/modals/invite-guests-modal'
import { DestinationAndDateSteps } from './components/steps/destination-and-date-step'
import { InviteGuestsStep } from './components/steps/invite-guests-step'

export function CreateTripPage() {
  const navigate = useNavigate()

  const [isGuestInputOpen, setIsGuestInputOpen] = useState<boolean>(false)
  const [isGuestInviteModalOpen, setIsGuestInviteModalOpen] =
    useState<boolean>(false)
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] =
    useState<boolean>(false)

  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >(undefined)

  const [destination, setDestination] = useState<string | undefined>()
  const [ownerName, setOwnerName] = useState<string | undefined>()
  const [ownerEmail, setOwnerEmail] = useState<string | undefined>()

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([
    'vikom.sanchez@gmail.com',
  ])

  const [isHandleCreateTripLoading, setIsHandleCreateTripLoading] =
    useState<boolean>(false)

  function turnGuestOppositePrevBooleanInput() {
    setIsGuestInputOpen((prev) => !prev)
  }

  function turnGuestOppositePrevBooleanInviteModal() {
    setIsGuestInviteModalOpen((prev) => !prev)
  }

  function turnGuestOppositePrevBooleanConfirmTripModal() {
    setIsConfirmTripModalOpen((prev) => !prev)
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

  async function handleCreateTrip(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (
      !destination ||
      !ownerName ||
      !ownerEmail ||
      !eventStartAndEndDates ||
      !(eventStartAndEndDates.to instanceof Date) ||
      !(eventStartAndEndDates.from instanceof Date)
    )
      return

    setIsHandleCreateTripLoading(true)

    try {
      const response = await api.post<{ tripId: string }>('/trips', {
        destination,
        ownerName,
        ownerEmail: ownerEmail.toLowerCase(),
        startsAt: eventStartAndEndDates.from,
        endsAt: eventStartAndEndDates.to,
        emailsToInvite,
      })

      const { tripId } = response.data

      navigate(`/trips/${tripId}`)
    } catch (err) {
      setIsHandleCreateTripLoading(false)

      throw new Error(err as string)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-heroPattern bg-center bg-no-repeat">
      <div className="w-full max-w-3xl space-y-10 px-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-lg text-zinc-300">
            Convide seus amigos e planeje sua próxima viagem!
          </p>
        </div>

        <div className="space-y-4">
          <DestinationAndDateSteps
            isGuestInputOpen={isGuestInputOpen}
            turnGuestOppositePrevBooleanInput={
              turnGuestOppositePrevBooleanInput
            }
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
            destination={destination}
            setDestination={setDestination}
          />

          {isGuestInputOpen && (
            <InviteGuestsStep
              turnGuestOppositePrevBooleanInviteModal={
                turnGuestOppositePrevBooleanInviteModal
              }
              turnGuestOppositePrevBooleanConfirmTripModal={
                turnGuestOppositePrevBooleanConfirmTripModal
              }
              emailsToInvite={emailsToInvite}
            />
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

      {isGuestInviteModalOpen && (
        <InviteGuestsModal
          emailsToInvite={emailsToInvite}
          handleInvite={handleInvite}
          removeEmailsFromInvites={removeEmailsFromInvites}
          turnGuestOppositePrevBooleanInviteModal={
            turnGuestOppositePrevBooleanInviteModal
          }
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          handleCreateTrip={handleCreateTrip}
          turnGuestOppositePrevBooleanConfirmTripModal={
            turnGuestOppositePrevBooleanConfirmTripModal
          }
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
          isHandleCreateTripLoading={isHandleCreateTripLoading}
        />
      )}
    </div>
  )
}
