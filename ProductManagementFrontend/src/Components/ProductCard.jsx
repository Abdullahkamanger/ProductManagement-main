import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit3, Trash2, Box, Star } from 'lucide-react';
import { ProductContext } from '../Context/ProductContext.jsx';

const ProductCard = ({ product }) => {
  const { deleteProduct } = useContext(ProductContext);

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-slate-700">{product.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {product.category}
          </span>
          <span className="text-xs text-slate-400">ID: #{product.id}</span>
        </div>
        
        <h3 className="font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">${product.price}</span>
          
          <div className="flex gap-1">
            <Link 
              to={`/product/${product.id}`}
              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </Link>
            <Link 
              to={`/edit/${product.id}`}
              className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
              title="Edit Product"
            >
              <Edit3 className="w-4 h-4" />
            </Link>
            <button 
              onClick={() => deleteProduct(product.id)}
              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;