import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Nova from "./pages/Nova";
import NovaWallet from "./pages/NovaWallet";
import NovaDesk from "./pages/NovaDesk";
import Docs from "./pages/Docs";
import "./index.css";

function App() {
  useEffect(() => {
    if (import.meta.env.VITE_GOOGLE_ANALYTICS_CODE) {
      ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_CODE, {
        gtagOptions: {
          debug_mode: import.meta.env.DEV,
        },
      });
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="nova" element={<Nova />} />
          <Route path="nova-wallet" element={<NovaWallet />} />
          <Route path="nova-desk" element={<NovaDesk />} />
          <Route path="docs/*" element={<Docs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
