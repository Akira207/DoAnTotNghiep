export default function OrdersSection() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

      <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <h2 className="text-base md:text-lg font-bold">Đơn hàng mới</h2>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left">
          <tbody>
            <tr>
              <td className="px-6 py-4 text-sm font-bold">#ORD-2841</td>
              <td className="px-6 py-4 text-sm font-medium">
                Nguyễn Văn A
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}