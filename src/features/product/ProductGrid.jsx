import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], onEdit, onView  }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      
      {products.length === 0 ? (
        <div className="col-span-full text-center py-20 text-slate-400">
          Không có sản phẩm nào
        </div>
      ) : (
        products.map((item) => (
          <ProductCard
            key={item._id}
            product={{
              ...item,
              image: item.images?.[0] || "https://via.placeholder.com/300",
              price: item.price?.toLocaleString(),
              width: item.width ? `${item.width}cm` : "-",
              height: item.height ? `${item.height}cm` : "-",
              depth: item.depth ? `${item.depth}cm` : "-",
            }}
            onEdit={onEdit}
            onView={onView} 
          />
        ))
      )}

    </div>
  );
}