import { createTRPCRouter } from "~/server/api/trpc";
import { POSTAPIRouter } from "./routers/POSTAPI";
import { GETAPIRouter } from "./routers/GETAPI";
import { UPDATEAPIRouter } from "./routers/UPDATEAPI";
import { DELETEAPIRouter } from "./routers/DELETEAPI";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  POSTAPI: POSTAPIRouter,
  GETAPI: GETAPIRouter,
  UPDATEAPI: UPDATEAPIRouter,
  DELETEAPI: DELETEAPIRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
