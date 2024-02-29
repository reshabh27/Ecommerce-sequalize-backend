const express = require('express');
const userRouter = require('./routes/user')
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
require('./db');
const app = express();

app.use(express.json())


// app.get('/', "hello world");
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/cart', cartRouter);

// error handling for undefined routes
app.all('*', (req, res, next) => {
    res.status(400).send({ status: 'fail', message: `can't find ${req.originalUrl} on the server!` })
})

// app.get('/', function (req, res) {
//     res.send('Hello World')
// })





app.listen(5000, () => {
    console.log("server started at 5000");
})