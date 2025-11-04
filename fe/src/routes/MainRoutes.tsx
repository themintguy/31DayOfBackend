import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "../components/Navbar";
import Create from "../pages/Create";
import Delete from "../pages/Delete";
import Home from "../pages/Home";
import Read from "../pages/Read";
import Update from "../pages/Update";

const MainRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/read" element={<Read />} />
          <Route path="/update" element={<Update />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default MainRoutes