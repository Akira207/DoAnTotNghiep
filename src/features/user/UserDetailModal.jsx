export default function UserDetailModal({ open, user, onClose }) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      
      <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4 shadow-xl">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">Thông tin nhân sự</h2>

          <button onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* AVATAR */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            {user.initials}
          </div>

          <div>
            <p className="font-bold">{user.name}</p>
            <p className="text-xs text-gray-500">{user.position}</p>
          </div>
        </div>

        {/* INFO */}
        <div className="space-y-2 text-sm">

          <p><b>Username:</b> {user.username || "N/A"}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Số điện thoại:</b> {user.phone}</p>
          <p><b>Vai trò:</b> {user.roleLabel || user.role}</p>
          <p><b>Địa chỉ:</b> {user.address || "Chưa cập nhật"}</p>

        </div>

        {/* BUTTON */}
        <button
          onClick={onClose}
          className="w-full bg-primary text-white py-2 rounded-lg font-bold"
        >
          Đóng
        </button>

      </div>
    </div>
  );
}