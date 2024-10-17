import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Patient from "./pages/Patient"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/patient/:id" element={<Patient />} />
    </Routes>
  )
}

export default App
