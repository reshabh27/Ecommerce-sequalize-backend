const express = require('express');
const userRouter = require('./routes/user')
const productRouter = require('./routes/product');
require('./db');
const app = express();

app.use(express.json())


// app.get('/', "hello world");
app.use('/api/v1/user', userRouter);
app.use('/api/v1/product', productRouter);

// app.get('/', function (req, res) {
//     res.send('Hello World')
// })





app.listen(5000, () => {
    console.log("server started at 5000");
})