import {createFileRoute, redirect} from '@tanstack/react-router'
import {LoginRoute} from "./login.tsx";

export const IndexRoute = '/'
export const Route = createFileRoute(IndexRoute)({
  beforeLoad: () => {
      throw redirect({to: LoginRoute})
  }
})
