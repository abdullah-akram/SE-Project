const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const User = require('./model/user')
const encrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost:27017/reglog-db',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const app = express()
app.use('/',express.static(path.join(__dirname,'static')))
app.use(express.json())

app.post('/api/register',async(req,res) =>{
    console.log(req.body)

    const {username,email,password: plainTextPassword} = req.body
    
    const password = await encrypt.hash(plainTextPassword,15)
    
    try{
        const response = await User.create({
            username,
            email,
            password
        })
        console.log('User created successfully: ',response)
    } catch (error) {
        console.log(error.message)
        return res.json({ status: 'error'})
    }
    //console.log(await encrypt.hash(password,15))
    //encrypt.hash()

    res.json({ status: 'ok' })
})

app.listen(9999, () => {
    console.log('Server up at 9999')
})