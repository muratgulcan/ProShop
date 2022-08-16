const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const morgan = require('morgan')
const {notFound,errorHandler} = require('./middleware/errorMiddleware')

dotenv.config()
connectDB()
const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

app.use(express.json())

app.get('/', (req,res) => {
    res.send('API is running')
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)

app.use('/uploads',express.static(path.join(path.resolve(),'/uploads')))
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 4201
app.listen(PORT,console.log(`Server running on port ${PORT}`))