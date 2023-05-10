import { z } from "zod";
import { firestore } from "src/firebaseConfig";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { addDoc, collection } from "firebase/firestore";

let sampleCollection = collection(firestore, "sample");

export const POSTAPIRouter = createTRPCRouter({
  postSample: publicProcedure
    .input(z.object({ name: z.string(), email: z.string(), age: z.string() }))
    .mutation(({ input }) => {
      let user = {
        name: input.name,
        email: input.email,
        age: input.age,
      };

      addDoc(sampleCollection, user);
      return { user };
    }),
});
