export default function ProjectsSection() {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
      <h2 className="text-base md:text-lg font-bold mb-4">
        Dự án trọng điểm
      </h2>

      <div className="space-y-3 md:space-y-4 flex-1">

        <div className="p-3 md:p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800">
          <h4 className="text-xs md:text-sm font-bold">
            Khách sạn Sunrise - GH
          </h4>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 md:h-1.5 rounded-full overflow-hidden mt-2">
            <div className="bg-primary h-full" style={{ width: "75%" }}></div>
          </div>
        </div>

      </div>
    </div>
  );
}