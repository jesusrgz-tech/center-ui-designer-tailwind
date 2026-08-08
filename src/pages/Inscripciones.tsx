import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import PlaceholderModule from "../components/common/PlaceholderModule";

export default function Inscripciones() {
  return (
    <div>
      <PageMeta
        title="Inscripciones | Administración Estudiantil"
        description="Matrícula de estudiantes a grupos"
      />
      <PageBreadcrumb pageTitle="Inscripciones" />
      <PlaceholderModule
        title="Inscripciones / Matrícula"
        description="Registro de estudiantes en los grupos de cada periodo."
        items={[
          "Estudiante",
          "Grupo",
          "Periodo",
          "Fecha de inscripción",
          "Estatus (inscrito, baja, en espera)",
        ]}
      />
    </div>
  );
}
