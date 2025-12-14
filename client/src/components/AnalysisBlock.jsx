export default function AnalysisBlock({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-black/70 p-6">
      <div className="mb-3 flex items-center gap-3 text-neutral-300">
        <Icon className="h-5 w-5" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-base text-neutral-300 leading-relaxed">{children}</p>
    </div>
  );
}
