import ComponentCard from "./ComponentCard";

interface PlaceholderModuleProps {
  title: string;
  description: string;
  items: string[];
  listLabel?: string;
}

// Scaffolding temporal para los módulos de administración estudiantil.
// Cada página lo usa para dejar claro qué datos/funcionalidad va aquí
// mientras se conecta al backend real (API + base de datos). Reemplazar
// por la tabla/formulario real cuando exista el endpoint correspondiente.
const PlaceholderModule: React.FC<PlaceholderModuleProps> = ({
  title,
  description,
  items,
  listLabel = "Campos previstos:",
}) => {
  return (
    <ComponentCard title={title} desc={description}>
      <p className="text-sm text-gray-500 dark:text-gray-400">{listLabel}</p>
      <ul className="list-inside list-disc space-y-1 text-sm text-gray-700 dark:text-gray-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </ComponentCard>
  );
};

export default PlaceholderModule;
