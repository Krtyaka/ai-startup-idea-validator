export default function SignalCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-black/80 p-6">
      <div className="flex items-center gap-3 text-neutral-400">
        <Icon className="h-5 w-5" />
        <p className="text-xs uppercase tracking-wide">{label}</p>
      </div>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}
