import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import PlaceholderModule from "../components/common/PlaceholderModule";

export default function Calificaciones() {
  return (
    <div>
      <PageMeta
        title="Calificaciones | Administración Estudiantil"
        description="Captura y consulta de calificaciones"
      />
      <PageBreadcrumb pageTitle="Calificaciones" />
      <PlaceholderModule
        title="Calificaciones"
        description="Captura de calificaciones por estudiante y grupo."
        items={[
          "Estudiante",
          "Grupo",
          "Parcial 1 / 2 / 3",
          "Calificación final",
          "Estatus (aprobado, reprobado, pendiente)",
        ]}
      />
    </div>
  );
}
