//express 모듈을 가져옴
const express = require('express')
// 새로운 express 앱을 만듬
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require('./models/User');

const config = require('./config/key');

//bodyParser 에서 오는 정보를 서버에서 분석할 수 있도록
//application/x-www-form-urlencoded 를 분석
app.use(bodyParser.urlencoded({extended: true}));
//application/json 을 분석
app.use(bodyParser.json());

//몽고DB 와 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))

// 루트 디렉토리에 오면 출력
app.get('/', (req, res) => res.send('Hello World! 안녕하세요~ 주인님~'))

app.post('/register', (req, res) => {

    //회원 가입 할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.

    const user = new User(req.body)

    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

// 포트 5000 에서 실행
app.listen(port, () => console.log(`Example app listening on port ${port}!`))