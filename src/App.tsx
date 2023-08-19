import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PodcastDetail from "./pages/PodcastDetail/PodcastDetail";
import Layout from "./components/Layout";
import { PodcastProvider } from "./context/PodcastContext/PodcastContext";

function App() {
  return (
    <PodcastProvider>
      <Router>
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
            element={<div>hola worldddd</div>}
          />
        </Routes>
      </Router>
    </PodcastProvider>
  );
}

export default App;
