import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { TripContextProvider } from './contexts/trip-context'
import { CreateTripPage } from './pages/create-trip'
import { TripDetailsPage } from './pages/trip-details'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />,
  },
  {
    path: '/trips/:tripId/participants/:participantId/confirm',
    element: (
      <TripContextProvider>
        <TripDetailsPage confirmParticipant />
      </TripContextProvider>
    ),
  },
  {
    path: '/trips/:tripId',
    element: (
      <TripContextProvider>
        <TripDetailsPage />
      </TripContextProvider>
    ),
  },
])

export function App() {
  return (
    <TripContextProvider>
      <RouterProvider router={router} />
    </TripContextProvider>
  )
}
