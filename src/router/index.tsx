import { createMemoryRouter } from 'react-router'
import { Layout } from '@/components/layout.tsx'
import Dashboard from '@/pages/dashboard.tsx'

const Router = createMemoryRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
    ],
  },
])

export default Router
