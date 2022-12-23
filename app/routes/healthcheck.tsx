// learn more: https://fly.io/docs/reference/configuration/#services-http_checks
import type { LoaderArgs } from "@remix-run/node"

import { prisma } from "~/db.server"

export async function loader({ request }: LoaderArgs) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host")

  try {
    const url = new URL("/", `http://${host}`)
    // if we can connect to the database and make a simple query
    // and make a HEAD request to ourselves, then we're good.
    await Promise.all([
      prisma.user.count(),
      fetch(url.toString(), { method: "HEAD" }).then((r) => {
        if (!r.ok) return Promise.reject(r)
      }),
    ])
    return new Response("OK")
  } catch (error: unknown) {
    console.log("healthcheck ❌", { error })
    return new Response("ERROR", { status: 500 })
  }
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhlYWx0aGNoZWNrLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJoZWFsdGhjaGVjay50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvLyBsZWFybiBtb3JlOiBodHRwczovL2ZseS5pby9kb2NzL3JlZmVyZW5jZS9jb25maWd1cmF0aW9uLyNzZXJ2aWNlcy1odHRwX2NoZWNrc1xuaW1wb3J0IHR5cGUgeyBMb2FkZXJBcmdzIH0gZnJvbSBcIkByZW1peC1ydW4vbm9kZVwiXG5cbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJ+L2RiLnNlcnZlclwiXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkZXIoeyByZXF1ZXN0IH06IExvYWRlckFyZ3MpIHtcbiAgY29uc3QgaG9zdCA9XG4gICAgcmVxdWVzdC5oZWFkZXJzLmdldChcIlgtRm9yd2FyZGVkLUhvc3RcIikgPz8gcmVxdWVzdC5oZWFkZXJzLmdldChcImhvc3RcIilcblxuICB0cnkge1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoXCIvXCIsIGBodHRwOi8vJHtob3N0fWApXG4gICAgLy8gaWYgd2UgY2FuIGNvbm5lY3QgdG8gdGhlIGRhdGFiYXNlIGFuZCBtYWtlIGEgc2ltcGxlIHF1ZXJ5XG4gICAgLy8gYW5kIG1ha2UgYSBIRUFEIHJlcXVlc3QgdG8gb3Vyc2VsdmVzLCB0aGVuIHdlJ3JlIGdvb2QuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgcHJpc21hLnVzZXIuY291bnQoKSxcbiAgICAgIGZldGNoKHVybC50b1N0cmluZygpLCB7IG1ldGhvZDogXCJIRUFEXCIgfSkudGhlbigocikgPT4ge1xuICAgICAgICBpZiAoIXIub2spIHJldHVybiBQcm9taXNlLnJlamVjdChyKVxuICAgICAgfSksXG4gICAgXSlcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKFwiT0tcIilcbiAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICBjb25zb2xlLmxvZyhcImhlYWx0aGNoZWNrIOKdjFwiLCB7IGVycm9yIH0pXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShcIkVSUk9SXCIsIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuIl19 */