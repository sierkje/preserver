import type { ActionArgs, LoaderArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form, useCatch, useLoaderData } from "@remix-run/react"
import invariant from "tiny-invariant"

import { deleteNote, getNote } from "~/models/note.server"
import { requireUserId } from "~/session.server"

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request)
  invariant(params.noteId, "noteId not found")

  const note = await getNote({ userId, id: params.noteId })
  if (!note) {
    throw new Response("Not Found", { status: 404 })
  }
  return json({ note })
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request)
  invariant(params.noteId, "noteId not found")

  await deleteNote({ userId, id: params.noteId })

  return redirect("/notes")
}

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <h3>{data.note.title}</h3>
      <p>{data.note.body}</p>
      <hr />
      <Form method="post">
        <button type="submit">Delete</button>
      </Form>
    </div>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error)

  return <div>An unexpected error occurred: {error.message}</div>
}

export function CatchBoundary() {
  const caught = useCatch()

  if (caught.status === 404) {
    return <div>Note not found</div>
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`)
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIiRub3RlSWQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6IiRub3RlSWQudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBBY3Rpb25BcmdzLCBMb2FkZXJBcmdzIH0gZnJvbSBcIkByZW1peC1ydW4vbm9kZVwiXG5pbXBvcnQgeyBqc29uLCByZWRpcmVjdCB9IGZyb20gXCJAcmVtaXgtcnVuL25vZGVcIlxuaW1wb3J0IHsgRm9ybSwgdXNlQ2F0Y2gsIHVzZUxvYWRlckRhdGEgfSBmcm9tIFwiQHJlbWl4LXJ1bi9yZWFjdFwiXG5pbXBvcnQgaW52YXJpYW50IGZyb20gXCJ0aW55LWludmFyaWFudFwiXG5cbmltcG9ydCB7IGRlbGV0ZU5vdGUsIGdldE5vdGUgfSBmcm9tIFwifi9tb2RlbHMvbm90ZS5zZXJ2ZXJcIlxuaW1wb3J0IHsgcmVxdWlyZVVzZXJJZCB9IGZyb20gXCJ+L3Nlc3Npb24uc2VydmVyXCJcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRlcih7IHJlcXVlc3QsIHBhcmFtcyB9OiBMb2FkZXJBcmdzKSB7XG4gIGNvbnN0IHVzZXJJZCA9IGF3YWl0IHJlcXVpcmVVc2VySWQocmVxdWVzdClcbiAgaW52YXJpYW50KHBhcmFtcy5ub3RlSWQsIFwibm90ZUlkIG5vdCBmb3VuZFwiKVxuXG4gIGNvbnN0IG5vdGUgPSBhd2FpdCBnZXROb3RlKHsgdXNlcklkLCBpZDogcGFyYW1zLm5vdGVJZCB9KVxuICBpZiAoIW5vdGUpIHtcbiAgICB0aHJvdyBuZXcgUmVzcG9uc2UoXCJOb3QgRm91bmRcIiwgeyBzdGF0dXM6IDQwNCB9KVxuICB9XG4gIHJldHVybiBqc29uKHsgbm90ZSB9KVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWN0aW9uKHsgcmVxdWVzdCwgcGFyYW1zIH06IEFjdGlvbkFyZ3MpIHtcbiAgY29uc3QgdXNlcklkID0gYXdhaXQgcmVxdWlyZVVzZXJJZChyZXF1ZXN0KVxuICBpbnZhcmlhbnQocGFyYW1zLm5vdGVJZCwgXCJub3RlSWQgbm90IGZvdW5kXCIpXG5cbiAgYXdhaXQgZGVsZXRlTm90ZSh7IHVzZXJJZCwgaWQ6IHBhcmFtcy5ub3RlSWQgfSlcblxuICByZXR1cm4gcmVkaXJlY3QoXCIvbm90ZXNcIilcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTm90ZURldGFpbHNQYWdlKCkge1xuICBjb25zdCBkYXRhID0gdXNlTG9hZGVyRGF0YTx0eXBlb2YgbG9hZGVyPigpXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGgzPntkYXRhLm5vdGUudGl0bGV9PC9oMz5cbiAgICAgIDxwPntkYXRhLm5vdGUuYm9keX08L3A+XG4gICAgICA8aHIgLz5cbiAgICAgIDxGb3JtIG1ldGhvZD1cInBvc3RcIj5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+RGVsZXRlPC9idXR0b24+XG4gICAgICA8L0Zvcm0+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVycm9yQm91bmRhcnkoeyBlcnJvciB9OiB7IGVycm9yOiBFcnJvciB9KSB7XG4gIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG5cbiAgcmV0dXJuIDxkaXY+QW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZDoge2Vycm9yLm1lc3NhZ2V9PC9kaXY+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDYXRjaEJvdW5kYXJ5KCkge1xuICBjb25zdCBjYXVnaHQgPSB1c2VDYXRjaCgpXG5cbiAgaWYgKGNhdWdodC5zdGF0dXMgPT09IDQwNCkge1xuICAgIHJldHVybiA8ZGl2Pk5vdGUgbm90IGZvdW5kPC9kaXY+XG4gIH1cblxuICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgY2F1Z2h0IHJlc3BvbnNlIHdpdGggc3RhdHVzOiAke2NhdWdodC5zdGF0dXN9YClcbn1cbiJdfQ== */