const StatusCard = () => {
  return (
    <div className="bg-surface-container p-8 rounded shadow-sm relative overflow-hidden flex flex-col">
      <div className="relative z-10">
        <h3 className="text-xl font-black tracking-tight mb-2">
          Tình trạng Xưởng
        </h3>
        <p className="text-on-surface-variant text-sm mb-6">
          Trạng thái máy móc & nhân công trực tiếp tại khu vực sản xuất.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/50 rounded">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-bold text-sm">Máy cắt CNC #1</span>
            </div>
            <span className="text-xs font-bold text-tertiary whitespace-nowrap">
              Hoạt động
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/50 rounded">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-bold text-sm">Máy dán cạnh #4</span>
            </div>
            <span className="text-xs font-bold text-tertiary whitespace-nowrap">
              Hoạt động
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/50 rounded">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-bold text-sm">Buồng sơn UV</span>
            </div>
            <span className="text-xs font-bold text-tertiary whitespace-nowrap">
              Hoạt động
            </span>
          </div>
        </div>
      </div>

      {/* Artistic background */}
      <div className="absolute -right-10 -bottom-10 opacity-10">
        <span className="material-symbols-outlined text-[180px]">
          architecture
        </span>
      </div>
    </div>
  );
};

export default StatusCard;