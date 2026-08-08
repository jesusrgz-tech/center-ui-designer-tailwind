import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import PlaceholderModule from "../components/common/PlaceholderModule";

export default function Estudiantes() {
  return (
    <div>
      <PageMeta
        title="Estudiantes | Administración Estudiantil"
        description="Listado y ficha de estudiantes"
      />
      <PageBreadcrumb pageTitle="Estudiantes" />
      <PlaceholderModule
        title="Estudiantes"
        description="Listado y ficha de estudiantes inscritos en la institución."
        items={[
          "Matrícula",
          "Nombre completo",
          "Carrera",
          "Semestre",
          "Estatus (activo, baja, egresado)",
          "Correo institucional",
        ]}
      />
    </div>
  );
}
