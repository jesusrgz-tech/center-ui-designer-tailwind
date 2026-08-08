import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import PlaceholderModule from "../components/common/PlaceholderModule";

export default function Cursos() {
  return (
    <div>
      <PageMeta
        title="Cursos | Administración Estudiantil"
        description="Catálogo de materias y planes de estudio"
      />
      <PageBreadcrumb pageTitle="Cursos" />
      <PlaceholderModule
        title="Cursos / Materias"
        description="Catálogo de materias que ofrece la institución."
        items={[
          "Clave de materia",
          "Nombre",
          "Créditos",
          "Carrera / plan de estudios",
          "Prerrequisitos",
        ]}
      />
    </div>
  );
}
