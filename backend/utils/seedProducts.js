import mongoose from "mongoose";
import dotenv from "dotenv";
import { sampleProducts } from "../data/sampleProducts.js";
import productModel from "../models/productModel.js";
import connectDB from "../config/mongodDB.js";

dotenv.config();

const seedProducts = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await connectDB();

    console.log("⏳ Clearing existing products...");
    await productModel.deleteMany({});
    console.log("✅ Existing products removed.");

    console.log(`⏳ Inserting ${sampleProducts.length} sample products...`);
    await productModel.insertMany(sampleProducts);
    console.log("✅ Sample products seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error.message);
    process.exit(1);
  }
};

seedProducts();
