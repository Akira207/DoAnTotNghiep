import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export default function AddOrderForm({ onClose, onSuccess }) {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [note, setNote] = useState("");

  // 💰 PAYMENT
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  // 💸 DISCOUNT
  const [discount, setDiscount] = useState(0);

  const [items, setItems] = useState([
    {
      productId: "",
      quantity: 1,
      price: 0,
      source: "production",
    },
  ]);

  // LOAD DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, pRes] = await Promise.all([
          axios.get(`${API}/customers`),
          axios.get(`${API}/products`),
        ]);

        // Handle both response formats: direct array or { data: [...] }
        const customersData = Array.isArray(cRes.data) ? cRes.data : (cRes.data?.data || []);
        const productsData = Array.isArray(pRes.data) ? pRes.data : (pRes.data?.data || []);
        
        setCustomers(customersData);
        setProducts(productsData);
      } catch (err) {
        console.log("LOAD ERROR:", err);
        setCustomers([]);
        setProducts([]);
      }
    };

    fetchData();
  }, []);

  // UPDATE ITEM
  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    if (field === "productId") {
      const product = products.find((p) => p._id === value);
      newItems[index].price = product?.price || 0;
    }

    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { productId: "", quantity: 1, price: 0, source: "production" },
    ]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // TOTAL FRONT (preview)
  const subtotal = items.reduce(
    (sum, i) => sum + (i.quantity || 0) * (i.price || 0),
    0
  );

  const vat = subtotal * 0.1;
  const totalPreview = subtotal + vat - Number(discount || 0);

  // SUBMIT
  const handleSubmit = async () => {
    try {
      if (!customerId) return alert("Chọn khách hàng");

      if (items.some((i) => !i.productId)) {
        return alert("Chọn đủ sản phẩm");
      }

      const cleanItems = items.map((i) => ({
        ...i,
        quantity: Number(i.quantity),
        price: Number(i.price),
      }));

      const payload = {
        customerId,
        note,
        products: cleanItems,
        discount: Number(discount || 0), 
      };

      if (paymentAmount && Number(paymentAmount) > 0) {
        payload.payment = {
          amount: Number(paymentAmount),
          method: paymentMethod,
          type: "deposit",
        };
      }

      console.log("PAYLOAD:", payload);

      const res = await axios.post(
        `${API}/orders/create-full-order`,
        payload
      );

      alert("Tạo đơn thành công!");
      onSuccess?.(res.data);
      onClose?.();
    } catch (err) {
      console.log(err);
      alert("Lỗi tạo đơn hàng");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl rounded-lg p-6 max-h-[90vh] overflow-y-auto">

        <h2 className="text-xl font-bold mb-4">
          Tạo đơn hàng mới
        </h2>

        {/* CUSTOMER */}
        <select
          className="w-full border p-2 rounded mb-3"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        >
          <option value="">Chọn khách hàng</option>
          {customers.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* ITEMS */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border p-3 rounded space-y-2">

              <select
                className="w-full border p-2 rounded"
                value={item.productId}
                onChange={(e) =>
                  updateItem(index, "productId", e.target.value)
                }
              >
                <option value="">Chọn sản phẩm</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <div className="flex gap-2">

                <input
                  type="number"
                  className="border p-2 w-1/3 rounded"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, "quantity", +e.target.value)
                  }
                  placeholder="Số lượng"
                />

                <select
                  className="border p-2 w-1/3 rounded"
                  value={item.source}
                  onChange={(e) =>
                    updateItem(index, "source", e.target.value)
                  }
                >
                  <option value="production">Sản xuất</option>
                  <option value="warehouse">Kho</option>
                </select>

                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500"
                >
                  Xóa
                </button>
              </div>

              <div className="text-sm text-gray-500">
                Giá: {item.price.toLocaleString()}đ
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addItem}
          className="mt-3 text-blue-600"
        >
          + Thêm sản phẩm
        </button>

        {/* NOTE */}
        <textarea
          className="w-full border p-2 rounded mt-3"
          placeholder="Ghi chú"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        {/* DISCOUNT */}
        <div className="mt-3">
          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Giảm giá (VNĐ)"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </div>

        {/* PAYMENT */}
        <div className="mt-3 space-y-2">

          <input
            type="number"
            className="w-full border p-2 rounded"
            placeholder="Tiền đặt cọc"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Tiền mặt</option>
            <option value="bank">Chuyển khoản</option>
          </select>
        </div>

        {/* PREVIEW TOTAL */}
        <div className="mt-4 font-bold text-right">
          Tạm tính: {totalPreview.toLocaleString()}đ
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2 mt-4">

          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Hủy
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Tạo đơn
          </button>

        </div>
      </div>
    </div>
  );
}