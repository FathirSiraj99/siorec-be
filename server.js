const express = require('express')
const cors = require('cors')
const app = express()
const AuthRoute = require('./Routes/AuthRoutes')
const CompanyRoute = require('./Routes/CompanyRoutes')

app.use(express.json())
app.use(cors())

app.use('/api/auth',AuthRoute)
app.use('/api/comp',CompanyRoute)

app.listen(process.env.PORT, '192.168.18.210', () => {
    console.log('berhasil')
})