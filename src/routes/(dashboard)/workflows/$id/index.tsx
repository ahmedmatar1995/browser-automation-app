import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(dashboard)/workflows/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/workflows/$id/"!</div>
}
