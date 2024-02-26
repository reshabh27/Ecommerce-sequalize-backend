



module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define("Product", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            trim: true
        },
        description: {
            type: DataTypes.STRING,
            trim: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        currentStock: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productImg: {
            type: DataTypes.STRING,
            trim: true
        },
    })
    return Product;
}

























// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
// title : {
//     type : String,
//     required : true,
//     trim: true
// },
// description : {
//     type : String,
//     trim: true
// },
// price : {
//     type : Number,
//     required : true,
// },
// currentStock : {
//     type : Number,
//     required : true,
// },
// productImg : {
//     type : String,
//     trim: true
// },
// })




// const Product = mongoose.model('Product',productSchema);

// module.exports = Product;