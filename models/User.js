const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//salt 가 몇 글자인지 저장
const saltRounds = 10;
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,//빈칸을 없애주는 역할
        unique: 1// 똑같은 이메일은 사용 못하도록
    },
    password:{
        type: String,
        minlength : 5
    },
    lastname: {
        type : String,
        maxlength : 50
    },
    role:{
        type: Number,
        default: 0
    },
    image: String,
    token:{ //유효성 관리
        type: String
    },
    tokenExp:{ // 유효성 기간
        type:Number
    }

})


userSchema.pre('save', function( next ){

    var user = this;
    if(user.isModified('password')){
        //비밀번호 암호화 작업
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()    
            })
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){ 
    //plainPassword 1234567 , 암호화된 비밀번호 $2b$10$OeScATyXyyxPVz6x35uwN.RJr71bN/NS6HbPmGDhso.f0xQv226UC
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err),
        cb(null, isMatch)
    })

}

userSchema.methods.generateToken = function(cb){
    var user = this;
    //jsonwebtoken 을 이용해서 토큰 생성하기
    var token = jwt.sign(user._id,'secretToken')

    user.token = token
    user.save(function(err, user){
        if (err) return cb(err)
        cb(null, user)
    })
}

const User = mongoose.model('User', userSchema)

//다른곳에서도 사용가능하도록 저장
module.exports = {User}