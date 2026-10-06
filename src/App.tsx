import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Infer from "./pages/Infer";
import InferWalletPage from "./pages/InferWalletPage";
import InferDesk from "./pages/InferDesk";
import InferMcp from "./pages/InferMcp";
import Docs from "./pages/Docs";
import Blogs from "./pages/Blogs";
import BlogSingle from "./pages/BlogSingle";
import NotFound from "./components/NotFound";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="infer" element={<Infer />} />
          <Route path="infer-wallet" element={<InferWalletPage />} />
          <Route path="infer-desk" element={<InferDesk />} />
          <Route path="infer-mcp" element={<InferMcp />} />
          <Route path="docs/*" element={<Docs />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogSingle />} />
          {/* Catch-all so unknown/legacy routes (e.g. /nova) render a 404 page
              inside the Layout instead of rendering a blank page. */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
