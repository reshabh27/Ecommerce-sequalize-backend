const db = require("../db/index.js")
const User = db.user
const Product = db.product;
const Cart = db.cart;

exports.handleGetCartOfUser = async (req, res) => {
    try {
        let curcart = await User.findByPk(req.user.id,
            {
                include: [{
                    model: Product,
                    through: { model: Cart, },
                }],
            })
        console.log(curcart);
        if (!curcart)
            return res.send([]);
        return res.status(200).send(curcart);
    } catch (err) {
        console.log(err);
        return res.status(400).send();
    }
}


exports.handleAddProductInCart = async (req, res) => {
    // const oldProducts = await Cart.findOne({ owner: req.user._id });
    // // console.log(oldProducts);
    // if (oldProducts?.products?.includes(req.params.productId)) {
    //     return res.status(400).send({ error: 'Product is already in the cart' });
    // }
    try {
        // if (!oldProducts) {
        //     const cart = new Cart({
        //         products: [req.params.productId],
        //         owner: req.user._id
        //     });
        //     await cart.save();
        // }
        // else
        //     await Cart.findByIdAndUpdate(oldProducts._id, { products: [...oldProducts.products, req.params.productId] })
        // console.log(test);
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