export default function ProductCard({ product }) {
  return (
    <div className="bg-surface-container-lowest rounded-sm shadow-sm overflow-hidden group border border-transparent hover:border-primary/20 transition-all duration-300">
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Status */}
        {/* <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${product.statusClass}`}
          >
            {product.status}
          </span>
        </div> */}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col">
        <div className="text-[10px] font-bold text-primary mb-1">
          SKU: {product.sku}
        </div>

        <h3 className="text-lg font-bold text-on-surface mb-3 line-clamp-1">
          {product.name}
        </h3>

        {/* Size */}
        <div className="grid grid-cols-3 gap-2 mb-4 bg-surface p-2 rounded-sm">
          <div className="text-center">
            <div className="text-[9px] uppercase text-outline">Cao</div>
            <div className="text-xs font-bold">{product.height}</div>
          </div>

          <div className="text-center border-x border-outline/20">
            <div className="text-[9px] uppercase text-outline">Rộng</div>
            <div className="text-xs font-bold">{product.width}</div>
          </div>

          <div className="text-center">
            <div className="text-[9px] uppercase text-outline">Sâu</div>
            <div className="text-xs font-bold">{product.depth}</div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="text-[10px] uppercase text-outline font-bold mb-1">
              Ước tính
            </div>
            <div className="text-xl font-black text-secondary">
              {product.price} VND
            </div>
          </div>

          <button className="p-2 hover:bg-slate-50 rounded-sm text-outline hover:text-primary transition-colors">
            <span className="material-symbols-outlined">edit_square</span>
          </button>
        </div>
      </div>
    </div>
  );
}
