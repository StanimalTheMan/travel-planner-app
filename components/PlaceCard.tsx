import { FC } from "react";
import { Prisma, TODO_STATUS } from "@prisma/client";
import Card from "./Card";
import clsx from "clsx";

const placeWithTodos = Prisma.validator<Prisma.PlaceArgs>()({
  include: { todos: true },
})

type PlaceWithTodos = Prisma.PlaceGetPayload<typeof placeWithTodos>

const format = (date) =>
  new Date(date).toLocaleDateString("en-js", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  })

const PlaceCard: FC<{place: PlaceWithTodos}> = ({ place }) => 
{
  const completedCount = place.todos.map(place => place.status === TODO_STATUS.COMPLETED).length

  const progress = Math.ceil((completedCount / place.todos.length) * 100);


  return (
    <Card className="!px-6 !py-8 hover:scale-105 transition-all ease-in-out duration-200">
      <div>
        <span className="text-sm text-gray-300">
          {format(place.createdAt)}
        </span>
      </div>
      <div className="mb-6">
        <span className="text-3xl text-gray-600">{place.name}</span>
      </div>
      <div className="mb-2">
        <span className="text-gray-400">
          {completedCount}/{place.todos.length} completed
        </span>
      </div>
      <div>
        <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
          <div
            className={clsx(
              "h-full text-center text-xs text-white bg-violet-600 rounded-full"
            )}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-600 font-semibold">
            {progress}%
          </span>
        </div>
      </div>
    </Card>
  );
}

export default PlaceCard