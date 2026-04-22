export default function ProductDetailModal({ product, onClose }) {
  if (!product) return null;

  const image = product.images?.[0] || "/no-image.png";

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      
      {/* Modal */}
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="p-6 flex justify-between items-start">
          <h3 className="text-xl font-bold text-slate-900">
            Chi tiết sản phẩm
          </h3>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-8 space-y-6">
          
          {/* Image + name */}
          <div className="flex items-center gap-5">
            <img
              src={image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-lg"
            />

            <h2 className="text-xl font-bold text-slate-900">
              {product.name}
            </h2>
          </div>

          {/* Info */}
          <div className="space-y-3 text-sm">
            
            <div className="flex gap-2">
              <span className="font-bold min-w-[120px]">Giá:</span>
              <span>{product.price} VND</span>
            </div>

            <div className="flex gap-2">
              <span className="font-bold min-w-[120px]">Danh mục:</span>
              <span>{product.category}</span>
            </div>

            <div className="flex gap-2">
              <span className="font-bold min-w-[120px]">Chất liệu:</span>
              <span>{product.material}</span>
            </div>

            <div className="flex gap-2">
              <span className="font-bold min-w-[120px]">Kích thước:</span>
              <span>
                {product.width} x {product.height} x {product.depth}
              </span>
            </div>

            <div className="flex gap-2">
              <span className="font-bold min-w-[120px]">Mô tả:</span>
              <span>{product.description}</span>
            </div>

          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-full py-3 rounded-lg font-bold text-white bg-primary hover:bg-primary-dim"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}