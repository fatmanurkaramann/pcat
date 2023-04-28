const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const fileUpload = require('express-fileupload');
const ejs = require('ejs')
const photoController = require('./controllers/photoControllers')
const pageController = require('./controllers/pageController')

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
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}))


app.get('/about', pageController.getAboutPage)
app.get('/add-photo', pageController.getAddPage)

app.get('/', photoController.getAllPhotos)

app.get('/photos/:id', photoController.getPhoto)

app.post('/photos', photoController.createPhoto)

app.put('/photos/:id', photoController.updatePhoto)

app.delete('/photos/:id', photoController.deletePhoto)


app.get('/photos/edit/:id', pageController.getEditPage)
const port = 3000
app.listen(port, () => {
    console.log(`sunucu ${port} portunda başladı`)
})