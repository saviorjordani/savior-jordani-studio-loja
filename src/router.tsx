import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { NotFoundPage } from "./components/NotFoundPage";
import { PageLoader } from "./components/PageLoader";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: NotFoundPage,
    defaultPendingComponent: PageLoader,
    defaultPendingMs: 250,
  });

  return router;
};
