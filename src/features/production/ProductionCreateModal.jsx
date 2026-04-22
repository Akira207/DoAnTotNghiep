import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

const ProductionCreateModal = ({ isOpen, onClose, onCreated }) => {
  const [products, setProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [form, setForm] = useState({
    productId: "",
    quantity: 1,
    batch: 1,
    note: "",
  });

  // =========================
  // FETCH PRODUCT LIST
  // =========================
  useEffect(() => {
    if (!isOpen) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API}/products`);
        setProducts(res.data || []);
      } catch (err) {
        console.error("Load products error:", err);
      }
    };

    fetchProducts();
  }, [isOpen]);

  if (!isOpen) return null;

  // =========================
  // HANDLE SELECT PRODUCT
  // =========================
  const handleSelectProduct = (e) => {
    const id = e.target.value;

    const product = products.find((p) => p._id === id);

    setSelectedProduct(product || null);

    setForm((prev) => ({
      ...prev,
      productId: id,
    }));
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/production-tasks`, {
        productId: form.productId,
        quantity: form.quantity,
        batch: form.batch,
        note: form.note,
      });

      onCreated?.(); // reload list
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const image =
    selectedProduct?.image ||
    selectedProduct?.thumbnail ||
    selectedProduct?.images?.[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* modal */}
      <div className="relative bg-white w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden flex animate-in fade-in zoom-in duration-300">
        <div className="flex-1 p-8">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-slate-900">
              Tạo Lệnh Sản xuất Mới
            </h2>

            <button onClick={onClose} className="text-slate-400 hover:text-slate-900">
              ✕
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-8 gap-y-6">

            {/* LEFT */}
            <div className="col-span-2 md:col-span-1 space-y-4">

              {/* PRODUCT SELECT */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Tên sản phẩm
                </label>

                <select
                  value={form.productId}
                  onChange={handleSelectProduct}
                  className="w-full bg-slate-50 py-3 px-4 rounded-sm font-medium"
                >
                  <option value="">Chọn sản phẩm...</option>

                  {products.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* QUANTITY + BATCH */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Số lượng
                  </label>

                  <input
                    type="number"
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({ ...form, quantity: e.target.value })
                    }
                    className="w-full bg-slate-50 py-3 px-4 rounded-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    Số đợt
                  </label>

                  <input
                    type="number"
                    value={form.batch}
                    onChange={(e) =>
                      setForm({ ...form, batch: e.target.value })
                    }
                    className="w-full bg-slate-50 py-3 px-4 rounded-sm"
                  />
                </div>
              </div>

            </div>

            {/* RIGHT */}
            <div className="col-span-2 md:col-span-1 space-y-6 flex flex-col">

              {/* IMAGE PREVIEW */}
              <div className="aspect-video bg-slate-100 rounded-sm overflow-hidden">
                {image ? (
                  <img src={image} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400">
                    Chưa chọn sản phẩm
                  </div>
                )}
              </div>

              {/* AUTO INFO */}
              <div className="text-sm space-y-1">
                <p>
                  <b>Kích thước:</b>{" "}
                  {selectedProduct?.size || "—"}
                </p>
                <p>
                  <b>Vật liệu:</b>{" "}
                  {selectedProduct?.material || "—"}
                </p>
              </div>

              {/* NOTE */}
              <textarea
                value={form.note}
                onChange={(e) =>
                  setForm({ ...form, note: e.target.value })
                }
                className="w-full bg-slate-50 p-3 rounded-sm flex-1"
                placeholder="Ghi chú..."
              />
            </div>

            {/* FOOTER */}
            <div className="col-span-2 flex justify-end gap-4 pt-4 border-t">

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-slate-500"
              >
                Huỷ
              </button>

              <button
                type="submit"
                className="px-8 py-2 bg-blue-600 text-white rounded-sm"
              >
                Tạo lệnh
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductionCreateModal;