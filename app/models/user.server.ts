import type { Password, User } from "@prisma/client"
import bcrypt from "bcryptjs"

import { prisma } from "~/db.server"

export type { User } from "@prisma/client"

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } })
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } })
}

export async function createUser(email: User["email"], password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } })
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  })

  if (!userWithPassword || !userWithPassword.password) {
    return null
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password.hash)

  if (!isValid) {
    return null
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXIuc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InVzZXIuc2VydmVyLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBQYXNzd29yZCwgVXNlciB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiXG5cbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJ+L2RiLnNlcnZlclwiXG5cbmV4cG9ydCB0eXBlIHsgVXNlciB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRVc2VyQnlJZChpZDogVXNlcltcImlkXCJdKSB7XG4gIHJldHVybiBwcmlzbWEudXNlci5maW5kVW5pcXVlKHsgd2hlcmU6IHsgaWQgfSB9KVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlckJ5RW1haWwoZW1haWw6IFVzZXJbXCJlbWFpbFwiXSkge1xuICByZXR1cm4gcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7IHdoZXJlOiB7IGVtYWlsIH0gfSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZVVzZXIoZW1haWw6IFVzZXJbXCJlbWFpbFwiXSwgcGFzc3dvcmQ6IHN0cmluZykge1xuICBjb25zdCBoYXNoZWRQYXNzd29yZCA9IGF3YWl0IGJjcnlwdC5oYXNoKHBhc3N3b3JkLCAxMClcblxuICByZXR1cm4gcHJpc21hLnVzZXIuY3JlYXRlKHtcbiAgICBkYXRhOiB7XG4gICAgICBlbWFpbCxcbiAgICAgIHBhc3N3b3JkOiB7XG4gICAgICAgIGNyZWF0ZToge1xuICAgICAgICAgIGhhc2g6IGhhc2hlZFBhc3N3b3JkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9KVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlVXNlckJ5RW1haWwoZW1haWw6IFVzZXJbXCJlbWFpbFwiXSkge1xuICByZXR1cm4gcHJpc21hLnVzZXIuZGVsZXRlKHsgd2hlcmU6IHsgZW1haWwgfSB9KVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdmVyaWZ5TG9naW4oXG4gIGVtYWlsOiBVc2VyW1wiZW1haWxcIl0sXG4gIHBhc3N3b3JkOiBQYXNzd29yZFtcImhhc2hcIl1cbikge1xuICBjb25zdCB1c2VyV2l0aFBhc3N3b3JkID0gYXdhaXQgcHJpc21hLnVzZXIuZmluZFVuaXF1ZSh7XG4gICAgd2hlcmU6IHsgZW1haWwgfSxcbiAgICBpbmNsdWRlOiB7XG4gICAgICBwYXNzd29yZDogdHJ1ZSxcbiAgICB9LFxuICB9KVxuXG4gIGlmICghdXNlcldpdGhQYXNzd29yZCB8fCAhdXNlcldpdGhQYXNzd29yZC5wYXNzd29yZCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjb25zdCBpc1ZhbGlkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIHVzZXJXaXRoUGFzc3dvcmQucGFzc3dvcmQuaGFzaClcblxuICBpZiAoIWlzVmFsaWQpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY29uc3QgeyBwYXNzd29yZDogX3Bhc3N3b3JkLCAuLi51c2VyV2l0aG91dFBhc3N3b3JkIH0gPSB1c2VyV2l0aFBhc3N3b3JkXG5cbiAgcmV0dXJuIHVzZXJXaXRob3V0UGFzc3dvcmRcbn1cbiJdfQ== */