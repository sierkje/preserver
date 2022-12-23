import { useMatches } from "@remix-run/react"
import { useMemo } from "react"

import type { User } from "~/models/user.server"

const DEFAULT_REDIRECT = "/"

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect
  }

  return to
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches()
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  )
  return route?.data
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.email === "string"
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData("root")
  if (!data || !isUser(data.user)) {
    return undefined
  }
  return data.user
}

export function useUser(): User {
  const maybeUser = useOptionalUser()
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    )
  }
  return maybeUser
}

export function validateEmail(email: unknown): email is string {
  return typeof email === "string" && email.length > 3 && email.includes("@")
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InV0aWxzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlTWF0Y2hlcyB9IGZyb20gXCJAcmVtaXgtcnVuL3JlYWN0XCJcbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tIFwicmVhY3RcIlxuXG5pbXBvcnQgdHlwZSB7IFVzZXIgfSBmcm9tIFwifi9tb2RlbHMvdXNlci5zZXJ2ZXJcIlxuXG5jb25zdCBERUZBVUxUX1JFRElSRUNUID0gXCIvXCJcblxuLyoqXG4gKiBUaGlzIHNob3VsZCBiZSB1c2VkIGFueSB0aW1lIHRoZSByZWRpcmVjdCBwYXRoIGlzIHVzZXItcHJvdmlkZWRcbiAqIChMaWtlIHRoZSBxdWVyeSBzdHJpbmcgb24gb3VyIGxvZ2luL3NpZ251cCBwYWdlcykuIFRoaXMgYXZvaWRzXG4gKiBvcGVuLXJlZGlyZWN0IHZ1bG5lcmFiaWxpdGllcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0byBUaGUgcmVkaXJlY3QgZGVzdGluYXRpb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBkZWZhdWx0UmVkaXJlY3QgVGhlIHJlZGlyZWN0IHRvIHVzZSBpZiB0aGUgdG8gaXMgdW5zYWZlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2FmZVJlZGlyZWN0KFxuICB0bzogRm9ybURhdGFFbnRyeVZhbHVlIHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgZGVmYXVsdFJlZGlyZWN0OiBzdHJpbmcgPSBERUZBVUxUX1JFRElSRUNUXG4pIHtcbiAgaWYgKCF0byB8fCB0eXBlb2YgdG8gIT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gZGVmYXVsdFJlZGlyZWN0XG4gIH1cblxuICBpZiAoIXRvLnN0YXJ0c1dpdGgoXCIvXCIpIHx8IHRvLnN0YXJ0c1dpdGgoXCIvL1wiKSkge1xuICAgIHJldHVybiBkZWZhdWx0UmVkaXJlY3RcbiAgfVxuXG4gIHJldHVybiB0b1xufVxuXG4vKipcbiAqIFRoaXMgYmFzZSBob29rIGlzIHVzZWQgaW4gb3RoZXIgaG9va3MgdG8gcXVpY2tseSBzZWFyY2ggZm9yIHNwZWNpZmljIGRhdGFcbiAqIGFjcm9zcyBhbGwgbG9hZGVyIGRhdGEgdXNpbmcgdXNlTWF0Y2hlcy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCBUaGUgcm91dGUgaWRcbiAqIEByZXR1cm5zIHtKU09OfHVuZGVmaW5lZH0gVGhlIHJvdXRlciBkYXRhIG9yIHVuZGVmaW5lZCBpZiBub3QgZm91bmRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZU1hdGNoZXNEYXRhKFxuICBpZDogc3RyaW5nXG4pOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IG1hdGNoaW5nUm91dGVzID0gdXNlTWF0Y2hlcygpXG4gIGNvbnN0IHJvdXRlID0gdXNlTWVtbyhcbiAgICAoKSA9PiBtYXRjaGluZ1JvdXRlcy5maW5kKChyb3V0ZSkgPT4gcm91dGUuaWQgPT09IGlkKSxcbiAgICBbbWF0Y2hpbmdSb3V0ZXMsIGlkXVxuICApXG4gIHJldHVybiByb3V0ZT8uZGF0YVxufVxuXG5mdW5jdGlvbiBpc1VzZXIodXNlcjogYW55KTogdXNlciBpcyBVc2VyIHtcbiAgcmV0dXJuIHVzZXIgJiYgdHlwZW9mIHVzZXIgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHVzZXIuZW1haWwgPT09IFwic3RyaW5nXCJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZU9wdGlvbmFsVXNlcigpOiBVc2VyIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgZGF0YSA9IHVzZU1hdGNoZXNEYXRhKFwicm9vdFwiKVxuICBpZiAoIWRhdGEgfHwgIWlzVXNlcihkYXRhLnVzZXIpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG4gIHJldHVybiBkYXRhLnVzZXJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVVzZXIoKTogVXNlciB7XG4gIGNvbnN0IG1heWJlVXNlciA9IHVzZU9wdGlvbmFsVXNlcigpXG4gIGlmICghbWF5YmVVc2VyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJObyB1c2VyIGZvdW5kIGluIHJvb3QgbG9hZGVyLCBidXQgdXNlciBpcyByZXF1aXJlZCBieSB1c2VVc2VyLiBJZiB1c2VyIGlzIG9wdGlvbmFsLCB0cnkgdXNlT3B0aW9uYWxVc2VyIGluc3RlYWQuXCJcbiAgICApXG4gIH1cbiAgcmV0dXJuIG1heWJlVXNlclxufVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbDogdW5rbm93bik6IGVtYWlsIGlzIHN0cmluZyB7XG4gIHJldHVybiB0eXBlb2YgZW1haWwgPT09IFwic3RyaW5nXCIgJiYgZW1haWwubGVuZ3RoID4gMyAmJiBlbWFpbC5pbmNsdWRlcyhcIkBcIilcbn1cbiJdfQ== */