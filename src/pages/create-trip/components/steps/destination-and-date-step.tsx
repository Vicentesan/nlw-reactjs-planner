import 'react-day-picker/dist/style.css'

import { format } from 'date-fns'
import { ArrowRight, Calendar, MapPin, Settings2, X } from 'lucide-react'
import { useState } from 'react'
import { type DateRange, DayPicker } from 'react-day-picker'

import { Button } from '@/components/buttons'

interface DestinationAndDateStepsProps {
  turnGuestOppositePrevBooleanInput: () => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
  setDestination: (destination: string) => void
  isGuestInputOpen: boolean
  eventStartAndEndDates: DateRange | undefined
  destination: string | undefined
}

export function DestinationAndDateSteps({
  turnGuestOppositePrevBooleanInput,
  isGuestInputOpen,
  eventStartAndEndDates,
  setEventStartAndEndDates,
  destination,
  setDestination,
}: DestinationAndDateStepsProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)

  function turnGuestOppositePrevBooleanDatePicker() {
    setIsDatePickerOpen((prev) => !prev)
  }

  const displayedDate =
    eventStartAndEndDates &&
    eventStartAndEndDates.from &&
    eventStartAndEndDates.to
      ? `${format(eventStartAndEndDates.from, 'dd/MM/yy')} a ${format(eventStartAndEndDates.to, 'dd/MM/yy')}`
      : null

  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <input
          type="text"
          placeholder="Para onde você vai?"
          className="flex-1 truncate bg-transparent text-lg placeholder-zinc-400 outline-none disabled:cursor-not-allowed"
          disabled={isGuestInputOpen}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <button
        disabled={isGuestInputOpen}
        onClick={turnGuestOppositePrevBooleanDatePicker}
        className="group flex items-center gap-2 bg-transparent text-lg text-zinc-400 transition-colors duration-200 hover:text-lime-400/95 disabled:cursor-not-allowed data-[filled='true']:hover:text-zinc-400"
        data-filled={!!displayedDate}
      >
        <Calendar className="size-5" />

        <span className="flex-1 group-data-[filled='true']:text-zinc-100">
          {displayedDate ?? 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60">
          <div className="space-y-5 rounded-xl bg-zinc-900 px-6 py-5 shadow-shape">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <button
                  type="button"
                  onClick={turnGuestOppositePrevBooleanDatePicker}
                >
                  <X className="size-5 text-zinc-400 transition-colors duration-200 hover:text-zinc-300" />
                </button>
              </div>
            </div>

            <DayPicker
              mode="range"
              selected={eventStartAndEndDates}
              onSelect={setEventStartAndEndDates}
            />
          </div>
        </div>
      )}

      <div className="h-6 w-px bg-zinc-800" />

      {isGuestInputOpen ? (
        <Button onClick={turnGuestOppositePrevBooleanInput} variant="secondary">
          Alterar local/data
          <Settings2 className="size-5" />
        </Button>
      ) : (
        <Button onClick={turnGuestOppositePrevBooleanInput}>
          Continuar
          <ArrowRight className="size-5" />
        </Button>
      )}
    </div>
  )
}
