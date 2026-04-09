import React, { useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext.jsx';
import { ArrowLeft, Star, Tag, Box, Edit3, ShoppingBag, ShieldCheck } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductContext);

  // LOGIC: Find the specific product from the Context array
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-slate-500 mb-4">Product not found.</p>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-2 rounded-xl">
          Return to Inventory
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Catalog
        </button>
        <Link 
          to={`/edit/${product.id}`} 
          className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold transition-all active:scale-95"
        >
          <Edit3 className="w-4 h-4" /> Edit Specifications
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50">
        
        {/* Left: Product Media */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-100">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full h-full object-contain hover:scale-110 transition-transform duration-700" 
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {/* If the API provides more images, you would map them here */}
            {[1,2,3,4].map((i) => (
              <div key={i} className="aspect-square bg-slate-50 border border-slate-100 rounded-xl opacity-40 italic flex items-center justify-center text-[10px]">
                Preview {i}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-500" /> {product.rating}
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
            {product.title}
          </h1>
          <p className="text-slate-500 leading-relaxed mb-8">
            {product.description || "No description provided for this item in the current inventory logs."}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <span className="text-slate-400 text-xs font-bold uppercase">Price Point</span>
              <p className="text-2xl font-black text-slate-900 mt-1">${product.price}</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
              <span className="text-slate-400 text-xs font-bold uppercase">Stock Status</span>
              <p className="text-2xl font-black text-blue-600 mt-1">{product.stock || 24} units</p>
            </div>
          </div>

          {/* Quick Specs List */}
          <div className="space-y-4 border-t border-slate-100 pt-8">
            <div className="flex items-center gap-4 text-slate-700">
              <div className="bg-slate-100 p-2 rounded-lg"><Tag className="w-4 h-4 text-slate-500" /></div>
              <span className="text-sm">Brand: <b className="font-semibold">{product.brand || 'Generic'}</b></span>
            </div>
            <div className="flex items-center gap-4 text-slate-700">
              <div className="bg-slate-100 p-2 rounded-lg"><Box className="w-4 h-4 text-slate-500" /></div>
              <span className="text-sm">SKU: <b className="font-semibold">SM-{product.id}0092</b></span>
            </div>
            <div className="flex items-center gap-4 text-slate-700">
              <div className="bg-slate-100 p-2 rounded-lg"><ShieldCheck className="w-4 h-4 text-slate-500" /></div>
              <span className="text-sm">Warranty: <b className="font-semibold">2 Year Manufacturer</b></span>
            </div>
          </div>

          <button className="mt-auto w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98]">
            <ShoppingBag className="w-5 h-5" />
            Order Restock
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;