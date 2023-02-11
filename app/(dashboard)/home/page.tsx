import { delay } from "@/lib/async";
import Greeting from "@/components/Greeting";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import PlaceCard from "@/components/PlaceCard";
import TodoCard from "@/components/TodoCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";

const getData = async () => {
  await delay(2000)
  const user = await getUserFromCookie(cookies())

  const places = await db.place.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      todos: true
    }
  })

  return { places }
}

export default async function Page() {
  const { places } = await getData();

  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className=" h-full  items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {places.map(place => (
            <div className="w-1/3 p-3" key={place.id}>
              <Link href={`/place/${place.id}`}>
                <PlaceCard place={place} />
              </Link>
            </div>
          ))}
          <div className="w-1/3 p-3">{/* new project here */}</div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            <TodoCard />
          </div>
        </div>
      </div>
    </div>
  );
}