import Product from "../modals/product.js";
import productdata from "../data/ProductData.js";

// Fetch all products from MongoDB
export const getProducts = async (req, res) => {
    try {
        // const products = await Product.find({});
        res.status(200).json(productdata);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
}

// Fetch a single product by ID
export const getProductById = async (req, res) => {
    try {
        // const product = await Product.findById(req.params.id);
        const product = productdata.find((item) => item.id == req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
}  

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { title, price, description, category, thumbnail } = req.body;
        // const newProduct = await Product.create({
        //     title,
        //     price,
        //     description,
        //     category,
        //     thumbnail
        // });
        const newProduct = {
            id: productdata.length + 1,
            title,
            price,
            description,
            category,
            thumbnail
        }
        productdata.push(newProduct);
        res.status(201).json({newProduct:newProduct,message:"Product created successfully"});
    } catch (error) {
        res.status(400).json({ message: "Error creating product", error: error.message });
    }
}

// Update an existing product
export const updateProductById = async (req, res) => {
    try {
        // const updatedProduct = await Product.findByIdAndUpdate(
        //     req.params.id, 
            // req.body, 
            // { new: true, runValidators: true }
        // );
        const updatedProduct = productdata.find((item) => item.id == req.params.id);
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        updatedProduct.title = req.body.title || updatedProduct.title;
        updatedProduct.price = req.body.price || updatedProduct.price;
        updatedProduct.description = req.body.description || updatedProduct.description;
        updatedProduct.category = req.body.category || updatedProduct.category;
        updatedProduct.thumbnail = req.body.thumbnail || updatedProduct.thumbnail;
        // productdata[req.params.id] = updatedProduct;
        res.status(200).json({updatedProduct:updatedProduct,message:"Product updated successfully"});
    } catch (error) {
        res.status(400).json({ message: "Error updating product", error: error.message });
    }
}

// Delete a product
export const deleteProductById = async (req, res) => {
    try {
        // const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        const idx = productdata.findIndex((item) => item.id == req.params.id);
        if (idx == -1) {
            return res.status(404).json({ message: "Product not found" });
        }
        productdata.splice(idx, 1);
        res.status(200).json({ message: "Product deleted successfully" }); 
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
}
