import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import PlaceholderModule from "../components/common/PlaceholderModule";

export default function Profesores() {
  return (
    <div>
      <PageMeta
        title="Profesores | Administración Estudiantil"
        description="Listado y ficha de profesores"
      />
      <PageBreadcrumb pageTitle="Profesores" />
      <PlaceholderModule
        title="Profesores"
        description="Listado y ficha de docentes de la institución."
        items={[
          "Número de empleado",
          "Nombre completo",
          "Departamento / área",
          "Materias asignadas",
          "Correo institucional",
        ]}
      />
    </div>
  );
}
