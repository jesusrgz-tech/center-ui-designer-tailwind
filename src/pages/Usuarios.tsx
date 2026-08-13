import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import PlaceholderModule from "../components/common/PlaceholderModule";

export default function Usuarios() {
  return (
    <div>
      <PageMeta
        title="Usuarios y Roles | Administración Estudiantil"
        description="Cuentas de acceso al sistema y sus roles"
      />
      <PageBreadcrumb pageTitle="Usuarios y Roles" />
      <PlaceholderModule
        title="Usuarios y Roles"
        description="Quién puede entrar al sistema y con qué permisos."
        items={[
          "Usuario",
          "Correo",
          "Rol (Administrador, Profesor, Estudiante)",
          "Estatus (activo, suspendido)",
          "Último acceso",
        ]}
      />
    </div>
  );
}
