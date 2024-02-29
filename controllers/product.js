const db = require("../db/index.js")
const Product = db.product;


// /product/getproduct?limit=
// /product/getproduct?skip=
exports.handleGetAllProducts = async (req, res) => {
    let limits = {};
    if (req.query.limit) {
        limits = {
            limit: parseInt(req.query.limit)
        }
    }
    if (req.query.skip) {
        limits = {
            ...limits,
            offset: (req.query.skip) ? parseInt(req.query.skip) : 0,
        }
    }

    // let limit = req.query.limit || 3;
    // let offset = req.query.offset || 0;
    try {
        const products = await Product.findAll({ ...limits });
        // console.log("here i am");
        // console.log(products);
        res.status(200).send(products);
    } catch (err) {
        res.send(err)
    }
}

exports.handleGetProductById = async (req, res) => {
    try {
        // console.log(req.params);
        const product = await Product.findByPk(req.params.id)
        if (!product)
            return res.status(400).send({ message: "Product not found" });
        return res.send(product);
    } catch (err) {
        return res.send(err);
    }
}


exports.handleAddProduct = async (req, res) => {
    if (req.role === 'user') {
        return res.status(403).send({ message: "You do not have permission to perform this action." });
    }
    try {
        // console.log("lol");
        const product = await Product.create(req.body);
        // console.log(product);
        // await product.save();
        return res.status(201).send({ message: "Successfully added product.", product })
    } catch (err) {
        console.log(err);
        return res.send(err);
    }
}



// only send updated fields which are changed for better experiance 
exports.handleProductUpdate = async (req, res) => {
    if (req.role === 'user') {
        return res.status(403).send({ message: "You do not have permission to perform this action." });
    }
    try {
        const updates = req.body;
        // console.log(updates);
        const test = await Product.update(updates, {
            where: { id: req.params.id }
        });
        // console.log(test);
        if (test[0] === 0)
            return res.status(400).send({ message: "product not exist" });
        return res.send("updated fields successfully");
    } catch (err) {
        return res.send(err);
    }
}



exports.handleProductDelete = async (req, res) => {
    if (req.role === 'user') {
        return res.status(403).send({ message: "You do not have permission to perform this action." });
    }
    try {
        const test = await Product.destroy({
            where: {
                id: req.params.id
            }
        });
        // console.log(test);
        if (test === 0)
            return res.status(400).send({ message: "product already deleted" });
        return res.send("product deleted successfully");
    } catch (err) {
        return res.send(err);
    }
}


