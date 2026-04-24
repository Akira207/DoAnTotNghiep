import { useEffect, useState } from "react";
import { createWarehouse } from "../../services/warehouseService";
import { getAllProducts } from "../../services/productService";

const WarehouseCreateModal = ({ isOpen, onClose, onCreated }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: 0,
  });

  // load product list
  useEffect(() => {
    if (!isOpen) return;

    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setProducts([]);
      }
    };

    fetchProducts();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createWarehouse({
        productId: form.productId,
        quantity: Number(form.quantity),
        location: "Kho chính", // fix cứng
      });

      onCreated?.();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* modal */}
      <div className="relative bg-white w-full max-w-lg rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4">Nhập kho mới</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Product */}
          <div>
            <label className="text-sm font-bold">Sản phẩm</label>
            <select
              className="w-full mt-1 p-2 border rounded"
              value={form.productId}
              onChange={(e) =>
                setForm({ ...form, productId: e.target.value })
              }
              required
            >
              <option value="">Chọn sản phẩm</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm font-bold">Số lượng</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded"
              value={form.quantity}
              onChange={(e) =>
                setForm({ ...form, quantity: e.target.value })
              }
              required
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose}>
              Huỷ
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded"
            >
              Nhập kho
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WarehouseCreateModal;