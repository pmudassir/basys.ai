import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Patient from "./pages/Patient"
import ViewRequests from "./pages/ViewRequests"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/patient/:id" element={<Patient />} />
      <Route path="/prior-requests" element={<ViewRequests />} />
    </Routes>
  )
}

export default App
