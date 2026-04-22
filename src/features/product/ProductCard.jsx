export default function ProductCard({ product, onEdit, onView }) {
  const image = product.images?.[0] || "/no-image.png";

  return (
    <div
      onClick={() => onView?.(product)}
      className="bg-surface-container-lowest rounded-sm shadow-sm overflow-hidden group border border-transparent hover:border-primary/20 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col">
        <div className="text-[10px] font-bold text-primary mb-1">
          ID: {product._id}
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

        {/* Price + Edit */}
        <div
          className="flex items-center justify-between mt-auto"
          onClick={(e) => e.stopPropagation()} // ❗ tránh click edit bị mở modal
        >
          <div>
            <div className="text-[10px] uppercase text-outline font-bold mb-1">
              Giá
            </div>
            <div className="text-xl font-black text-secondary">
              {product.price} VND
            </div>
          </div>

          <button
            onClick={() => onEdit?.(product)}
            className="p-2 hover:bg-slate-50 rounded-sm text-outline hover:text-primary"
          >
            <span className="material-symbols-outlined">
              edit_square
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}