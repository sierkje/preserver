import type { ActionArgs } from "@remix-run/node"
import { redirect } from "@remix-run/node"

import { logout } from "~/session.server"

export async function action({ request }: ActionArgs) {
  return logout(request)
}

export async function loader() {
  return redirect("/")
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxvZ291dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoibG9nb3V0LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgQWN0aW9uQXJncyB9IGZyb20gXCJAcmVtaXgtcnVuL25vZGVcIlxuaW1wb3J0IHsgcmVkaXJlY3QgfSBmcm9tIFwiQHJlbWl4LXJ1bi9ub2RlXCJcblxuaW1wb3J0IHsgbG9nb3V0IH0gZnJvbSBcIn4vc2Vzc2lvbi5zZXJ2ZXJcIlxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWN0aW9uKHsgcmVxdWVzdCB9OiBBY3Rpb25BcmdzKSB7XG4gIHJldHVybiBsb2dvdXQocmVxdWVzdClcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRlcigpIHtcbiAgcmV0dXJuIHJlZGlyZWN0KFwiL1wiKVxufVxuIl19 */