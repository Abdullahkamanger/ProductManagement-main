import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalProductId, setModalProductId] = useState(null);

    const openModal = (id = null) => {
        setModalProductId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalProductId(null);
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {

                const response = await axios.get("https://product-management-main-backend.vercel.app/products");
                const data = response.data;
                console.log("Fetched products:", data);

                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    const filteredProducts = products.filter((product) => {
        const title = product?.title || "";
        const search = searchTerm || "";
        return title.toLowerCase().includes(search.toLowerCase());
    });
    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
          try{
              const res = await axios.delete(`https://product-management-main-backend.vercel.app/products/${id}`)

            if (res.status === 200) {
                alert("Product deleted successfully!");
                setProducts(prev => prev.filter(p => String(p.id) !== String(id)));
            }
            else { alert("Failed to delete product. Please try again."); }
          } catch (error) {
            console.error("Error deleting product:", error);
            alert("An error occurred while deleting the product.");
          }
        }
    };

    const addProduct = async (newProduct) => {
        try {
            const res = await axios.post("https://product-management-main-backend.vercel.app/products", newProduct);
            setProducts(prev => [...prev, res.data]);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("An error occurred while adding the product.");
        }
    };

    const updateProduct = async (id, updatedData) => {

try{
    const res = await axios.put(`https://product-management-main-backend.vercel.app/products/${id}`, updatedData)
    if (res.status === 200) {
        setProducts(prev => prev.map(p => String(p.id) === String(id) ? res.data : p));
        alert("Product updated successfully!");
    }
    else { alert("Failed to update product. Please try again."); }
}catch (error) {
    console.error("Error updating product:", error);
    alert("An error occurred while updating the product.");
}

      
       



    };


    return (
        <ProductContext.Provider
            value={{
                products,
                filteredProducts,
                deleteProduct,
                addProduct,
                updateProduct,
                loading,
                error,
                searchTerm,
                setSearchTerm,
                isModalOpen,
                modalProductId,
                openModal,
                closeModal,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
