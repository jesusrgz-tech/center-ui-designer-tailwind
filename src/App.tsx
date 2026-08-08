import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Estudiantes from "./pages/Estudiantes";
import Profesores from "./pages/Profesores";
import Cursos from "./pages/Cursos";
import Grupos from "./pages/Grupos";
import Inscripciones from "./pages/Inscripciones";
import Calificaciones from "./pages/Calificaciones";
import Horarios from "./pages/Horarios";
import Pagos from "./pages/Pagos";
import Reportes from "./pages/Reportes";
import Usuarios from "./pages/Usuarios";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Administración estudiantil */}
            <Route path="/estudiantes" element={<Estudiantes />} />
            <Route path="/profesores" element={<Profesores />} />
            <Route path="/cursos" element={<Cursos />} />
            <Route path="/grupos" element={<Grupos />} />
            <Route path="/inscripciones" element={<Inscripciones />} />
            <Route path="/calificaciones" element={<Calificaciones />} />
            <Route path="/horarios" element={<Horarios />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/usuarios" element={<Usuarios />} />

            {/* Sistema */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
