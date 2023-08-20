import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { PodcastProvider } from "./context/PodcastContext/PodcastContext";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const PodcastDetail = lazy(() => import("./pages/PodcastDetail/PodcastDetail"));

function App() {
  return (
    <PodcastProvider>
      <Router>
        <Suspense
          fallback={
            <div className="absolute top-10 right-90">
              <Loading /> {/* Loading component for each render */}
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/podcast/:id"
              element={
                <Layout>
                  <PodcastDetail />
                </Layout>
              }
            />
            <Route
              path="/podcast/:id/episode/:episodeId"
              element={
                <Layout>
                  <PodcastDetail episodeDetail={true} />
                </Layout>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </PodcastProvider>
  );
}

export default App;
