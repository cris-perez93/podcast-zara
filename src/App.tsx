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
        </Routes>
      </Router>
    </PodcastProvider>
  );
}

export default App;
