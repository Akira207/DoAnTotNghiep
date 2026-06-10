import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/productService";
import api from "../../services/api";

const ProductionCreateModal = ({ isOpen, onClose, onCreated }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [form, setForm] = useState({
    productId: "",
    quantity: 1,
    batch: 1,
    note: "",
    width: "",
    height: "",
    depth: "",
    material: "",
  });

  // ================= FETCH PRODUCTS =================
  useEffect(() => {
    if (!isOpen) return;

    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [isOpen]);

  if (!isOpen) return null;

  // ================= SELECT PRODUCT =================
  const handleSelectProduct = (e) => {
    const id = e.target.value;

    const product = products.find((p) => String(p._id || p.id) === String(id));

    setSelectedProduct(product || null);

    setForm((prev) => ({
      ...prev,
      productId: id,
      width: product?.width || "",
      height: product?.height || "",
      depth: product?.depth || "",
      material: product?.material || "",
    }));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/production-tasks", form);

      onCreated?.();
      onClose();
    } catch (err) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Lỗi tạo lệnh sản xuất";
      alert(errorMessage);
    }
  };

  const image = selectedProduct?.image || selectedProduct?.images?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* modal */}
      <div className="relative bg-white w-full max-w-5xl rounded-lg shadow-2xl overflow-hidden p-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-x-8 gap-y-6"
        >
          {/* LEFT */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            {/* PRODUCT */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Tên Sản phẩm
              </label>

              <div className="relative">
                <select
                  value={form.productId}
                  onChange={handleSelectProduct}
                  className="w-full bg-surface-container-low py-3 px-4 rounded-sm appearance-none font-medium"
                >
                  <option value="">Chọn sản phẩm...</option>

                  {(Array.isArray(products) ? products : []).map((p) => (
                    <option key={p._id || p.id} value={p._id || p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* QUANTITY + BATCH */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                className="bg-surface-container-low py-3 px-4 rounded-sm"
                placeholder="Số lượng"
              />

              <input
                type="number"
                value={form.batch}
                onChange={(e) => setForm({ ...form, batch: e.target.value })}
                className="bg-surface-container-low py-3 px-4 rounded-sm"
                placeholder="Số đợt"
              />
            </div>

            {/* SIZE */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Kích thước kỹ thuật
              </label>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Cao (H)
                  </span>
                  <input
                    value={form.height}
                    readOnly
                    title="Chiều cao sản phẩm"
                    className="w-full bg-slate-100 py-3 px-4 rounded-sm text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Ngang (W)
                  </span>
                  <input
                    value={form.width}
                    readOnly
                    title="Chiều ngang sản phẩm"
                    className="w-full bg-slate-100 py-3 px-4 rounded-sm text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Sâu (D)
                  </span>
                  <input
                    value={form.depth}
                    readOnly
                    title="Chiều sâu sản phẩm"
                    className="w-full bg-slate-100 py-3 px-4 rounded-sm text-sm"
                  />
                </div>
              </div>
            </div>

            {/* MATERIAL */}
            <span className="text-[10px] text-slate-400 font-bold uppercase">
                    Vật liệu
                  </span>
            <input
              value={form.material}
              readOnly
              className="bg-slate-100 py-3 px-4 rounded-sm"
              placeholder="Vật liệu"
            />
          </div>

          {/* RIGHT */}
          <div className="col-span-2 md:col-span-1 space-y-6 flex flex-col">
            {/* IMAGE */}
            <div className="aspect-video bg-slate-100 rounded-sm overflow-hidden">
              {image ? (
                <img src={image} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  Chưa có ảnh
                </div>
              )}
            </div>

            {/* NOTE */}
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              className="w-full bg-surface-container-low p-3 rounded-sm flex-1"
              placeholder="Ghi chú..."
            />
          </div>

          {/* FOOTER */}
          <div className="col-span-2 flex justify-end gap-4 pt-4 border-t">
            <button type="button" onClick={onClose}>
              Huỷ
            </button>

            <button type="submit" className="bg-blue-600 text-white px-6 py-2">
              Tạo lệnh
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductionCreateModal;
