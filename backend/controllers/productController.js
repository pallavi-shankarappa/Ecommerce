import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Add Product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    const canUseCloudinary =
      Boolean(process.env.CLOUDINARY_NAME) &&
      Boolean(process.env.CLOUDINARY_API_KEY) &&
      Boolean(process.env.CLOUDINARY_SECRET_KEY);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        if (canUseCloudinary) {
          try {
            const result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
            return result.secure_url;
          } catch (error) {
            console.error("Cloudinary Upload Error, falling back to local:", error);
            return item.filename || item.originalname;
          }
        }
        return item.filename || item.originalname;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" || bestseller === true,
      sizes: typeof sizes === "string" ? JSON.parse(sizes) : sizes,
      image: imagesUrl,
      date: Date.now()
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.error("❌ Controller Add Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List Products
const listProducts = async (req, res) => {
  console.log("📥 GET /api/product/list called");
  try {
    const products = await productModel.find({}).sort({ date: -1 });
    console.log(`✅ Found ${products.length} products`);
    res.json({ success: true, products });
  } catch (error) {
    console.error("❌ Controller List Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove Product
const removeProduct = async (req, res) => {
  try {
    const id = req.body.id || req.params.id;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error("❌ Controller Remove Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const id = req.params.id || req.body.productId;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error("❌ Controller Single Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

console.log("✅ Product Controller Loaded");

export { addProduct, listProducts, removeProduct, getProductById };
