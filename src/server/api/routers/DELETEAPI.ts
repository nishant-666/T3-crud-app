import { z } from "zod";
import { firestore } from "src/firebaseConfig";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { collection, deleteDoc, doc } from "firebase/firestore";

let sampleCollection = collection(firestore, "sample");

export const DELETEAPIRouter = createTRPCRouter({
  deleteSample: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input }) => {
      let docToUpdate = doc(sampleCollection, input.id);

      deleteDoc(docToUpdate);
    }),
});
