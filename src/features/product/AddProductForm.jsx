import { useState, useEffect } from "react";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";

export default function AddProductForm({
  product,
  onClose,
  onSuccess,
}) {
  const isEdit = !!product;

  const [form, setForm] = useState({
    name: "",
    category: "",
    material: "",
    width: "",
    height: "",
    depth: "",
    price: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  // =========================
  // 🔥 FIX QUAN TRỌNG
  // =========================
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        category: product.category || "",
        material: product.material || "",
        width: typeof product.width === "string" ? product.width.replace(/[^0-9.]/g, "") : product.width || "",
        height: typeof product.height === "string" ? product.height.replace(/[^0-9.]/g, "") : product.height || "",
        depth: typeof product.depth === "string" ? product.depth.replace(/[^0-9.]/g, "") : product.depth || "",
        price: typeof product.price === "string"
               ? product.price.replace(/,/g, "")
               : product.price || "",
        description: product.description || "",
      });

      setPreview(product.images || []);
    } else {
      // reset khi add mới
      setForm({
        name: "",
        category: "",
        material: "",
        width: "",
        height: "",
        depth: "",
        price: "",
        description: "",
      });
      setPreview([]);
      setImages([]);
    }
  }, [product]);

  // =========================
  // INPUT
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // IMAGE
  // =========================
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );
    setPreview(previewUrls);
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      images.forEach((img) => {
        formData.append("images", img);
      });

      if (isEdit) {
        await updateProduct(product._id, formData);
      } else {
        await createProduct(formData);
      }

      alert(isEdit ? "Cập nhật thành công" : "Thêm thành công");

      onSuccess?.();
    } catch (err) {
      console.error(err);
      alert("Lỗi!");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async () => {
    if (!window.confirm("Xóa sản phẩm này?")) return;

    try {
      await deleteProduct(product._id);
      alert("Đã xóa");

      onSuccess?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xóa");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 bg-white rounded-xl w-[400px]"
    >
      <h2 className="text-lg font-bold">
        {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm"}
      </h2>

      {/* NAME */}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Tên"
        className="w-full px-4 py-2 border rounded"
        required
      />

      {/* PRICE */}
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Giá"
        className="w-full px-4 py-2 border rounded"
        required
      />

      {/* SIZE */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600">Kích thước (cm)</label>
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 ml-1">Rộng</span>
            <input name="width" type="number" value={form.width} onChange={handleChange} placeholder="0" className="border px-2 py-1 rounded"/>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 ml-1">Cao</span>
            <input name="height" type="number" value={form.height} onChange={handleChange} placeholder="0" className="border px-2 py-1 rounded"/>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-gray-400 ml-1">Sâu</span>
            <input name="depth" type="number" value={form.depth} onChange={handleChange} placeholder="0" className="border px-2 py-1 rounded"/>
          </div>
        </div>
      </div>

      {/* CATEGORY */}
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Danh mục"
        className="w-full px-4 py-2 border rounded"
      />

      {/* MATERIAL */}
      <input
        name="material"
        value={form.material}
        onChange={handleChange}
        placeholder="Chất liệu"
        className="w-full px-4 py-2 border rounded"
      />

      {/* DESC */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Mô tả"
        className="w-full px-4 py-2 border rounded"
      />

      {/* IMAGE */}
      <input type="file" multiple onChange={handleImageChange} />

      {/* PREVIEW */}
      <div className="flex gap-2 flex-wrap">
        {preview.map((src, i) => (
          <div key={i} className="relative group">
            <img
              src={src}
              className="w-16 h-16 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => {
                const newPreview = preview.filter((_, index) => index !== i);
                setPreview(newPreview);
                // Lưu ý: việc xóa preview ở đây chỉ ảnh hưởng UI
                // Nếu muốn đồng bộ xóa file thực sự cần API xóa ảnh riêng
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* ACTION */}
      <div className="flex gap-2 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-200 py-2 rounded"
        >
          Hủy
        </button>

        {isEdit && (
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white py-2 rounded"
          >
            Xóa
          </button>
        )}

        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 rounded"
        >
          {isEdit ? "Cập nhật" : "Thêm"}
        </button>
      </div>
    </form>
  );
}