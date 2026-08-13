import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import PlaceholderModule from "../components/common/PlaceholderModule";

export default function Pagos() {
  return (
    <div>
      <PageMeta
        title="Pagos | Administración Estudiantil"
        description="Colegiaturas y pagos de estudiantes"
      />
      <PageBreadcrumb pageTitle="Pagos" />
      <PlaceholderModule
        title="Pagos / Colegiaturas"
        description="Control de pagos de colegiatura por estudiante."
        items={[
          "Estudiante",
          "Concepto",
          "Monto",
          "Fecha límite de pago",
          "Estatus (pagado, pendiente, vencido)",
        ]}
      />
    </div>
  );
}
