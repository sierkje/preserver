import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react"
import * as React from "react"

import { createUserSession, getUserId } from "~/session.server"
import { verifyLogin } from "~/models/user.server"
import { safeRedirect, validateEmail } from "~/utils"

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request)
  if (userId) return redirect("/")
  return json({})
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/notes")
  const remember = formData.get("remember")

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    )
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    )
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    )
  }

  const user = await verifyLogin(email, password)

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    )
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo,
  })
}

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  }
}

export default function LoginPage() {
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") || "/notes"
  const actionData = useActionData<typeof action>()
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus()
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus()
    }
  }, [actionData])

  return (
    <div>
      <div>
        <Form method="post">
          <div>
            <label htmlFor="email">Email address</label>
            <div>
              <input
                ref={emailRef}
                id="email"
                required
                autoFocus={true}
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
              />
              {actionData?.errors?.email && (
                <div id="email-error">{actionData.errors.email}</div>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
              />
              {actionData?.errors?.password && (
                <div id="password-error">{actionData.errors.password}</div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button type="submit">Log in</button>
          <div>
            <div>
              <input id="remember" name="remember" type="checkbox" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div>
              Don't have an account?{" "}
              <Link
                to={{
                  pathname: "/join",
                  search: searchParams.toString(),
                }}
              >
                Sign up
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ2luLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJsb2dpbi50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IEFjdGlvbkFyZ3MsIExvYWRlckFyZ3MsIE1ldGFGdW5jdGlvbiB9IGZyb20gXCJAcmVtaXgtcnVuL25vZGVcIlxuaW1wb3J0IHsganNvbiwgcmVkaXJlY3QgfSBmcm9tIFwiQHJlbWl4LXJ1bi9ub2RlXCJcbmltcG9ydCB7IEZvcm0sIExpbmssIHVzZUFjdGlvbkRhdGEsIHVzZVNlYXJjaFBhcmFtcyB9IGZyb20gXCJAcmVtaXgtcnVuL3JlYWN0XCJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiXG5cbmltcG9ydCB7IGNyZWF0ZVVzZXJTZXNzaW9uLCBnZXRVc2VySWQgfSBmcm9tIFwifi9zZXNzaW9uLnNlcnZlclwiXG5pbXBvcnQgeyB2ZXJpZnlMb2dpbiB9IGZyb20gXCJ+L21vZGVscy91c2VyLnNlcnZlclwiXG5pbXBvcnQgeyBzYWZlUmVkaXJlY3QsIHZhbGlkYXRlRW1haWwgfSBmcm9tIFwifi91dGlsc1wiXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkZXIoeyByZXF1ZXN0IH06IExvYWRlckFyZ3MpIHtcbiAgY29uc3QgdXNlcklkID0gYXdhaXQgZ2V0VXNlcklkKHJlcXVlc3QpXG4gIGlmICh1c2VySWQpIHJldHVybiByZWRpcmVjdChcIi9cIilcbiAgcmV0dXJuIGpzb24oe30pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhY3Rpb24oeyByZXF1ZXN0IH06IEFjdGlvbkFyZ3MpIHtcbiAgY29uc3QgZm9ybURhdGEgPSBhd2FpdCByZXF1ZXN0LmZvcm1EYXRhKClcbiAgY29uc3QgZW1haWwgPSBmb3JtRGF0YS5nZXQoXCJlbWFpbFwiKVxuICBjb25zdCBwYXNzd29yZCA9IGZvcm1EYXRhLmdldChcInBhc3N3b3JkXCIpXG4gIGNvbnN0IHJlZGlyZWN0VG8gPSBzYWZlUmVkaXJlY3QoZm9ybURhdGEuZ2V0KFwicmVkaXJlY3RUb1wiKSwgXCIvbm90ZXNcIilcbiAgY29uc3QgcmVtZW1iZXIgPSBmb3JtRGF0YS5nZXQoXCJyZW1lbWJlclwiKVxuXG4gIGlmICghdmFsaWRhdGVFbWFpbChlbWFpbCkpIHtcbiAgICByZXR1cm4ganNvbihcbiAgICAgIHsgZXJyb3JzOiB7IGVtYWlsOiBcIkVtYWlsIGlzIGludmFsaWRcIiwgcGFzc3dvcmQ6IG51bGwgfSB9LFxuICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBwYXNzd29yZCAhPT0gXCJzdHJpbmdcIiB8fCBwYXNzd29yZC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ganNvbihcbiAgICAgIHsgZXJyb3JzOiB7IGVtYWlsOiBudWxsLCBwYXNzd29yZDogXCJQYXNzd29yZCBpcyByZXF1aXJlZFwiIH0gfSxcbiAgICAgIHsgc3RhdHVzOiA0MDAgfVxuICAgIClcbiAgfVxuXG4gIGlmIChwYXNzd29yZC5sZW5ndGggPCA4KSB7XG4gICAgcmV0dXJuIGpzb24oXG4gICAgICB7IGVycm9yczogeyBlbWFpbDogbnVsbCwgcGFzc3dvcmQ6IFwiUGFzc3dvcmQgaXMgdG9vIHNob3J0XCIgfSB9LFxuICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgKVxuICB9XG5cbiAgY29uc3QgdXNlciA9IGF3YWl0IHZlcmlmeUxvZ2luKGVtYWlsLCBwYXNzd29yZClcblxuICBpZiAoIXVzZXIpIHtcbiAgICByZXR1cm4ganNvbihcbiAgICAgIHsgZXJyb3JzOiB7IGVtYWlsOiBcIkludmFsaWQgZW1haWwgb3IgcGFzc3dvcmRcIiwgcGFzc3dvcmQ6IG51bGwgfSB9LFxuICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZVVzZXJTZXNzaW9uKHtcbiAgICByZXF1ZXN0LFxuICAgIHVzZXJJZDogdXNlci5pZCxcbiAgICByZW1lbWJlcjogcmVtZW1iZXIgPT09IFwib25cIiA/IHRydWUgOiBmYWxzZSxcbiAgICByZWRpcmVjdFRvLFxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgbWV0YTogTWV0YUZ1bmN0aW9uID0gKCkgPT4ge1xuICByZXR1cm4ge1xuICAgIHRpdGxlOiBcIkxvZ2luXCIsXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTG9naW5QYWdlKCkge1xuICBjb25zdCBbc2VhcmNoUGFyYW1zXSA9IHVzZVNlYXJjaFBhcmFtcygpXG4gIGNvbnN0IHJlZGlyZWN0VG8gPSBzZWFyY2hQYXJhbXMuZ2V0KFwicmVkaXJlY3RUb1wiKSB8fCBcIi9ub3Rlc1wiXG4gIGNvbnN0IGFjdGlvbkRhdGEgPSB1c2VBY3Rpb25EYXRhPHR5cGVvZiBhY3Rpb24+KClcbiAgY29uc3QgZW1haWxSZWYgPSBSZWFjdC51c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbClcbiAgY29uc3QgcGFzc3dvcmRSZWYgPSBSZWFjdC51c2VSZWY8SFRNTElucHV0RWxlbWVudD4obnVsbClcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChhY3Rpb25EYXRhPy5lcnJvcnM/LmVtYWlsKSB7XG4gICAgICBlbWFpbFJlZi5jdXJyZW50Py5mb2N1cygpXG4gICAgfSBlbHNlIGlmIChhY3Rpb25EYXRhPy5lcnJvcnM/LnBhc3N3b3JkKSB7XG4gICAgICBwYXNzd29yZFJlZi5jdXJyZW50Py5mb2N1cygpXG4gICAgfVxuICB9LCBbYWN0aW9uRGF0YV0pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGRpdj5cbiAgICAgICAgPEZvcm0gbWV0aG9kPVwicG9zdFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cImVtYWlsXCI+RW1haWwgYWRkcmVzczwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICByZWY9e2VtYWlsUmVmfVxuICAgICAgICAgICAgICAgIGlkPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICAgICAgYXV0b0ZvY3VzPXt0cnVlfVxuICAgICAgICAgICAgICAgIG5hbWU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICBhdXRvQ29tcGxldGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgYXJpYS1pbnZhbGlkPXthY3Rpb25EYXRhPy5lcnJvcnM/LmVtYWlsID8gdHJ1ZSA6IHVuZGVmaW5lZH1cbiAgICAgICAgICAgICAgICBhcmlhLWRlc2NyaWJlZGJ5PVwiZW1haWwtZXJyb3JcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7YWN0aW9uRGF0YT8uZXJyb3JzPy5lbWFpbCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImVtYWlsLWVycm9yXCI+e2FjdGlvbkRhdGEuZXJyb3JzLmVtYWlsfTwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJwYXNzd29yZFwiPlBhc3N3b3JkPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIGlkPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIHJlZj17cGFzc3dvcmRSZWZ9XG4gICAgICAgICAgICAgICAgbmFtZT1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImN1cnJlbnQtcGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIGFyaWEtaW52YWxpZD17YWN0aW9uRGF0YT8uZXJyb3JzPy5wYXNzd29yZCA/IHRydWUgOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgICAgYXJpYS1kZXNjcmliZWRieT1cInBhc3N3b3JkLWVycm9yXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAge2FjdGlvbkRhdGE/LmVycm9ycz8ucGFzc3dvcmQgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJwYXNzd29yZC1lcnJvclwiPnthY3Rpb25EYXRhLmVycm9ycy5wYXNzd29yZH08L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwicmVkaXJlY3RUb1wiIHZhbHVlPXtyZWRpcmVjdFRvfSAvPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkxvZyBpbjwvYnV0dG9uPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aW5wdXQgaWQ9XCJyZW1lbWJlclwiIG5hbWU9XCJyZW1lbWJlclwiIHR5cGU9XCJjaGVja2JveFwiIC8+XG4gICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwicmVtZW1iZXJcIj5SZW1lbWJlciBtZTwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIERvbid0IGhhdmUgYW4gYWNjb3VudD97XCIgXCJ9XG4gICAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgICAgdG89e3tcbiAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBcIi9qb2luXCIsXG4gICAgICAgICAgICAgICAgICBzZWFyY2g6IHNlYXJjaFBhcmFtcy50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBTaWduIHVwXG4gICAgICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L0Zvcm0+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuIl19 */