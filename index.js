express=require("express");
const fs= require('fs')
const path = require('path')
const ejs = require('ejs')
const app = express()
const bodyparser= require('body-parser')
const es6Renderer = require('express-es6-template-engine')

const port=5000;


app.use('/static',express.static('static'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded());


app.engine('html',es6Renderer);
app.set('view engine','html');
app.set('views', path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('index.html', params)
  })
  app.listen(port,()=>{
    console.log(`Listening at port ${port}`);
  })

  