import ProductionCard from "./ProductionCard";

const mockData = [
  {
    id: 1,
    code: "01",
    name: "Bàn Ăn Gỗ Sồi Nordic",
    orderCode: "#ORD-2024-001",
    size: "1800 x 900 x 750 mm",
    material: "Gỗ Sồi Nga",
    status: "completed",
    image: "https://i.pravatar.cc/300",
  },
  {
    id: 2,
    code: "02",
    name: "Tủ Áo Cánh Kính",
    orderCode: "#ORD-2024-002",
    size: "2400 x 2800 mm",
    material: "MDF",
    status: "urgent",
    image: "https://i.pravatar.cc/301",
  },
  {
    id: 3,
    code: "03",
    name: "Giường Luxury",
    orderCode: "#ORD-2024-003",
    size: "1800 x 2000 mm",
    material: "Gỗ Óc Chó",
    status: "pending",
    image: "https://i.pravatar.cc/302",
  },
];

const ProductionGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockData.map((item) => (
        <ProductionCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ProductionGrid;