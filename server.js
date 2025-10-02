const express = require('express');
require('./config/database');
const cors = require('cors')
const userRouter = require('./routers/userRouter');
const restaurantRouter = require('./routers/restaurantRouter');
const categoryRouter = require('./routers/categoryRouter');
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(restaurantRouter);
app.use(categoryRouter);

app.listen(PORT, ()=>{
    console.log(`App is listening to PORT: ${PORT}`);
});
