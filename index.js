//express 모듈을 가져옴
const express = require('express')
// 새로운 express 앱을 만듬
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const {User} = require('./models/User');
const cookieParser = require('cookie-parser')
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

//Register Route
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

//login route
app.post('/login', (req, res) => {

    //요청된 이메일을 데이터베이스에서 있는지 찾음
    User.findOne({ email: req.body.email }, (err, userInfo) => {
        if(!userInfo){
            return res.json({
                loginSuccess: false,
                message:"제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
        //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는지를 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.json({loginSuccess: false, message:"비밀번호가 틀렸습니다."})
            //비밀번호 까지 같다면 Token 생성
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                
                // 토큰을 저장함, (쿠키, 로컬스토리지... 등에 저장가능) 지금은 쿠키에 저장
                res.cookie("x_auth",user.token)
                .status(200)
                .json({loginSuccess:true, userId: user._id})

            })
        })
    })   
})

// 포트 5000 에서 실행
app.listen(port, () => console.log(`Example app listening on port ${port}!`))