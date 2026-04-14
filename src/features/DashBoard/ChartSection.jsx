export default function ChartSection() {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base md:text-lg font-bold">
          Tiến độ sản xuất
        </h2>
        <select className="text-[10px] md:text-xs py-1 pl-2 pr-6 md:pr-8 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg font-bold">
          <option>7 ngày qua</option>
          <option>30 ngày qua</option>
        </select>
      </div>

      <div className="h-40 md:h-64 flex flex-col justify-end gap-3 md:gap-4">
        <div className="flex items-end justify-between px-1 h-full gap-1.5 md:gap-2">

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-md md:rounded-t-lg relative group h-[40%]">
            <div className="absolute inset-x-0 bottom-0 bg-primary/40 rounded-t-md md:rounded-t-lg" style={{ height: "60%" }}></div>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-md md:rounded-t-lg relative group h-[60%]">
            <div className="absolute inset-x-0 bottom-0 bg-primary/40 rounded-t-md md:rounded-t-lg" style={{ height: "75%" }}></div>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-md md:rounded-t-lg relative group h-[80%]">
            <div className="absolute inset-x-0 bottom-0 bg-primary rounded-t-md md:rounded-t-lg" style={{ height: "90%" }}></div>
          </div>

        </div>
      </div>
    </div>
  );
}