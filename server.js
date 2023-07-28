const express = require('express')
const cors = require('cors')
const app = express()
const AuthRoute = require('./Routes/AuthRoutes')
const CompanyRoute = require('./Routes/CompanyRoutes')
const CandidateRoute = require('./Routes/CandidateRoute')
const { Prisma, PrismaClient, role } = require('@prisma/client')
const Role = Prisma.role
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.use('/api/auth',AuthRoute)
app.use('/api/comp',CompanyRoute)
app.use('/api/cand',CandidateRoute)

app.listen(process.env.PORT, '192.168.18.210', () => {
    console.log('berhasil')
})