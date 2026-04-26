import { BrowserRouter, Routes, Route } from "react-router";
import DashboardHome from "./pages/DashboardHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;