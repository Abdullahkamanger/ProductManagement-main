import productdata from "../data/ProductData.js";


export const getProducts = (req, res) => {
    res.json(productdata);
}

export const getProductById = (req,res) => {





    // const id = parseInt(req.params.id);
    // const product = productdata.find(p => p.id === id);
    // if (!product) {
    //     return res.status(404).json({ message: "Product not found" });
    // }
    // res.json(product);
}  

export const createProduct = (req,res) => {
    const {title, price, description} = req.body;
    const newProduct = {
        id: productdata.length + 1,
        title,
        price,
        description
    };
    productdata.push(newProduct);
    res.status(201).json(newProduct);
}



export const updateProductById = (req,res) => {
    const id = parseInt(req.params.id);
    const productIndex = productdata.findIndex(p => p.id === id);
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }
    const updatedProduct = { ...productdata[productIndex], ...req.body };


    productdata[productIndex] = updatedProduct;


    res.json(updatedProduct);
}


export const deleteProductById = (req,res) => {
    const id = parseInt(req.params.id);
    const productIndex = productdata.findIndex(p => p.id === id);
    if (productIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }
    productdata.splice(productIndex, 1);
    res.json({ message: "Product deleted successfully" }); 
}