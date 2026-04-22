import ProductionCard from "./ProductionCard";

const ProductionGrid = ({ tasks = [], onDetail }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {tasks.length === 0 ? (
        <div className="col-span-2 text-center text-slate-500 py-10">
          Không có lệnh sản xuất
        </div>
      ) : (
        tasks.map((item) => (
          <ProductionCard
            key={item._id}
            item={item}
            onDetail={onDetail}
          />
        ))
      )}

    </div>
  );
};

export default ProductionGrid;