const express = require('express')
const mongoose = require('mongoose')
const ejs = require('ejs')
const path = require('path')
const Photo=require('./models/Photo')

const app = express();

mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set("view engine", "ejs");

//middle wares
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index')
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('/add-photo', (req, res) => {
    res.render('add')
})
app.post('/photos', (req, res) => {
   console.log(req.body)
   res.redirect('/')
})

const port = 3000
app.listen(port, () => {
    console.log(`sunucu ${port} portunda başladı`)
})