import { lazy, Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { NoMatch } from "./views/NoMatch";
import { Layout } from "./components/Layout/Layout";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const Home = lazy(() => import("./views/Home/Home"));
const Detail = lazy(() => import("./views/Detail/Detail"));

const App = () => {
  return (
    <ErrorBoundary>
      <div className="App">
        <Suspense fallback={<CircularProgress />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="detail/:id" element={<Detail />} />
              <Route path="*" element={<NoMatch />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default App;
