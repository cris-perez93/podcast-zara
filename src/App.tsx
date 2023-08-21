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
            {/* Ruta para el error 403 */}
            <Route
              path="/403"
              element={
                <div>
                  Forbidden, check cors demo for api:{" "}
                  <a
                    className="text-blue-500 underline"
                    href="https://cors-anywhere.herokuapp.com/corsdemo"
                  >
                    Request temporary acces to the demo server and update the
                    page to try again
                  </a>
                </div>
              }
            />

            {/* Ruta para el error 404 */}
            <Route path="*" element={<div>Element not found</div>} />
          </Routes>
        </Suspense>
      </Router>
    </PodcastProvider>
  );
}

export default App;
