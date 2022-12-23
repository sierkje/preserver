import type { ActionArgs } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form, useActionData } from "@remix-run/react"
import * as React from "react"

import { createNote } from "~/models/note.server"
import { requireUserId } from "~/session.server"

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request)

  const formData = await request.formData()
  const title = formData.get("title")
  const body = formData.get("body")

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { title: "Title is required", body: null } },
      { status: 400 }
    )
  }

  if (typeof body !== "string" || body.length === 0) {
    return json(
      { errors: { title: null, body: "Body is required" } },
      { status: 400 }
    )
  }

  const note = await createNote({ title, body, userId })

  return redirect(`/notes/${note.id}`)
}

export default function NewNotePage() {
  const actionData = useActionData<typeof action>()
  const titleRef = React.useRef<HTMLInputElement>(null)
  const bodyRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus()
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus()
    }
  }, [actionData])

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label>
          <span>Title: </span>
          <input
            ref={titleRef}
            name="title"
            aria-invalid={actionData?.errors?.title ? true : undefined}
            aria-errormessage={
              actionData?.errors?.title ? "title-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.title && (
          <div id="title-error">{actionData.errors.title}</div>
        )}
      </div>

      <div>
        <label>
          <span>Body: </span>
          <textarea
            ref={bodyRef}
            name="body"
            rows={8}
            aria-invalid={actionData?.errors?.body ? true : undefined}
            aria-errormessage={
              actionData?.errors?.body ? "body-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.body && (
          <div id="body-error">{actionData.errors.body}</div>
        )}
      </div>

      <div>
        <button type="submit">Save</button>
      </div>
    </Form>
  )
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoibmV3LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQWN0aW9uQXJncyB9IGZyb20gXCJAcmVtaXgtcnVuL25vZGVcIlxuaW1wb3J0IHsganNvbiwgcmVkaXJlY3QgfSBmcm9tIFwiQHJlbWl4LXJ1bi9ub2RlXCJcbmltcG9ydCB7IEZvcm0sIHVzZUFjdGlvbkRhdGEgfSBmcm9tIFwiQHJlbWl4LXJ1bi9yZWFjdFwiXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG5pbXBvcnQgeyBjcmVhdGVOb3RlIH0gZnJvbSBcIn4vbW9kZWxzL25vdGUuc2VydmVyXCJcbmltcG9ydCB7IHJlcXVpcmVVc2VySWQgfSBmcm9tIFwifi9zZXNzaW9uLnNlcnZlclwiXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhY3Rpb24oeyByZXF1ZXN0IH06IEFjdGlvbkFyZ3MpIHtcbiAgY29uc3QgdXNlcklkID0gYXdhaXQgcmVxdWlyZVVzZXJJZChyZXF1ZXN0KVxuXG4gIGNvbnN0IGZvcm1EYXRhID0gYXdhaXQgcmVxdWVzdC5mb3JtRGF0YSgpXG4gIGNvbnN0IHRpdGxlID0gZm9ybURhdGEuZ2V0KFwidGl0bGVcIilcbiAgY29uc3QgYm9keSA9IGZvcm1EYXRhLmdldChcImJvZHlcIilcblxuICBpZiAodHlwZW9mIHRpdGxlICE9PSBcInN0cmluZ1wiIHx8IHRpdGxlLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBqc29uKFxuICAgICAgeyBlcnJvcnM6IHsgdGl0bGU6IFwiVGl0bGUgaXMgcmVxdWlyZWRcIiwgYm9keTogbnVsbCB9IH0sXG4gICAgICB7IHN0YXR1czogNDAwIH1cbiAgICApXG4gIH1cblxuICBpZiAodHlwZW9mIGJvZHkgIT09IFwic3RyaW5nXCIgfHwgYm9keS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ganNvbihcbiAgICAgIHsgZXJyb3JzOiB7IHRpdGxlOiBudWxsLCBib2R5OiBcIkJvZHkgaXMgcmVxdWlyZWRcIiB9IH0sXG4gICAgICB7IHN0YXR1czogNDAwIH1cbiAgICApXG4gIH1cblxuICBjb25zdCBub3RlID0gYXdhaXQgY3JlYXRlTm90ZSh7IHRpdGxlLCBib2R5LCB1c2VySWQgfSlcblxuICByZXR1cm4gcmVkaXJlY3QoYC9ub3Rlcy8ke25vdGUuaWR9YClcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTmV3Tm90ZVBhZ2UoKSB7XG4gIGNvbnN0IGFjdGlvbkRhdGEgPSB1c2VBY3Rpb25EYXRhPHR5cGVvZiBhY3Rpb24+KClcbiAgY29uc3QgdGl0bGVSZWYgPSBSZWFjdC51c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbClcbiAgY29uc3QgYm9keVJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MVGV4dEFyZWFFbGVtZW50PihudWxsKVxuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGFjdGlvbkRhdGE/LmVycm9ycz8udGl0bGUpIHtcbiAgICAgIHRpdGxlUmVmLmN1cnJlbnQ/LmZvY3VzKClcbiAgICB9IGVsc2UgaWYgKGFjdGlvbkRhdGE/LmVycm9ycz8uYm9keSkge1xuICAgICAgYm9keVJlZi5jdXJyZW50Py5mb2N1cygpXG4gICAgfVxuICB9LCBbYWN0aW9uRGF0YV0pXG5cbiAgcmV0dXJuIChcbiAgICA8Rm9ybVxuICAgICAgbWV0aG9kPVwicG9zdFwiXG4gICAgICBzdHlsZT17e1xuICAgICAgICBkaXNwbGF5OiBcImZsZXhcIixcbiAgICAgICAgZmxleERpcmVjdGlvbjogXCJjb2x1bW5cIixcbiAgICAgICAgZ2FwOiA4LFxuICAgICAgICB3aWR0aDogXCIxMDAlXCIsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICA8c3Bhbj5UaXRsZTogPC9zcGFuPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgcmVmPXt0aXRsZVJlZn1cbiAgICAgICAgICAgIG5hbWU9XCJ0aXRsZVwiXG4gICAgICAgICAgICBhcmlhLWludmFsaWQ9e2FjdGlvbkRhdGE/LmVycm9ycz8udGl0bGUgPyB0cnVlIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgYXJpYS1lcnJvcm1lc3NhZ2U9e1xuICAgICAgICAgICAgICBhY3Rpb25EYXRhPy5lcnJvcnM/LnRpdGxlID8gXCJ0aXRsZS1lcnJvclwiIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAge2FjdGlvbkRhdGE/LmVycm9ycz8udGl0bGUgJiYgKFxuICAgICAgICAgIDxkaXYgaWQ9XCJ0aXRsZS1lcnJvclwiPnthY3Rpb25EYXRhLmVycm9ycy50aXRsZX08L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2PlxuICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgPHNwYW4+Qm9keTogPC9zcGFuPlxuICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgcmVmPXtib2R5UmVmfVxuICAgICAgICAgICAgbmFtZT1cImJvZHlcIlxuICAgICAgICAgICAgcm93cz17OH1cbiAgICAgICAgICAgIGFyaWEtaW52YWxpZD17YWN0aW9uRGF0YT8uZXJyb3JzPy5ib2R5ID8gdHJ1ZSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgIGFyaWEtZXJyb3JtZXNzYWdlPXtcbiAgICAgICAgICAgICAgYWN0aW9uRGF0YT8uZXJyb3JzPy5ib2R5ID8gXCJib2R5LWVycm9yXCIgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICB7YWN0aW9uRGF0YT8uZXJyb3JzPy5ib2R5ICYmIChcbiAgICAgICAgICA8ZGl2IGlkPVwiYm9keS1lcnJvclwiPnthY3Rpb25EYXRhLmVycm9ycy5ib2R5fTwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlNhdmU8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvRm9ybT5cbiAgKVxufVxuIl19 */