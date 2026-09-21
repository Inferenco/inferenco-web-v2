import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Nova from "./pages/Nova";
import NovaWallet from "./pages/NovaWallet";
import NovaDesk from "./pages/NovaDesk";
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
          <Route path="nova" element={<Nova />} />
          <Route path="nova-wallet" element={<NovaWallet />} />
          <Route path="nova-desk" element={<NovaDesk />} />
          <Route path="docs/*" element={<Docs />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<BlogSingle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
