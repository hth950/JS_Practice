//express 모듈을 가져옴
const express = require('express')
// 새로운 express 앱을 만듬
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Hwang:xoghks1@boilerplate.wunuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))



// 루트 디렉토리에 오면 출력
app.get('/', (req, res) => res.send('Hello World! 안녕하세요~'))

// 포트 5000 에서 실행
app.listen(port, () => console.log(`Example app listening on port ${port}!`))