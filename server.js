const express = require('express')
const cors = require('cors')
const app = express()
const AuthRoute = require('./Routes/AuthRoutes')
const CompanyRoute = require('./Routes/CompanyRoutes')
const CandidateRoute = require('./Routes/CandidateRoute')
const {companyAdmin, superAdmin} = require('./Middleware/Auth')
const dotenv = require('dotenv')
dotenv.config()

app.get('/super', superAdmin,(req, res) => res.send('SuperAdminRoute'))
app.get('/company', companyAdmin,(req, res) => res.send('SuperAdminRoute'))

app.use(express.json())
app.use(cors())
app.use('/api/auth',AuthRoute)
app.use('/api/comp',CompanyRoute)
app.use('/api/cand',CandidateRoute)


app.listen(process.env.PORT, '192.168.18.210', () => {
    console.log('berhasil')
})