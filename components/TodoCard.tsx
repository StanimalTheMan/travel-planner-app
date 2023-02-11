import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { TODO_STATUS } from "@prisma/client";
import { cookies } from "next/headers";
import Button from "./Button";
import Card from "./Card";

const getData = async () => {
  const user = await getUserFromCookie(cookies()); 

  const todos = await db.todo.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TODO_STATUS.COMPLETED,
        deleted: true
      }
    },
    take: 5,
    orderBy: {
      createdAt: 'asc' // should look into ordering todos by importance? update schema in future?
    }
  })

  return todos
}

const TodoCard = async ({ todos, title }) => {
  const data = todos || await getData()

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((todo) => (
              <div className="py-2 ">
                <div>
                  <span className="text-gray-800">{todo.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">
                    {todo.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no todos</div>
        )}
      </div>
    </Card>
  )
}

export default TodoCard