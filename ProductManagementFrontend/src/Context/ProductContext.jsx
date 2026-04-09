import { createContext, useState, useEffect } from "react";

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

                const response = await fetch("https://dummyjson.com/products");
                const data = await response.json();


                setProducts(data.products);
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
    const deleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {

            setProducts(prev => prev.filter(p => p.id !== id));
        }
    };

    const addProduct = (newProduct) => {
        setProducts(prev => {
            const nextId = prev.length > 0 ? Math.max(...prev.map(p => p.id)) + 1 : 1;
            const product = { ...newProduct, id: nextId };
            return [product, ...prev];
        });
    };

    const updateProduct = (id, updatedData) => {
        setProducts(prev => prev.map(p => p.id === parseInt(id) ? { ...p, ...updatedData } : p));
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