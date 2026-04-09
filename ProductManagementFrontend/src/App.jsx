// App.jsx
import { Routes, Route } from "react-router-dom";
import { ProductProvider } from "./Context/ProductContext.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AddEditProduct from "./pages/AddEditProduct.jsx";
import Navbar from "./Components/Navbar.jsx";


function App() {
  return (
    <ProductProvider>
      <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
          <AddEditProduct />
        </div>
    
    </ProductProvider>
  );
}

export default App;