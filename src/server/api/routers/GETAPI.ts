import { firestore } from "src/firebaseConfig";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getDocs, collection } from "firebase/firestore";

let sampleCollection = collection(firestore, "sample");

export const GETAPIRouter = createTRPCRouter({
  getSample: publicProcedure.query(async () => {
    const users: Users[] = [];
    await getDocs(sampleCollection).then((response) => {
      response.forEach((doc) => {
        const data = doc.data();
        users.push({
          id: doc.id,
          name: data.name,
          email: data.email,
          age: data.age,
        });
      });
    });
    return { users };
  }),
});
