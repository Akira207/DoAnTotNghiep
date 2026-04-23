const StatusCard = ({ data = {} }) => {
  const { productionTasks = [] } = data;

  // Get in-progress tasks
  const activeTasks = productionTasks
    .filter(task => task.status === "in-progress")
    .slice(0, 3);

  const getStatusColor = (status) => {
    switch (status) {
      case "in-progress":
        return "bg-tertiary";
      case "completed":
        return "bg-secondary";
      case "pending":
        return "bg-surface-container";
      default:
        return "bg-error";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "in-progress":
        return "Đang sản xuất";
      case "completed":
        return "Hoàn thành";
      case "pending":
        return "Chờ xử lý";
      default:
        return status;
    }
  };

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
          {activeTasks.length > 0 ? (
            activeTasks.map((task) => (
              <div key={task._id} className="flex items-center justify-between p-3 bg-white/50 rounded">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className={`w-2 h-2 rounded-full ${getStatusColor(task.status)} animate-pulse flex-shrink-0`}></span>
                  <span className="font-bold text-sm truncate">
                    {task.taskName || `Task ${task._id?.substring(0, 4)}`}
                  </span>
                </div>
                <span className="text-xs font-bold text-tertiary whitespace-nowrap ml-2">
                  {getStatusLabel(task.status)}
                </span>
              </div>
            ))
          ) : (
            <div className="p-3 bg-white/50 rounded text-center text-on-surface-variant text-sm">
              Không có tác vụ đang thực hiện
            </div>
          )}
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