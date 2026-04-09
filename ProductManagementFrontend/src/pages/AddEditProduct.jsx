import React, { useState, useEffect, useContext } from 'react';
import { ProductContext } from '../Context/ProductContext.jsx';
import { Save, PackagePlus, DollarSign, Tag, ImageIcon, X } from 'lucide-react';

const AddEditProduct = () => {
  const { products, addProduct, updateProduct, isModalOpen, closeModal, modalProductId } = useContext(ProductContext);

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
    if (modalProductId) {
      const existingProduct = products.find(p => p.id === parseInt(modalProductId));
      if (existingProduct) {
        setFormData(existingProduct);
      }
    } else {
      // Reset form when opening to add a new product
      setFormData({
        title: '',
        price: '',
        category: '',
        thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
        description: ''
      });
    }
  }, [modalProductId, products, isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Artificial delay for that "Sleek" processing feel
    setTimeout(() => {
      if (modalProductId) {
        updateProduct(modalProductId, formData);
      } else {
        addProduct(formData);
      }
      setIsSubmitting(false);
      closeModal(); // Head back to inventory by closing the modal
    }, 1000);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={closeModal}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-900/20 overflow-hidden animate-modal-in">
        <div className="bg-slate-900 p-8 text-white flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{modalProductId ? 'Edit Product' : 'New Product'}</h1>
            <p className="text-slate-400 text-sm mt-1">Fill in the details to update your catalog.</p>
          </div>
          <div className="flex items-center gap-4">
            <PackagePlus className="w-10 h-10 text-blue-500 opacity-50 hidden sm:block" />
            <button 
              onClick={closeModal}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
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
                {modalProductId ? 'Update Product' : 'Save Product'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditProduct;