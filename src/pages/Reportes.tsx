import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import PlaceholderModule from "../components/common/PlaceholderModule";

export default function Reportes() {
  return (
    <div>
      <PageMeta
        title="Reportes | Administración Estudiantil"
        description="Reportes académicos y administrativos"
      />
      <PageBreadcrumb pageTitle="Reportes" />
      <PlaceholderModule
        title="Reportes"
        description="Reportes que se podrán generar desde el sistema."
        listLabel="Reportes previstos:"
        items={[
          "Kardex por estudiante",
          "Constancias de estudios",
          "Estadísticas por carrera",
          "Ocupación de grupos",
          "Estado de cuenta / pagos",
        ]}
      />
    </div>
  );
}
