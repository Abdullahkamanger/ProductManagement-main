import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductContext } from '../Context/ProductContext.jsx';
import { Save, ArrowLeft, PackagePlus, DollarSign, Tag, ImageIcon, CheckCircle2 } from 'lucide-react';

const AddEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useContext(ProductContext);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // LOGIC: Check if we are in "Edit Mode"
  useEffect(() => {
    if (id) {
      const existingProduct = products.find(p => p.id === parseInt(id));
      if (existingProduct) {
        setFormData(existingProduct);
      }
    }
  }, [id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Artificial delay for that "Sleek" processing feel
    setTimeout(() => {
      if (id) {
        updateProduct(id, formData);
      } else {
        addProduct(formData);
      }
      setIsSubmitting(false);
      navigate('/'); // Head back to inventory
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 animate-in fade-in zoom-in-95 duration-500">
      {/* Header */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Inventory
      </button>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{id ? 'Edit Product' : 'New Product'}</h1>
            <p className="text-slate-400 text-sm mt-1">Fill in the details to update your catalog.</p>
          </div>
          <PackagePlus className="w-10 h-10 text-blue-500 opacity-50" />
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-400" /> Product Name
            </label>
            <input
              required
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Wireless Headphones"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Price Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-400" /> Price
              </label>
              <input
                required
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Category Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-slate-400" /> Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
              >
                <option value="">Select Category</option>
                <option value="smartphones">Smartphones</option>
                <option value="laptops">Laptops</option>
                <option value="fragrances">Fragrances</option>
                <option value="skincare">Skincare</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                {id ? 'Update Product' : 'Save Product'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;