import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Calendar from "./pages/Calendar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useState } from "react";
import { EditEvent } from "./pages/EditEvent";



function App() {
  const [email, setEmail] = useState<string | null>(null);

  const handleLogout = () => {
    setEmail(null);
  };

  return (
    <Routes>
        <Route path="/" element={<Login setEmail={setEmail} email={email}/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/calendar" element={
            <ProtectedRoute>
              <Calendar email={email} onLogout={handleLogout}/>
            </ProtectedRoute>
        } />
        <Route path="/calendar/copy/:id" element={
            <ProtectedRoute>
              <EditEvent email={email} onLogout={handleLogout}/>
            </ProtectedRoute>
        } />
        <Route path="/calendar/edit/:id" element={
            <ProtectedRoute>
              <EditEvent email={email} onLogout={handleLogout}/>
            </ProtectedRoute>
        } />
    </Routes>
  )
}

export default App
