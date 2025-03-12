require('dotenv').config();
const express = require('express')
const cors = require('cors')
require('./sequelize/config/sequelize')


const app = express();
const locationRouter = require('./app/routes/location')
const todoRouter = require('./app/routes/todo')

app.use(express.json());
app.use(cors())

app.use('/api/location', locationRouter)
app.use('/api/todo', todoRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
