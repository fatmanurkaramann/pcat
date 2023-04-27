const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const path = require('path')
const Photo = require('./models/Photo')

const app = express();

mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set("view engine", "ejs");

//middle wares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
    const photos = await Photo.find()
    res.render('index', {
        photos: photos
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add-photo', (req, res) => {
    res.render('add')
})
app.get('/photos/:id',async (req, res) => {
    //console.log(req.params.id)
    const photo = await Photo.findById(req.params.id)
    res.render('photoDetail', { photo })
})
app.post('/photos', async (req, res) => {
    await Photo.create(req.body)
    res.redirect('/')
})

const port = 3000
app.listen(port, () => {
    console.log(`sunucu ${port} portunda başladı`)
})