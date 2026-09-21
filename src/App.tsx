import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Infer from "./pages/Infer";
import InferWalletPage from "./pages/InferWalletPage";
import InferDesk from "./pages/InferDesk";
import Docs from "./pages/Docs";
import Blogs from "./pages/Blogs";
import BlogSingle from "./pages/BlogSingle";
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
          <Route path="docs/*" element={<Docs />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogSingle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
