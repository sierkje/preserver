import { RemixBrowser } from "@remix-run/react"
import { startTransition, StrictMode } from "react"
import { hydrateRoot } from "react-dom/client"

const hydrate = () => {
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>
    )
  })
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate)
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1)
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudHJ5LmNsaWVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiZW50cnkuY2xpZW50LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlbWl4QnJvd3NlciB9IGZyb20gXCJAcmVtaXgtcnVuL3JlYWN0XCJcbmltcG9ydCB7IHN0YXJ0VHJhbnNpdGlvbiwgU3RyaWN0TW9kZSB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBoeWRyYXRlUm9vdCB9IGZyb20gXCJyZWFjdC1kb20vY2xpZW50XCJcblxuY29uc3QgaHlkcmF0ZSA9ICgpID0+IHtcbiAgc3RhcnRUcmFuc2l0aW9uKCgpID0+IHtcbiAgICBoeWRyYXRlUm9vdChcbiAgICAgIGRvY3VtZW50LFxuICAgICAgPFN0cmljdE1vZGU+XG4gICAgICAgIDxSZW1peEJyb3dzZXIgLz5cbiAgICAgIDwvU3RyaWN0TW9kZT5cbiAgICApXG4gIH0pXG59XG5cbmlmICh3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjaykge1xuICB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjayhoeWRyYXRlKVxufSBlbHNlIHtcbiAgLy8gU2FmYXJpIGRvZXNuJ3Qgc3VwcG9ydCByZXF1ZXN0SWRsZUNhbGxiYWNrXG4gIC8vIGh0dHBzOi8vY2FuaXVzZS5jb20vcmVxdWVzdGlkbGVjYWxsYmFja1xuICB3aW5kb3cuc2V0VGltZW91dChoeWRyYXRlLCAxKVxufVxuIl19 */