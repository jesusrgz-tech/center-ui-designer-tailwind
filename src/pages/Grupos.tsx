import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import PlaceholderModule from "../components/common/PlaceholderModule";

export default function Grupos() {
  return (
    <div>
      <PageMeta
        title="Grupos | Administración Estudiantil"
        description="Grupos o secciones por periodo"
      />
      <PageBreadcrumb pageTitle="Grupos" />
      <PlaceholderModule
        title="Grupos / Secciones"
        description="Qué profesor imparte qué materia, a qué grupo, en qué periodo."
        items={[
          "Clave de grupo",
          "Materia",
          "Profesor",
          "Periodo",
          "Cupo máximo",
          "Estudiantes inscritos",
        ]}
      />
    </div>
  );
}
