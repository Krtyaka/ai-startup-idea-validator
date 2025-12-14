export default function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <Icon className="h-5 w-5 text-neutral-400" />
      <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>
  );
}
