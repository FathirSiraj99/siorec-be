const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT, '192.168.18.210', () => {
    console.log('berhasil')
})