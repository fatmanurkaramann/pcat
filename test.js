const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb://localhost/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//create schema
const photoSchema = new Schema({
    title: String,
    description: String
})

const Photo = mongoose.model('Photo', photoSchema)

//create a photo

// Photo.create({
//     title: 'Photo title1',
//     description: 'Photo description1'
// })
// Photo.create({
//     title: 'Photo title2',
//     description: 'Photo description2'
// })

//read a photo

Photo.find()
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });

//update a photo
const id = "6446c453ff8b86a1dce7a4f5"

Photo.findByIdAndUpdate(id, {
    title: 'Photo title updated',
    description: 'Photo desc updated'
},{
    new:true
}).then(data => {
    console.log(data)
})
.catch(err=>{
    console.log(err)
})

//delete a photo

// Photo.findByIdAndDelete(id)
// .then(data=>{
//     console.log(data)
// })
// .catch(err=>{
//     console.log(err)
// })
