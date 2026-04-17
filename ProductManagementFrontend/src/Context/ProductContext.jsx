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

                const response = await axios.get("http://localhost:3000/products");
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


    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const deleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
          try{
              const res = await axios.delete(`http://localhost:3000/products/${id}`)

            if (res.status === 200) {
                alert("Product deleted successfully!");
                setProducts(prev => prev.filter(p => p.id !== id));
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
            const res = await axios.post("http://localhost:3000/products", newProduct);
            setProducts(prev => [...prev, res.data]);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("An error occurred while adding the product.");
        }
    };

    const updateProduct = async (id, updatedData) => {

try{
    const res = await axios.put(`http://localhost:3000/products/${id}`, updatedData)
    if (res.status === 200) {
        setProducts(prev => prev.map(p => p.id === id ? res.data : p));
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