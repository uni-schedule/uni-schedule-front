import { createFileRoute, redirect } from '@tanstack/react-router'
import { IndexRoute } from './index.tsx'

export const Route = createFileRoute('/*')({
  beforeLoad: () => {
    throw redirect({ to: IndexRoute })
  },
})
