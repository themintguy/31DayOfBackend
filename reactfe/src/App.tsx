import  {  Routes, Route, BrowserRouter } from "react-router-dom";
import DataFetch from "./components/DataFetch";
import NoteForm from "./components/NoteForm"

const App = () => {
  return (
    <>
    <BrowserRouter>

        <Routes>
          <Route path="/" element={<DataFetch />} />
          <Route path="/notes" element={<NoteForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App