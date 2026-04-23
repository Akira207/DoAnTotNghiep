const ProductionSummary = ({ tasks = [] }) => {
  // Calculate stats from tasks
  const total = tasks.length;
  const completed = tasks.filter(t => (t.status || "").toLowerCase() === "completed").length;
  const inProgress = tasks.filter(t => (t.status || "").toLowerCase() === "in-progress").length;
  const urgent = tasks.filter(t => (t.priority || "").toLowerCase() === "high").length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
      
      {/* LEFT CARD */}
      <div className="lg:col-span-8 bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        
        <div className="relative z-10">
          <h3 className="text-lg font-medium opacity-80 mb-2">
            Tổng công suất xưởng
          </h3>

          <div className="flex items-baseline gap-2">
            <span className="text-6xl md:text-7xl font-black tracking-tighter">
              {total} Lệnh
            </span>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            
            {/* Completed */}
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                check_circle
              </span>
              <span className="text-sm font-bold">
                {completed} Hoàn thành
              </span>
            </div>

            {/* In Progress */}
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                pending
              </span>
              <span className="text-sm font-bold">
                {inProgress} Đang xử lý
              </span>
            </div>

          </div>
        </div>

        {/* Background effect */}
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>

      {/* RIGHT CARD */}
      <div className="lg:col-span-4 bg-secondary-container rounded-3xl p-8 flex flex-col justify-between shadow-xl">
        
        <div>
          <h3 className="text-xl font-black text-on-secondary-container">
            Ưu tiên cao
          </h3>
          <p className="text-sm text-on-secondary-container/80 mt-1">
            Cần bàn giao trong 24h tới
          </p>
        </div>

        <div className="mt-8">
          <p className="text-7xl font-black text-[#8c4a00] tracking-tighter">
            {urgent}
          </p>
          <p className="text-xs font-black text-on-secondary-container uppercase tracking-[0.2em] mt-1">
            Sản phẩm
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProductionSummary;