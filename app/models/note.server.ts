import type { User, Note } from "@prisma/client"

import { prisma } from "~/db.server"

export type { Note } from "@prisma/client"

export function getNote({
  id,
  userId,
}: Pick<Note, "id"> & {
  userId: User["id"]
}) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id, userId },
  })
}

export function getNoteListItems({ userId }: { userId: User["id"] }) {
  return prisma.note.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  })
}

export function createNote({
  body,
  title,
  userId,
}: Pick<Note, "body" | "title"> & {
  userId: User["id"]
}) {
  return prisma.note.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })
}

export function deleteNote({
  id,
  userId,
}: Pick<Note, "id"> & { userId: User["id"] }) {
  return prisma.note.deleteMany({
    where: { id, userId },
  })
}

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vdGUuc2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im5vdGUuc2VydmVyLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBVc2VyLCBOb3RlIH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCJcblxuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSBcIn4vZGIuc2VydmVyXCJcblxuZXhwb3J0IHR5cGUgeyBOb3RlIH0gZnJvbSBcIkBwcmlzbWEvY2xpZW50XCJcblxuZXhwb3J0IGZ1bmN0aW9uIGdldE5vdGUoe1xuICBpZCxcbiAgdXNlcklkLFxufTogUGljazxOb3RlLCBcImlkXCI+ICYge1xuICB1c2VySWQ6IFVzZXJbXCJpZFwiXVxufSkge1xuICByZXR1cm4gcHJpc21hLm5vdGUuZmluZEZpcnN0KHtcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIGJvZHk6IHRydWUsIHRpdGxlOiB0cnVlIH0sXG4gICAgd2hlcmU6IHsgaWQsIHVzZXJJZCB9LFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Tm90ZUxpc3RJdGVtcyh7IHVzZXJJZCB9OiB7IHVzZXJJZDogVXNlcltcImlkXCJdIH0pIHtcbiAgcmV0dXJuIHByaXNtYS5ub3RlLmZpbmRNYW55KHtcbiAgICB3aGVyZTogeyB1c2VySWQgfSxcbiAgICBzZWxlY3Q6IHsgaWQ6IHRydWUsIHRpdGxlOiB0cnVlIH0sXG4gICAgb3JkZXJCeTogeyB1cGRhdGVkQXQ6IFwiZGVzY1wiIH0sXG4gIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb3RlKHtcbiAgYm9keSxcbiAgdGl0bGUsXG4gIHVzZXJJZCxcbn06IFBpY2s8Tm90ZSwgXCJib2R5XCIgfCBcInRpdGxlXCI+ICYge1xuICB1c2VySWQ6IFVzZXJbXCJpZFwiXVxufSkge1xuICByZXR1cm4gcHJpc21hLm5vdGUuY3JlYXRlKHtcbiAgICBkYXRhOiB7XG4gICAgICB0aXRsZSxcbiAgICAgIGJvZHksXG4gICAgICB1c2VyOiB7XG4gICAgICAgIGNvbm5lY3Q6IHtcbiAgICAgICAgICBpZDogdXNlcklkLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlTm90ZSh7XG4gIGlkLFxuICB1c2VySWQsXG59OiBQaWNrPE5vdGUsIFwiaWRcIj4gJiB7IHVzZXJJZDogVXNlcltcImlkXCJdIH0pIHtcbiAgcmV0dXJuIHByaXNtYS5ub3RlLmRlbGV0ZU1hbnkoe1xuICAgIHdoZXJlOiB7IGlkLCB1c2VySWQgfSxcbiAgfSlcbn1cbiJdfQ== */