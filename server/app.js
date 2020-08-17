const express =  require('express')
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

//db
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('connected'))
    .catch(err => console.log(err))
//

// app.use(express.json())
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//routes
app.use(require('./routes/Auth'))
app.use(require('./routes/Post'))

const PORT = process.env.PORT || 5000

app.listen(PORT, _ => console.log(`port running on ${ PORT }`))