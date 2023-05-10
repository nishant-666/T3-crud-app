import { z } from "zod";
import { firestore } from "src/firebaseConfig";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { collection, updateDoc, doc } from "firebase/firestore";

let sampleCollection = collection(firestore, "sample");

export const UPDATEAPIRouter = createTRPCRouter({
  updateSample: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        age: z.string(),
      })
    )
    .mutation(({ input }) => {
      let docToUpdate = doc(sampleCollection, input.id);
      let user = {
        name: input.name,
        email: input.email,
        age: input.age,
      };

      updateDoc(docToUpdate, user);
      return { user };
    }),
});
