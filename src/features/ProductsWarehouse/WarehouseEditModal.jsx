import { useEffect, useState } from "react";
import { updateWarehouse, deleteWarehouse } from "../../services/warehouseService";
import { getAllProducts } from "../../services/productService";

const WarehouseEditModal = ({ isOpen, onClose, item, onUpdated }) => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productId: "",
    quantity: 0,
  });
  const [isDeleting, setIsDeleting] = useState(false);

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

  useEffect(() => {
    if (item) {
      setForm({
        productId: item.productId || "",
        quantity: item.quantity || 0,
      });
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWarehouse(item._id, {
        productId: form.productId,
        quantity: Number(form.quantity),
      });
      onUpdated?.();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này khỏi kho?")) return;

    setIsDeleting(true);
    try {
      await deleteWarehouse(item._id);
      onUpdated?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Không thể xoá sản phẩm này");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <div className="relative bg-white w-full max-w-lg rounded-lg shadow-xl p-6">
        <h2 className="text-xl font-bold mb-4">Cập nhật thông tin kho</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-bold">Sản phẩm</label>
            <select
              className="w-full mt-1 p-2 border rounded"
              value={form.productId}
              onChange={(e) => setForm({ ...form, productId: e.target.value })}
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

          <div>
            <label className="text-sm font-bold">Số lượng</label>
            <input
              type="number"
              className="w-full mt-1 p-2 border rounded"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              required
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-error text-white rounded hover:bg-error-dim transition-colors disabled:opacity-50"
            >
              {isDeleting ? "Đang xoá..." : "Xoá sản phẩm"}
            </button>

            <div className="flex gap-3">
              <button type="button" onClick={onClose}>
                Huỷ
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white rounded"
              >
                Cập nhật
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WarehouseEditModal;
