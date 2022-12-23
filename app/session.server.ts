import { createCookieSessionStorage, redirect } from "@remix-run/node"
import invariant from "tiny-invariant"

import type { User } from "~/models/user.server"
import { getUserById } from "~/models/user.server"

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set")

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
})

const USER_SESSION_KEY = "userId"

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie")
  return sessionStorage.getSession(cookie)
}

export async function getUserId(
  request: Request
): Promise<User["id"] | undefined> {
  const session = await getSession(request)
  const userId = session.get(USER_SESSION_KEY)
  return userId
}

export async function getUser(request: Request) {
  const userId = await getUserId(request)
  if (userId === undefined) return null

  const user = await getUserById(userId)
  if (user) return user

  throw await logout(request)
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const userId = await getUserId(request)
  if (!userId) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }
  return userId
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request)

  const user = await getUserById(userId)
  if (user) return user

  throw await logout(request)
}

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request
  userId: string
  remember: boolean
  redirectTo: string
}) {
  const session = await getSession(request)
  session.set(USER_SESSION_KEY, userId)
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  })
}

export async function logout(request: Request) {
  const session = await getSession(request)
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  })
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlc3Npb24uc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InNlc3Npb24uc2VydmVyLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29va2llU2Vzc2lvblN0b3JhZ2UsIHJlZGlyZWN0IH0gZnJvbSBcIkByZW1peC1ydW4vbm9kZVwiXG5pbXBvcnQgaW52YXJpYW50IGZyb20gXCJ0aW55LWludmFyaWFudFwiXG5cbmltcG9ydCB0eXBlIHsgVXNlciB9IGZyb20gXCJ+L21vZGVscy91c2VyLnNlcnZlclwiXG5pbXBvcnQgeyBnZXRVc2VyQnlJZCB9IGZyb20gXCJ+L21vZGVscy91c2VyLnNlcnZlclwiXG5cbmludmFyaWFudChwcm9jZXNzLmVudi5TRVNTSU9OX1NFQ1JFVCwgXCJTRVNTSU9OX1NFQ1JFVCBtdXN0IGJlIHNldFwiKVxuXG5leHBvcnQgY29uc3Qgc2Vzc2lvblN0b3JhZ2UgPSBjcmVhdGVDb29raWVTZXNzaW9uU3RvcmFnZSh7XG4gIGNvb2tpZToge1xuICAgIG5hbWU6IFwiX19zZXNzaW9uXCIsXG4gICAgaHR0cE9ubHk6IHRydWUsXG4gICAgcGF0aDogXCIvXCIsXG4gICAgc2FtZVNpdGU6IFwibGF4XCIsXG4gICAgc2VjcmV0czogW3Byb2Nlc3MuZW52LlNFU1NJT05fU0VDUkVUXSxcbiAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIixcbiAgfSxcbn0pXG5cbmNvbnN0IFVTRVJfU0VTU0lPTl9LRVkgPSBcInVzZXJJZFwiXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZXNzaW9uKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgY29uc3QgY29va2llID0gcmVxdWVzdC5oZWFkZXJzLmdldChcIkNvb2tpZVwiKVxuICByZXR1cm4gc2Vzc2lvblN0b3JhZ2UuZ2V0U2Vzc2lvbihjb29raWUpXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VySWQoXG4gIHJlcXVlc3Q6IFJlcXVlc3Rcbik6IFByb21pc2U8VXNlcltcImlkXCJdIHwgdW5kZWZpbmVkPiB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXNzaW9uKHJlcXVlc3QpXG4gIGNvbnN0IHVzZXJJZCA9IHNlc3Npb24uZ2V0KFVTRVJfU0VTU0lPTl9LRVkpXG4gIHJldHVybiB1c2VySWRcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFVzZXIocmVxdWVzdDogUmVxdWVzdCkge1xuICBjb25zdCB1c2VySWQgPSBhd2FpdCBnZXRVc2VySWQocmVxdWVzdClcbiAgaWYgKHVzZXJJZCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gbnVsbFxuXG4gIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRVc2VyQnlJZCh1c2VySWQpXG4gIGlmICh1c2VyKSByZXR1cm4gdXNlclxuXG4gIHRocm93IGF3YWl0IGxvZ291dChyZXF1ZXN0KVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWlyZVVzZXJJZChcbiAgcmVxdWVzdDogUmVxdWVzdCxcbiAgcmVkaXJlY3RUbzogc3RyaW5nID0gbmV3IFVSTChyZXF1ZXN0LnVybCkucGF0aG5hbWVcbikge1xuICBjb25zdCB1c2VySWQgPSBhd2FpdCBnZXRVc2VySWQocmVxdWVzdClcbiAgaWYgKCF1c2VySWQpIHtcbiAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKFtbXCJyZWRpcmVjdFRvXCIsIHJlZGlyZWN0VG9dXSlcbiAgICB0aHJvdyByZWRpcmVjdChgL2xvZ2luPyR7c2VhcmNoUGFyYW1zfWApXG4gIH1cbiAgcmV0dXJuIHVzZXJJZFxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVxdWlyZVVzZXIocmVxdWVzdDogUmVxdWVzdCkge1xuICBjb25zdCB1c2VySWQgPSBhd2FpdCByZXF1aXJlVXNlcklkKHJlcXVlc3QpXG5cbiAgY29uc3QgdXNlciA9IGF3YWl0IGdldFVzZXJCeUlkKHVzZXJJZClcbiAgaWYgKHVzZXIpIHJldHVybiB1c2VyXG5cbiAgdGhyb3cgYXdhaXQgbG9nb3V0KHJlcXVlc3QpXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVVc2VyU2Vzc2lvbih7XG4gIHJlcXVlc3QsXG4gIHVzZXJJZCxcbiAgcmVtZW1iZXIsXG4gIHJlZGlyZWN0VG8sXG59OiB7XG4gIHJlcXVlc3Q6IFJlcXVlc3RcbiAgdXNlcklkOiBzdHJpbmdcbiAgcmVtZW1iZXI6IGJvb2xlYW5cbiAgcmVkaXJlY3RUbzogc3RyaW5nXG59KSB7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXNzaW9uKHJlcXVlc3QpXG4gIHNlc3Npb24uc2V0KFVTRVJfU0VTU0lPTl9LRVksIHVzZXJJZClcbiAgcmV0dXJuIHJlZGlyZWN0KHJlZGlyZWN0VG8sIHtcbiAgICBoZWFkZXJzOiB7XG4gICAgICBcIlNldC1Db29raWVcIjogYXdhaXQgc2Vzc2lvblN0b3JhZ2UuY29tbWl0U2Vzc2lvbihzZXNzaW9uLCB7XG4gICAgICAgIG1heEFnZTogcmVtZW1iZXJcbiAgICAgICAgICA/IDYwICogNjAgKiAyNCAqIDcgLy8gNyBkYXlzXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICB9KSxcbiAgICB9LFxuICB9KVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nb3V0KHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgY29uc3Qgc2Vzc2lvbiA9IGF3YWl0IGdldFNlc3Npb24ocmVxdWVzdClcbiAgcmV0dXJuIHJlZGlyZWN0KFwiL1wiLCB7XG4gICAgaGVhZGVyczoge1xuICAgICAgXCJTZXQtQ29va2llXCI6IGF3YWl0IHNlc3Npb25TdG9yYWdlLmRlc3Ryb3lTZXNzaW9uKHNlc3Npb24pLFxuICAgIH0sXG4gIH0pXG59XG4iXX0= */