import React from "react";

export const MetaRow: React.FC<{ label: string; value?: string | null }> = ({ label, value }) => (
  <div className="flex items-start gap-4 bg-white/5 rounded-2xl p-3.5 border border-white/10">
    <span className="text-white/60 w-40 shrink-0 tracking-wide">{label}</span>
    <span className="text-white/90 font-medium leading-6">{value ?? "—"}</span>
  </div>
);
export default MetaRow;
