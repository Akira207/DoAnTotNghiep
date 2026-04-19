export default function AccessoryCard({ accessory }) {
  return (
    <div className="group bg-surface-container-lowest rounded-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 relative">
      
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
        <img
          src={accessory.image}
          alt={accessory.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          
          {/* SKU */}
          <span className="text-[10px] font-bold tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-sm">
            SKU: {accessory.sku}
          </span>

          {/* Edit button */}
          <button className="text-slate-300 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">
              edit_note
            </span>
          </button>
        </div>

        {/* Name */}
        <h3 className="font-bold text-on-surface text-lg leading-tight group-hover:text-primary transition-colors">
          {accessory.name}
        </h3>
      </div>
    </div>
  );
}