import AccessoryCard from "./AccessoryCard";

export default function AccessoryGrid({ accessories = [] }) {
  if (!accessories.length) {
    return (
      <div className="col-span-full text-center py-12 text-on-surface-variant">
        <p>Chưa có dữ liệu phụ kiện</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {accessories.map((item) => (
        <AccessoryCard key={item._id || item.id} accessory={item} />
      ))}
    </div>
  );
}