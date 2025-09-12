export default function ScreenLoader() {
  return (
    <div className="fixed inset-0 z-[6] grid place-items-center bg-white">
      <div className="flex items-center gap-3 text-gray-700">
        <svg className="size-6 animate-spin text-indigo-600" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
        </svg>
        <span className="text-base font-medium">Loading…</span>
      </div>
    </div>
  );
}
