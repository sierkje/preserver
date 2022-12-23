import type { LoaderArgs } from "@remix-run/node"
import { json } from "@remix-run/node"
import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react"

import { requireUserId } from "~/session.server"
import { useUser } from "~/utils"
import { getNoteListItems } from "~/models/note.server"

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request)
  const noteListItems = await getNoteListItems({ userId })
  return json({ noteListItems })
}

export default function NotesPage() {
  const data = useLoaderData<typeof loader>()
  const user = useUser()

  return (
    <div>
      <header>
        <h1>
          <Link to=".">Notes</Link>
        </h1>
        <p>{user.email}</p>
        <Form action="/logout" method="post">
          <button type="submit">Logout</button>
        </Form>
      </header>

      <main>
        <div>
          <Link to="new">+ New Note</Link>

          <hr />

          {data.noteListItems.length === 0 ? (
            <p>No notes yet</p>
          ) : (
            <ol>
              {data.noteListItems.map((note) => (
                <li key={note.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={note.id}
                  >
                    📝 {note.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGVzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJub3Rlcy50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IExvYWRlckFyZ3MgfSBmcm9tIFwiQHJlbWl4LXJ1bi9ub2RlXCJcbmltcG9ydCB7IGpzb24gfSBmcm9tIFwiQHJlbWl4LXJ1bi9ub2RlXCJcbmltcG9ydCB7IEZvcm0sIExpbmssIE5hdkxpbmssIE91dGxldCwgdXNlTG9hZGVyRGF0YSB9IGZyb20gXCJAcmVtaXgtcnVuL3JlYWN0XCJcblxuaW1wb3J0IHsgcmVxdWlyZVVzZXJJZCB9IGZyb20gXCJ+L3Nlc3Npb24uc2VydmVyXCJcbmltcG9ydCB7IHVzZVVzZXIgfSBmcm9tIFwifi91dGlsc1wiXG5pbXBvcnQgeyBnZXROb3RlTGlzdEl0ZW1zIH0gZnJvbSBcIn4vbW9kZWxzL25vdGUuc2VydmVyXCJcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRlcih7IHJlcXVlc3QgfTogTG9hZGVyQXJncykge1xuICBjb25zdCB1c2VySWQgPSBhd2FpdCByZXF1aXJlVXNlcklkKHJlcXVlc3QpXG4gIGNvbnN0IG5vdGVMaXN0SXRlbXMgPSBhd2FpdCBnZXROb3RlTGlzdEl0ZW1zKHsgdXNlcklkIH0pXG4gIHJldHVybiBqc29uKHsgbm90ZUxpc3RJdGVtcyB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBOb3Rlc1BhZ2UoKSB7XG4gIGNvbnN0IGRhdGEgPSB1c2VMb2FkZXJEYXRhPHR5cGVvZiBsb2FkZXI+KClcbiAgY29uc3QgdXNlciA9IHVzZVVzZXIoKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxoZWFkZXI+XG4gICAgICAgIDxoMT5cbiAgICAgICAgICA8TGluayB0bz1cIi5cIj5Ob3RlczwvTGluaz5cbiAgICAgICAgPC9oMT5cbiAgICAgICAgPHA+e3VzZXIuZW1haWx9PC9wPlxuICAgICAgICA8Rm9ybSBhY3Rpb249XCIvbG9nb3V0XCIgbWV0aG9kPVwicG9zdFwiPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkxvZ291dDwvYnV0dG9uPlxuICAgICAgICA8L0Zvcm0+XG4gICAgICA8L2hlYWRlcj5cblxuICAgICAgPG1haW4+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPExpbmsgdG89XCJuZXdcIj4rIE5ldyBOb3RlPC9MaW5rPlxuXG4gICAgICAgICAgPGhyIC8+XG5cbiAgICAgICAgICB7ZGF0YS5ub3RlTGlzdEl0ZW1zLmxlbmd0aCA9PT0gMCA/IChcbiAgICAgICAgICAgIDxwPk5vIG5vdGVzIHlldDwvcD5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgPG9sPlxuICAgICAgICAgICAgICB7ZGF0YS5ub3RlTGlzdEl0ZW1zLm1hcCgobm90ZSkgPT4gKFxuICAgICAgICAgICAgICAgIDxsaSBrZXk9e25vdGUuaWR9PlxuICAgICAgICAgICAgICAgICAgPE5hdkxpbmtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsoeyBpc0FjdGl2ZSB9KSA9PlxuICAgICAgICAgICAgICAgICAgICAgIGBibG9jayBib3JkZXItYiBwLTQgdGV4dC14bCAke2lzQWN0aXZlID8gXCJiZy13aGl0ZVwiIDogXCJcIn1gXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG89e25vdGUuaWR9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIPCfk50ge25vdGUudGl0bGV9XG4gICAgICAgICAgICAgICAgICA8L05hdkxpbms+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L29sPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPE91dGxldCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWFpbj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuIl19 */