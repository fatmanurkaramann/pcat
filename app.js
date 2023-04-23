const express = require('express')

const app = express()

app.get('/',(req,res)=>{

    const photo={
        id:1,
        name:"photo name",
        description:"photo desc"
    }
    res.send(photo.name)
})

const port = 3000
app.listen(port, () => {
    console.log(`sunucu ${port} portunda başladı`)
})