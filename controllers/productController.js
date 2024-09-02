import productModel from "../models/productModel.js"
import fs from "fs"
import slugify from "slugify"

export const createProductController = async (req, res) => {
    try {
        const { name, price, description, category, quantity, shipping } = req.fields
        const { photo } = req.files
        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is required" })
            case !price:
                return res.status(500).send({ error: "price is required" })
            case !description:
                return res.status(500).send({ error: "description is required" })
            case !category:
                return res.status(500).send({ error: "category is required" })
            case !quantity:
                return res.status(500).send({ error: "quantity is required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo size is too large" })
        }
        // create product
        const products = new productModel({ ...req.fields , slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.contentType
        }
        await products.save()
        res.status(201).send({
            success:true,
            message: "product created successfully",
            products,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error creating product"
        });
    }
};

// get all product
export const getProductController = async (req, res) => {
    try {
        const products = await productModel
        .find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({createdAt:-1});
        res.status(200).send({
            success:true,
            counTotal: products.length,
            message:"All Product",
            products,
            });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message :"Error in gettting product",
            error: error.messsage,
            });
    }
};

export const getSingleProductController = async(req,res) =>{
    try {
        const product = await productModel
        .findOne({slug:req.params.slug})
        .select("-photo")
        .populate("category");
        res.status(200).send({
            success:true,
            message:"Single Product",
            product,
            });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message :"Error in gettting single product",
            error,
        });
    }
};

// get photo
export const productPhotoController = async(req,res)=>{
    try {
        const  product = await productModel.findById(req.params.pid).select("photo");
        res.set("Content-type" , product.photo.contentType)
        return res.status(200).send(produc.photo.data);

    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr while getting photo",
          error,
        });
    }
}

// update controller
export const updateProductController = async (req, res) => {
    try {
        const { name, price, description, category, quantity, shipping } = req.fields
        const { photo } = req.files
        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is required" })
            case !price:
                return res.status(500).send({ error: "price is required" })
            case !description:
                return res.status(500).send({ error: "description is required" })
            case !category:
                return res.status(500).send({ error: "category is required" })
            case !quantity:
                return res.status(500).send({ error: "quantity is required" })
            case photo && photo.size > 1000000:
                return res.status(500).send({ error: "photo size is too large" })
        }
        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields , slug:slugify(name) },
            { new: true }
        );

        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.contentType
        }
        await products.save()
        res.status(201).send({
            success:true,
            message: "product updated successfully",
            products,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in updating product"
        });
    }
};

// delete product
export const deleteProductController = async (req,res) =>{
    try {
      await productModel.findByIdAndDelete(req.params.pid).select("-photo")
      res.status(200).send({success:true,message:"product deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error in deleting product"
            });
    }
}
