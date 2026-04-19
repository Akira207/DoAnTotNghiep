export default function FinanceSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      {/* MAIN BALANCE */}
      <div className="md:col-span-2 bg-gradient-to-br from-primary to-primary-dim p-8 rounded-xl shadow-2xl relative overflow-hidden text-on-primary">

        {/* background icon */}
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <span
            className="material-symbols-outlined text-[120px]"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            account_balance_wallet
          </span>
        </div>

        <div className="relative z-10">
          <p className="text-sm font-medium opacity-80 uppercase tracking-widest">
            Tổng số dư khả dụng
          </p>

          <h3 className="text-5xl font-black mt-2 tracking-tighter">
            4,820,500,000{" "}
            <span className="text-xl font-normal opacity-70">
              VND
            </span>
          </h3>

          <div className="mt-8 flex gap-8">

            {/* INCOME */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined">
                  trending_up
                </span>
              </div>

              <div>
                <p className="text-[10px] opacity-70 uppercase">
                  Tiền vào tháng này
                </p>
                <p className="font-bold">+1.2B</p>
              </div>
            </div>

            {/* EXPENSE */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined">
                  trending_down
                </span>
              </div>

              <div>
                <p className="text-[10px] opacity-70 uppercase">
                  Tiền ra tháng này
                </p>
                <p className="font-bold text-on-error">-450M</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* PROFIT CARD */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-surface-container flex flex-col justify-between">

        <div>
          <div className="flex justify-between items-start mb-6">

            <div className="w-12 h-12 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
              <span className="material-symbols-outlined">
                auto_graph
              </span>
            </div>

            <span className="px-2 py-1 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold rounded">
              +12.5%
            </span>
          </div>

          <p className="text-on-surface-variant text-sm font-medium">
            Lợi nhuận ròng dự tính (Q3)
          </p>

          <h4 className="text-3xl font-bold text-on-surface mt-1">
            1,450,000,000
          </h4>
        </div>

        <div className="mt-6 pt-6 border-t border-surface-container">
          <p className="text-xs text-on-surface-variant italic">
            Cập nhật lúc: 15:30 Hôm nay
          </p>
        </div>
      </div>

    </div>
  );
}