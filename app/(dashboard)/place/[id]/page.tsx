import TodoCard from "@/components/TodoCard"
import { getUserFromCookie } from "@/lib/auth"
import { db } from "@/lib/db"
import { cookies } from "next/headers"

const getData = async (id) => {
  const user = await getUserFromCookie(cookies())

  const place = await db.place.findFirst({
    where: {
      id,
      ownerId: user?.id
    },
    include: {
      todos: true,
    },
  });

  return place;
}

export default async function PlacePage({params}) {
  const place = await getData(params.id)

  return (
    <div className="h-full overflow-y-auto pr-6 w-1/1">
      <TodoCard todos={place.todos} title={place.name} />
    </div>
  )
}