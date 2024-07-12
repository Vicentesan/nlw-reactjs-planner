import { ArrowRight, Calendar, MapPin, Settings2 } from 'lucide-react'

import { Button } from '../../../../components/buttons'

interface DestinationAndDateStepsProps {
  turnGuestOppositePrevBooleanInput: () => void
  isGuestInputOpen: boolean
}

export function DestinationAndDateSteps({
  turnGuestOppositePrevBooleanInput,
  isGuestInputOpen,
}: DestinationAndDateStepsProps) {
  return (
    <div className="flex h-16 items-center gap-3 rounded-xl bg-zinc-900 px-4 shadow-shape">
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
