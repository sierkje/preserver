import { Link } from "@remix-run/react"

import { useOptionalUser } from "~/utils"

import styles from "./index.css"
import type { LinksFunction } from "@remix-run/node"

export const links: LinksFunction = () => {
  return [    { rel: "stylesheet", href: styles }  ]
}

export default function IndexPage() {
  const user = useOptionalUser()

  return (
    <main>
      <div>
        <div>
          <div>
            <div className="box">
              <img
                src="https://user-images.githubusercontent.com/1500684/157774694-99820c51-8165-4908-a031-34fc371ac0d6.jpg"
                alt="Sonic Youth On Stage"
              />
            </div>
            <div>
              <h1>
                <span>Indie Stack</span>
              </h1>
              <p>
                Check the README.md file for instructions on how to get this
                project deployed.
              </p>
              <div>
                {user ? (
                  <Link to="/notes">View Notes for {user.email}</Link>
                ) : (
                  <div>
                    <Link to="/join">Sign up</Link>
                    <Link to="/login">Log In</Link>
                  </div>
                )}
              </div>
              <a href="https://remix.run">
                <img
                  src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                  alt="Remix"
                />
              </a>
            </div>
          </div>
        </div>

        <div>
          <div>
            {[
              {
                src: "https://user-images.githubusercontent.com/1500684/157764397-ccd8ea10-b8aa-4772-a99b-35de937319e1.svg",
                alt: "Fly.io",
                href: "https://fly.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764395-137ec949-382c-43bd-a3c0-0cb8cb22e22d.svg",
                alt: "SQLite",
                href: "https://sqlite.org",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764484-ad64a21a-d7fb-47e3-8669-ec046da20c1f.svg",
                alt: "Prisma",
                href: "https://prisma.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
                alt: "Cypress",
                href: "https://www.cypress.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg",
                alt: "MSW",
                href: "https://mswjs.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
                alt: "Vitest",
                href: "https://vitest.dev",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
                alt: "Testing Library",
                href: "https://testing-library.com",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
                alt: "Prettier",
                href: "https://prettier.io",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
                alt: "ESLint",
                href: "https://eslint.org",
              },
              {
                src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
                alt: "TypeScript",
                href: "https://typescriptlang.org",
              },
            ].map((img) => (
              <a key={img.href} href={img.href}>
                <img alt={img.alt} src={img.src} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJpbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaW5rIH0gZnJvbSBcIkByZW1peC1ydW4vcmVhY3RcIlxuXG5pbXBvcnQgeyB1c2VPcHRpb25hbFVzZXIgfSBmcm9tIFwifi91dGlsc1wiXG5cbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4vaW5kZXguY3NzXCJcbmltcG9ydCB0eXBlIHsgTGlua3NGdW5jdGlvbiB9IGZyb20gXCJAcmVtaXgtcnVuL25vZGVcIlxuXG5leHBvcnQgY29uc3QgbGlua3M6IExpbmtzRnVuY3Rpb24gPSAoKSA9PiB7XG4gIHJldHVybiBbICAgIHsgcmVsOiBcInN0eWxlc2hlZXRcIiwgaHJlZjogc3R5bGVzIH0gIF1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSW5kZXhQYWdlKCkge1xuICBjb25zdCB1c2VyID0gdXNlT3B0aW9uYWxVc2VyKClcblxuICByZXR1cm4gKFxuICAgIDxtYWluPlxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib3hcIj5cbiAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIHNyYz1cImh0dHBzOi8vdXNlci1pbWFnZXMuZ2l0aHVidXNlcmNvbnRlbnQuY29tLzE1MDA2ODQvMTU3Nzc0Njk0LTk5ODIwYzUxLTgxNjUtNDkwOC1hMDMxLTM0ZmMzNzFhYzBkNi5qcGdcIlxuICAgICAgICAgICAgICAgIGFsdD1cIlNvbmljIFlvdXRoIE9uIFN0YWdlXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgxPlxuICAgICAgICAgICAgICAgIDxzcGFuPkluZGllIFN0YWNrPC9zcGFuPlxuICAgICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgICA8cD5cbiAgICAgICAgICAgICAgICBDaGVjayB0aGUgUkVBRE1FLm1kIGZpbGUgZm9yIGluc3RydWN0aW9ucyBvbiBob3cgdG8gZ2V0IHRoaXNcbiAgICAgICAgICAgICAgICBwcm9qZWN0IGRlcGxveWVkLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAge3VzZXIgPyAoXG4gICAgICAgICAgICAgICAgICA8TGluayB0bz1cIi9ub3Rlc1wiPlZpZXcgTm90ZXMgZm9yIHt1c2VyLmVtYWlsfTwvTGluaz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPExpbmsgdG89XCIvam9pblwiPlNpZ24gdXA8L0xpbms+XG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIHRvPVwiL2xvZ2luXCI+TG9nIEluPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL3JlbWl4LnJ1blwiPlxuICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgIHNyYz1cImh0dHBzOi8vdXNlci1pbWFnZXMuZ2l0aHVidXNlcmNvbnRlbnQuY29tLzE1MDA2ODQvMTU4Mjk4OTI2LWU0NWRhZmZmLTM1NDQtNGI2OS05NmQ2LWQzYmNjMzNmYzc2YS5zdmdcIlxuICAgICAgICAgICAgICAgICAgYWx0PVwiUmVtaXhcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICB7W1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vdXNlci1pbWFnZXMuZ2l0aHVidXNlcmNvbnRlbnQuY29tLzE1MDA2ODQvMTU3NzY0Mzk3LWNjZDhlYTEwLWI4YWEtNDc3Mi1hOTliLTM1ZGU5MzczMTllMS5zdmdcIixcbiAgICAgICAgICAgICAgICBhbHQ6IFwiRmx5LmlvXCIsXG4gICAgICAgICAgICAgICAgaHJlZjogXCJodHRwczovL2ZseS5pb1wiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vdXNlci1pbWFnZXMuZ2l0aHVidXNlcmNvbnRlbnQuY29tLzE1MDA2ODQvMTU3NzY0Mzk1LTEzN2VjOTQ5LTM4MmMtNDNiZC1hM2MwLTBjYjhjYjIyZTIyZC5zdmdcIixcbiAgICAgICAgICAgICAgICBhbHQ6IFwiU1FMaXRlXCIsXG4gICAgICAgICAgICAgICAgaHJlZjogXCJodHRwczovL3NxbGl0ZS5vcmdcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogXCJodHRwczovL3VzZXItaW1hZ2VzLmdpdGh1YnVzZXJjb250ZW50LmNvbS8xNTAwNjg0LzE1Nzc2NDQ4NC1hZDY0YTIxYS1kN2ZiLTQ3ZTMtODY2OS1lYzA0NmRhMjBjMWYuc3ZnXCIsXG4gICAgICAgICAgICAgICAgYWx0OiBcIlByaXNtYVwiLFxuICAgICAgICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9wcmlzbWEuaW9cIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogXCJodHRwczovL3VzZXItaW1hZ2VzLmdpdGh1YnVzZXJjb250ZW50LmNvbS8xNTAwNjg0LzE1Nzc2NDQ1NC00OGFjOGM3MS1hMmE5LTRiNWUtYjE5Yy1lZGVmOGI4OTUzZDYuc3ZnXCIsXG4gICAgICAgICAgICAgICAgYWx0OiBcIkN5cHJlc3NcIixcbiAgICAgICAgICAgICAgICBocmVmOiBcImh0dHBzOi8vd3d3LmN5cHJlc3MuaW9cIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogXCJodHRwczovL3VzZXItaW1hZ2VzLmdpdGh1YnVzZXJjb250ZW50LmNvbS8xNTAwNjg0LzE1Nzc3MjM4Ni03NTQ0NDE5Ni0wNjA0LTQzNDAtYWYyOC01M2IyMzZmYWExODIuc3ZnXCIsXG4gICAgICAgICAgICAgICAgYWx0OiBcIk1TV1wiLFxuICAgICAgICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9tc3dqcy5pb1wiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vdXNlci1pbWFnZXMuZ2l0aHVidXNlcmNvbnRlbnQuY29tLzE1MDA2ODQvMTU3NzcyNDQ3LTAwZmNjZGNlLTlkMTItNDZhMy04YmI0LWZhYzYxMmNkYzk0OS5zdmdcIixcbiAgICAgICAgICAgICAgICBhbHQ6IFwiVml0ZXN0XCIsXG4gICAgICAgICAgICAgICAgaHJlZjogXCJodHRwczovL3ZpdGVzdC5kZXZcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogXCJodHRwczovL3VzZXItaW1hZ2VzLmdpdGh1YnVzZXJjb250ZW50LmNvbS8xNTAwNjg0LzE1Nzc3MjY2Mi05MmIwZGQzYS00NTNmLTRkMTgtYjhiZS05ZmE2ZWZkZTUyY2YucG5nXCIsXG4gICAgICAgICAgICAgICAgYWx0OiBcIlRlc3RpbmcgTGlicmFyeVwiLFxuICAgICAgICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly90ZXN0aW5nLWxpYnJhcnkuY29tXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcmM6IFwiaHR0cHM6Ly91c2VyLWltYWdlcy5naXRodWJ1c2VyY29udGVudC5jb20vMTUwMDY4NC8xNTc3NzI5MzQtY2UwYTk0M2QtZTlkMC00MGY4LTk3ZjMtZjQ2NGMwODExNjQzLnN2Z1wiLFxuICAgICAgICAgICAgICAgIGFsdDogXCJQcmV0dGllclwiLFxuICAgICAgICAgICAgICAgIGhyZWY6IFwiaHR0cHM6Ly9wcmV0dGllci5pb1wiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3JjOiBcImh0dHBzOi8vdXNlci1pbWFnZXMuZ2l0aHVidXNlcmNvbnRlbnQuY29tLzE1MDA2ODQvMTU3NzcyOTkwLTM5NjhmZjdjLWI1NTEtNGM1NS1hMjVjLTA0NmEzMjcwOWE4ZS5zdmdcIixcbiAgICAgICAgICAgICAgICBhbHQ6IFwiRVNMaW50XCIsXG4gICAgICAgICAgICAgICAgaHJlZjogXCJodHRwczovL2VzbGludC5vcmdcIixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNyYzogXCJodHRwczovL3VzZXItaW1hZ2VzLmdpdGh1YnVzZXJjb250ZW50LmNvbS8xNTAwNjg0LzE1Nzc3MzA2My0yMGEwZWQ2NC1iOWY4LTRlMGItOWQxZS0wYjY1YTNkNGE2ZGIuc3ZnXCIsXG4gICAgICAgICAgICAgICAgYWx0OiBcIlR5cGVTY3JpcHRcIixcbiAgICAgICAgICAgICAgICBocmVmOiBcImh0dHBzOi8vdHlwZXNjcmlwdGxhbmcub3JnXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLm1hcCgoaW1nKSA9PiAoXG4gICAgICAgICAgICAgIDxhIGtleT17aW1nLmhyZWZ9IGhyZWY9e2ltZy5ocmVmfT5cbiAgICAgICAgICAgICAgICA8aW1nIGFsdD17aW1nLmFsdH0gc3JjPXtpbWcuc3JjfSAvPlxuICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L21haW4+XG4gIClcbn1cbiJdfQ== */