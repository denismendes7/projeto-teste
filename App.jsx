import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Details from "./pages/Details";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/countries/:id" element={<Details />} />
        <Route path="/countries" element={<Home />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
