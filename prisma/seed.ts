import { hashPassword } from '@/lib/auth';
import { db } from "@/lib/db";
import { TODO_STATUS } from "@prisma/client";

const getRandomTodoStatus = () => {
  const statuses = [
    TODO_STATUS.COMPLETED,
    TODO_STATUS.NOT_COMPLETED
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

async function main() {
  // const user = await db.user.upsert({
  //   where: { email: "user@email.com" },
  //   update: {},
  //   create: {
  //     email: "user@email.com",
  //     firstName: "User",
  //     lastName: "Person",
  //     password: await hashPassword("password"),
  //     places: {
  //       create: new Array(5).fill(1).map((_, i) => ({
  //         name: `Place ${i}`,
  //       })),
  //     },
  //   },
  //   include: {
  //     places: true,
  //   },
  // });

  // const todos = await Promise.all(
  //   user.places.map((place) =>
  //     db.todo.createMany({
  //       data: new Array(10).fill(1).map((_, i) => {
  //         return {
  //           name: `Todo ${i}`,
  //           ownerId: user.id,
  //           placeId: place.id,
  //           description: `Everything that describes Todo ${i}`,
  //           status: getRandomTodoStatus(),
  //         };
  //       }),
  //     })
  //   )
  // );

  // console.log({ user, todos });
}
main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
