import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { PodcastProvider } from "./context/PodcastContext/PodcastContext";
import { Suspense } from "react";
import Loading from "./components/Loading";
import routes from "./infrasturcture/routes/routes";

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
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<Layout>{route.element}</Layout>}
              />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </PodcastProvider>
  );
}

export default App;
