import 'react-day-picker/dist/style.css'

import { format } from 'date-fns'
import { ArrowRight, Calendar, MapPin, Settings2, X } from 'lucide-react'
import { useState } from 'react'
import { type DateRange, DayPicker } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DestinationAndDateStepsProps {
  turnGuestOppositePrevBooleanInput: () => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
  setDestination: (destination: string) => void
  isGuestInputOpen: boolean
  eventStartAndEndDates: DateRange | undefined
}

export function DestinationAndDateSteps({
  turnGuestOppositePrevBooleanInput,
  isGuestInputOpen,
  eventStartAndEndDates,
  setEventStartAndEndDates,
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
    <div className="shadow-shape flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4">
      <div className="flex flex-1 items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <Input
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
          <div className="shadow-shape space-y-5 rounded-xl bg-zinc-900 px-6 py-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Selecione a data</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={turnGuestOppositePrevBooleanDatePicker}
                >
                  <X className="size-5 text-zinc-400 transition-colors duration-200 hover:text-zinc-300" />
                </Button>
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
