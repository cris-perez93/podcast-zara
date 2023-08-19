import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PodcastDetail from "./pages/PodcastDetail/PodcastDetail";
import Layout from "./components/Layout";

function App() {
  return (
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
  );
}

export default App;
