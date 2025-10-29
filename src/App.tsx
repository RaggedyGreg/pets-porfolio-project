import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home/Home";
import { Detail } from "./views/Detail/Detail";
import { NoMatch } from "./views/NoMatch";
import { Layout } from "./components/Layout/Layout";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
