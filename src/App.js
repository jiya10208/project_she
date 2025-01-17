import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Homepage from "./Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
