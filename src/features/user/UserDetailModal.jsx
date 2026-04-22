import { useEffect } from "react";

export default function UserDetailModal({ open, onClose, user }) {
  // ESC để đóng modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">

      {/* MODAL */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

        {/* HEADER */}
        <div className="p-6 flex justify-between items-start">
          <h3 className="text-xl font-bold text-slate-900">
            Thông tin nhân sự
          </h3>

          <button
            className="text-slate-400 hover:text-slate-600 transition-colors"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 pb-8 space-y-6">

          {/* AVATAR + NAME */}
          <div className="flex items-center gap-5">
            <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-5xl">
                person
              </span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900">
              {user.name || "Chưa có tên"}
            </h2>
          </div>

          {/* INFO */}
          <div className="space-y-3">

            <div className="flex gap-2 text-sm">
              <span className="font-bold text-slate-900 min-w-[100px]">
                Username:
              </span>
              <span className="text-slate-600">
                {user.username || "-"}
              </span>
            </div>

            <div className="flex gap-2 text-sm">
              <span className="font-bold text-slate-900 min-w-[100px]">
                Email:
              </span>
              <span className="text-slate-600">
                {user.email || "-"}
              </span>
            </div>

            <div className="flex gap-2 text-sm">
              <span className="font-bold text-slate-900 min-w-[100px]">
                Số điện thoại:
              </span>
              <span className="text-slate-600">
                {user.phone || "-"}
              </span>
            </div>

            <div className="flex gap-2 text-sm">
              <span className="font-bold text-slate-900 min-w-[100px]">
                Vai trò:
              </span>
              <span className="text-slate-600">
                {user.role || "-"}
              </span>
            </div>

            <div className="flex gap-2 text-sm">
              <span className="font-bold text-slate-900 min-w-[100px]">
                Địa chỉ:
              </span>
              <span className="text-slate-600">
                {user.address || "-"}
              </span>
            </div>

          </div>

          {/* BUTTON */}
          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl font-bold text-white bg-primary hover:bg-primary-dim transition-all shadow-lg shadow-primary/25"
          >
            Đóng
          </button>

        </div>
      </div>
    </div>
  );
}