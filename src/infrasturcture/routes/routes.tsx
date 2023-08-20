import { lazy } from "react";

// Lazy load components
const Home = lazy(() => import("../../pages/Home"));
const PodcastDetail = lazy(() => import("../../pages/PodcastDetail"));

// Definir las rutas
const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/podcast/:id",
    element: <PodcastDetail />,
  },
  {
    path: "/podcast/:id/episode/:episodeId",
    element: <PodcastDetail episodeDetail={true} />,
  },
];

export default routes;
