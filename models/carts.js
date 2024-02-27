


module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define("Cart", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER
        },

    })
    return Cart;
}





// const mongoose = require('mongoose');

// const cartSchema = new mongoose.Schema({
// products:[
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product'
//     }
// ],
// owner : {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: 'User'
// }
// })

// const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;