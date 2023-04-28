const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const fileUpload = require('express-fileupload');
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
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
app.use(fileUpload());
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
    const photos = await Photo.find().sort('-dateCreated')
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

app.get('/photos/:id', async (req, res) => {
    //console.log(req.params.id)
    const photo = await Photo.findById(req.params.id)
    res.render('photoDetail', { photo })
})
app.post('/photos', async (req, res) => {

    const uploadDir='public/uploads'
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir)
    }
    let uploadedImage=req.files.image
    let uploadPath=__dirname+'/public/uploads/'+ uploadedImage.name

    uploadedImage.mv(uploadPath,
        async ()=>{
            await Photo.create({...req.body,
            image:'/uploads/'+ uploadedImage.name
            })
        }
        )

  
    res.redirect('/')
})
app.get('/photos/edit/:id',async (req, res) => {
    const photo = await Photo.findById(req.params.id)
    res.render('edit',{photo})
})
app.put('/photos/:id',async(req,res)=>{
    const photo=await Photo.findOne({_id:req.params.id})
    await Photo.findByIdAndUpdate(photo, {
        title: req.body.title,
        description:req.body.description
    })
    photo.save()
    res.redirect(`/photos/${req.params.id}`)
})
const port = 3000
app.listen(port, () => {
    console.log(`sunucu ${port} portunda başladı`)
})