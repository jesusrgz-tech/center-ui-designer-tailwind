import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import PlaceholderModule from "../components/common/PlaceholderModule";

export default function Horarios() {
  return (
    <div>
      <PageMeta
        title="Horarios | Administración Estudiantil"
        description="Horario de clases por grupo"
      />
      <PageBreadcrumb pageTitle="Horarios" />
      <PlaceholderModule
        title="Horarios"
        description="Horario de clases por grupo (día, hora y aula)."
        items={["Grupo", "Día", "Hora inicio", "Hora fin", "Aula"]}
      />
    </div>
  );
}
