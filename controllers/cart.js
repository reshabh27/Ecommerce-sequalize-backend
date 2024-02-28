const db = require("../db/index.js")
const User = db.user
const Product = db.product;
const Cart = db.cart;

exports.handleGetCartOfUser = async (req, res) => {
    try {
        // 1st method to get values of many to many associated tables
        // let curcart = await User.findByPk(req.user.id,
        //     {
        //         include: [{
        //             model: Product,
        //             through: { model: Cart, },
        //         }],
        //     })


        // 2nd method to get values from many to many associated tables.
        let data = await User.findOne({
            where: {
                id: req.user.id
            }
        })
        let curcart = await data.getProducts();


        // console.log("data", data);
        // console.log("curcart", curcart);
        if (!curcart)
            return res.send([]);
        return res.status(200).send({ data, cart: curcart });
    } catch (err) {
        console.log(err);
        return res.status(400).send();
    }
}


exports.handleAddProductInCart = async (req, res) => {
    try {
        const newProduct = await Cart.create({ UserId: req.user.id, ProductId: req.params.productId, quantity: 1 });
        // console.log(newProduct);
        return res.status(200).send({ message: "succesfully added product in cart", newProduct });
    } catch (err) {
        return res.send(err);
    }
}

exports.handleDeleteProductInCart = async (req, res) => {
    const productId = req.params.productId;
    // console.log(productId);
    try {
        const oldCart = await Cart.findOne({ owner: req.user._id });
        if (!oldCart) {
            return res.status(404).send({ error: 'Cart not found' });
        }

        // Use $pull to remove the specified productId from the products array
        await Cart.findByIdAndUpdate(oldCart._id, { $pull: { products: productId } });
        res.send(`successfully deleted product ${productId}`);
    } catch (err) {
        return res.send(err);
    }
}