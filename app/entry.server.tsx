import { PassThrough } from "stream"
import type { EntryContext } from "@remix-run/node"
import { Response } from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import isbot from "isbot"
import { renderToPipeableStream } from "react-dom/server"

const ABORT_DELAY = 5000

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const callbackName = isbot(request.headers.get("user-agent"))
    ? "onAllReady"
    : "onShellReady"

  return new Promise((resolve, reject) => {
    let didError = false

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} />,
      {
        [callbackName]: () => {
          const body = new PassThrough()

          responseHeaders.set("Content-Type", "text/html")

          resolve(
            new Response(body, {
              headers: responseHeaders,
              status: didError ? 500 : responseStatusCode,
            })
          )

          pipe(body)
        },
        onShellError: (err: unknown) => {
          reject(err)
        },
        onError: (error: unknown) => {
          didError = true

          console.error(error)
        },
      }
    )

    setTimeout(abort, ABORT_DELAY)
  })
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudHJ5LnNlcnZlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiZW50cnkuc2VydmVyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBhc3NUaHJvdWdoIH0gZnJvbSBcInN0cmVhbVwiXG5pbXBvcnQgdHlwZSB7IEVudHJ5Q29udGV4dCB9IGZyb20gXCJAcmVtaXgtcnVuL25vZGVcIlxuaW1wb3J0IHsgUmVzcG9uc2UgfSBmcm9tIFwiQHJlbWl4LXJ1bi9ub2RlXCJcbmltcG9ydCB7IFJlbWl4U2VydmVyIH0gZnJvbSBcIkByZW1peC1ydW4vcmVhY3RcIlxuaW1wb3J0IGlzYm90IGZyb20gXCJpc2JvdFwiXG5pbXBvcnQgeyByZW5kZXJUb1BpcGVhYmxlU3RyZWFtIH0gZnJvbSBcInJlYWN0LWRvbS9zZXJ2ZXJcIlxuXG5jb25zdCBBQk9SVF9ERUxBWSA9IDUwMDBcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChcbiAgcmVxdWVzdDogUmVxdWVzdCxcbiAgcmVzcG9uc2VTdGF0dXNDb2RlOiBudW1iZXIsXG4gIHJlc3BvbnNlSGVhZGVyczogSGVhZGVycyxcbiAgcmVtaXhDb250ZXh0OiBFbnRyeUNvbnRleHRcbikge1xuICBjb25zdCBjYWxsYmFja05hbWUgPSBpc2JvdChyZXF1ZXN0LmhlYWRlcnMuZ2V0KFwidXNlci1hZ2VudFwiKSlcbiAgICA/IFwib25BbGxSZWFkeVwiXG4gICAgOiBcIm9uU2hlbGxSZWFkeVwiXG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsZXQgZGlkRXJyb3IgPSBmYWxzZVxuXG4gICAgY29uc3QgeyBwaXBlLCBhYm9ydCB9ID0gcmVuZGVyVG9QaXBlYWJsZVN0cmVhbShcbiAgICAgIDxSZW1peFNlcnZlciBjb250ZXh0PXtyZW1peENvbnRleHR9IHVybD17cmVxdWVzdC51cmx9IC8+LFxuICAgICAge1xuICAgICAgICBbY2FsbGJhY2tOYW1lXTogKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGJvZHkgPSBuZXcgUGFzc1Rocm91Z2goKVxuXG4gICAgICAgICAgcmVzcG9uc2VIZWFkZXJzLnNldChcIkNvbnRlbnQtVHlwZVwiLCBcInRleHQvaHRtbFwiKVxuXG4gICAgICAgICAgcmVzb2x2ZShcbiAgICAgICAgICAgIG5ldyBSZXNwb25zZShib2R5LCB7XG4gICAgICAgICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgICAgICAgc3RhdHVzOiBkaWRFcnJvciA/IDUwMCA6IHJlc3BvbnNlU3RhdHVzQ29kZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgcGlwZShib2R5KVxuICAgICAgICB9LFxuICAgICAgICBvblNoZWxsRXJyb3I6IChlcnI6IHVua25vd24pID0+IHtcbiAgICAgICAgICByZWplY3QoZXJyKVxuICAgICAgICB9LFxuICAgICAgICBvbkVycm9yOiAoZXJyb3I6IHVua25vd24pID0+IHtcbiAgICAgICAgICBkaWRFcnJvciA9IHRydWVcblxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKVxuXG4gICAgc2V0VGltZW91dChhYm9ydCwgQUJPUlRfREVMQVkpXG4gIH0pXG59XG4iXX0= */