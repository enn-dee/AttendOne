import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignUp/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
