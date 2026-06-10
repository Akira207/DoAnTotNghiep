const DashboardHeader = ({ onCreate }) => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h3 className="text-3xl font-black text-on-surface tracking-tight leading-none mb-2">
          Tổng quan hệ thống
        </h3>
        <p className="text-on-surface-variant font-medium">
          Chào mừng trở lại, hôm nay là {formattedDate}.
        </p>
      </div>

      <div className="flex gap-3">
        <button className="bg-surface-container-low text-primary px-5 py-2.5 rounded font-semibold flex items-center gap-2 hover:bg-surface-container transition-colors">
          <span
            className="material-symbols-outlined text-[20px]"
            data-icon="file_download"
          >
            file_download
          </span>
          Xuất báo cáo
        </button>

        <button
          onClick={onCreate}
          className="bg-primary text-white px-5 py-2.5 rounded font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <span
            className="material-symbols-outlined text-[20px]"
            data-icon="add"
          >
            add
          </span>
          Đơn hàng mới
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;