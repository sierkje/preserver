import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node"
import { json, redirect } from "@remix-run/node"
import { Form, Link, useActionData, useSearchParams } from "@remix-run/react"
import * as React from "react"

import { getUserId, createUserSession } from "~/session.server"

import { createUser, getUserByEmail } from "~/models/user.server"
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
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/")

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

  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 }
    )
  }

  const user = await createUser(email, password)

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  })
}

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  }
}

export default function JoinPage() {
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirectTo") ?? undefined
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
                autoComplete="new-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
              />
              {actionData?.errors?.password && (
                <div>{actionData.errors.password}</div>
              )}
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button type="submit">Create Account</button>
          <div>
            <div>
              Already have an account?{" "}
              <Link
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpvaW4udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6ImpvaW4udHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBBY3Rpb25BcmdzLCBMb2FkZXJBcmdzLCBNZXRhRnVuY3Rpb24gfSBmcm9tIFwiQHJlbWl4LXJ1bi9ub2RlXCJcbmltcG9ydCB7IGpzb24sIHJlZGlyZWN0IH0gZnJvbSBcIkByZW1peC1ydW4vbm9kZVwiXG5pbXBvcnQgeyBGb3JtLCBMaW5rLCB1c2VBY3Rpb25EYXRhLCB1c2VTZWFyY2hQYXJhbXMgfSBmcm9tIFwiQHJlbWl4LXJ1bi9yZWFjdFwiXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG5pbXBvcnQgeyBnZXRVc2VySWQsIGNyZWF0ZVVzZXJTZXNzaW9uIH0gZnJvbSBcIn4vc2Vzc2lvbi5zZXJ2ZXJcIlxuXG5pbXBvcnQgeyBjcmVhdGVVc2VyLCBnZXRVc2VyQnlFbWFpbCB9IGZyb20gXCJ+L21vZGVscy91c2VyLnNlcnZlclwiXG5pbXBvcnQgeyBzYWZlUmVkaXJlY3QsIHZhbGlkYXRlRW1haWwgfSBmcm9tIFwifi91dGlsc1wiXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkZXIoeyByZXF1ZXN0IH06IExvYWRlckFyZ3MpIHtcbiAgY29uc3QgdXNlcklkID0gYXdhaXQgZ2V0VXNlcklkKHJlcXVlc3QpXG4gIGlmICh1c2VySWQpIHJldHVybiByZWRpcmVjdChcIi9cIilcbiAgcmV0dXJuIGpzb24oe30pXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhY3Rpb24oeyByZXF1ZXN0IH06IEFjdGlvbkFyZ3MpIHtcbiAgY29uc3QgZm9ybURhdGEgPSBhd2FpdCByZXF1ZXN0LmZvcm1EYXRhKClcbiAgY29uc3QgZW1haWwgPSBmb3JtRGF0YS5nZXQoXCJlbWFpbFwiKVxuICBjb25zdCBwYXNzd29yZCA9IGZvcm1EYXRhLmdldChcInBhc3N3b3JkXCIpXG4gIGNvbnN0IHJlZGlyZWN0VG8gPSBzYWZlUmVkaXJlY3QoZm9ybURhdGEuZ2V0KFwicmVkaXJlY3RUb1wiKSwgXCIvXCIpXG5cbiAgaWYgKCF2YWxpZGF0ZUVtYWlsKGVtYWlsKSkge1xuICAgIHJldHVybiBqc29uKFxuICAgICAgeyBlcnJvcnM6IHsgZW1haWw6IFwiRW1haWwgaXMgaW52YWxpZFwiLCBwYXNzd29yZDogbnVsbCB9IH0sXG4gICAgICB7IHN0YXR1czogNDAwIH1cbiAgICApXG4gIH1cblxuICBpZiAodHlwZW9mIHBhc3N3b3JkICE9PSBcInN0cmluZ1wiIHx8IHBhc3N3b3JkLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBqc29uKFxuICAgICAgeyBlcnJvcnM6IHsgZW1haWw6IG51bGwsIHBhc3N3b3JkOiBcIlBhc3N3b3JkIGlzIHJlcXVpcmVkXCIgfSB9LFxuICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgKVxuICB9XG5cbiAgaWYgKHBhc3N3b3JkLmxlbmd0aCA8IDgpIHtcbiAgICByZXR1cm4ganNvbihcbiAgICAgIHsgZXJyb3JzOiB7IGVtYWlsOiBudWxsLCBwYXNzd29yZDogXCJQYXNzd29yZCBpcyB0b28gc2hvcnRcIiB9IH0sXG4gICAgICB7IHN0YXR1czogNDAwIH1cbiAgICApXG4gIH1cblxuICBjb25zdCBleGlzdGluZ1VzZXIgPSBhd2FpdCBnZXRVc2VyQnlFbWFpbChlbWFpbClcbiAgaWYgKGV4aXN0aW5nVXNlcikge1xuICAgIHJldHVybiBqc29uKFxuICAgICAge1xuICAgICAgICBlcnJvcnM6IHtcbiAgICAgICAgICBlbWFpbDogXCJBIHVzZXIgYWxyZWFkeSBleGlzdHMgd2l0aCB0aGlzIGVtYWlsXCIsXG4gICAgICAgICAgcGFzc3dvcmQ6IG51bGwsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgKVxuICB9XG5cbiAgY29uc3QgdXNlciA9IGF3YWl0IGNyZWF0ZVVzZXIoZW1haWwsIHBhc3N3b3JkKVxuXG4gIHJldHVybiBjcmVhdGVVc2VyU2Vzc2lvbih7XG4gICAgcmVxdWVzdCxcbiAgICB1c2VySWQ6IHVzZXIuaWQsXG4gICAgcmVtZW1iZXI6IGZhbHNlLFxuICAgIHJlZGlyZWN0VG8sXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBtZXRhOiBNZXRhRnVuY3Rpb24gPSAoKSA9PiB7XG4gIHJldHVybiB7XG4gICAgdGl0bGU6IFwiU2lnbiBVcFwiLFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEpvaW5QYWdlKCkge1xuICBjb25zdCBbc2VhcmNoUGFyYW1zXSA9IHVzZVNlYXJjaFBhcmFtcygpXG4gIGNvbnN0IHJlZGlyZWN0VG8gPSBzZWFyY2hQYXJhbXMuZ2V0KFwicmVkaXJlY3RUb1wiKSA/PyB1bmRlZmluZWRcbiAgY29uc3QgYWN0aW9uRGF0YSA9IHVzZUFjdGlvbkRhdGE8dHlwZW9mIGFjdGlvbj4oKVxuICBjb25zdCBlbWFpbFJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MSW5wdXRFbGVtZW50PihudWxsKVxuICBjb25zdCBwYXNzd29yZFJlZiA9IFJlYWN0LnVzZVJlZjxIVE1MSW5wdXRFbGVtZW50PihudWxsKVxuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGFjdGlvbkRhdGE/LmVycm9ycz8uZW1haWwpIHtcbiAgICAgIGVtYWlsUmVmLmN1cnJlbnQ/LmZvY3VzKClcbiAgICB9IGVsc2UgaWYgKGFjdGlvbkRhdGE/LmVycm9ycz8ucGFzc3dvcmQpIHtcbiAgICAgIHBhc3N3b3JkUmVmLmN1cnJlbnQ/LmZvY3VzKClcbiAgICB9XG4gIH0sIFthY3Rpb25EYXRhXSlcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8Rm9ybSBtZXRob2Q9XCJwb3N0XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPVwiZW1haWxcIj5FbWFpbCBhZGRyZXNzPC9sYWJlbD5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHJlZj17ZW1haWxSZWZ9XG4gICAgICAgICAgICAgICAgaWQ9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgICAgICBhdXRvRm9jdXM9e3RydWV9XG4gICAgICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICB0eXBlPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgIGF1dG9Db21wbGV0ZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICBhcmlhLWludmFsaWQ9e2FjdGlvbkRhdGE/LmVycm9ycz8uZW1haWwgPyB0cnVlIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJlbWFpbC1lcnJvclwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHthY3Rpb25EYXRhPy5lcnJvcnM/LmVtYWlsICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZW1haWwtZXJyb3JcIj57YWN0aW9uRGF0YS5lcnJvcnMuZW1haWx9PC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj1cInBhc3N3b3JkXCI+UGFzc3dvcmQ8L2xhYmVsPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgaWQ9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgcmVmPXtwYXNzd29yZFJlZn1cbiAgICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJwYXNzd29yZFwiXG4gICAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPVwibmV3LXBhc3N3b3JkXCJcbiAgICAgICAgICAgICAgICBhcmlhLWludmFsaWQ9e2FjdGlvbkRhdGE/LmVycm9ycz8ucGFzc3dvcmQgPyB0cnVlIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgIGFyaWEtZGVzY3JpYmVkYnk9XCJwYXNzd29yZC1lcnJvclwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIHthY3Rpb25EYXRhPy5lcnJvcnM/LnBhc3N3b3JkICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2PnthY3Rpb25EYXRhLmVycm9ycy5wYXNzd29yZH08L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwicmVkaXJlY3RUb1wiIHZhbHVlPXtyZWRpcmVjdFRvfSAvPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkNyZWF0ZSBBY2NvdW50PC9idXR0b24+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIEFscmVhZHkgaGF2ZSBhbiBhY2NvdW50P3tcIiBcIn1cbiAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICB0bz17e1xuICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IFwiL2xvZ2luXCIsXG4gICAgICAgICAgICAgICAgICBzZWFyY2g6IHNlYXJjaFBhcmFtcy50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBMb2cgaW5cbiAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvRm9ybT5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG4iXX0= */