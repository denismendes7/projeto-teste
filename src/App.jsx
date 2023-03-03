import { Routes, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";
import { CountryProvider } from "./Contexts/Context";

export default function App() {
  return (
    <>
      <Header />

      <CountryProvider>
        <Routes>
          <Route path="/countries/:id" element={<Details />} />
          <Route path="/countries" element={<Home />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </CountryProvider>
    </>
  );
}
