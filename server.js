const express = require('express');
require('./config/database');
const cors = require('cors')

const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const restaurantRouter = require('./routers/restaurantRouter');
const categoryRouter = require('./routers/categoryRouter');
const transactionRouter = require('./routers/transactionRouter');
const cartRouter = require('./routers/cartRouter');
const orderRouter = require('./routers/orderRouter');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(productRouter);
app.use(restaurantRouter);
app.use(categoryRouter);
app.use(transactionRouter);
app.use(cartRouter);
app.use(orderRouter);

app.listen(PORT, ()=>{
    console.log(`App is listening to PORT: ${PORT}`);
});
