const mongoose = require('mongoose')

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
    tokenExp:{
        type:Number
    }

})

const User = mongoose.model('User', userSchema)

//다른곳에서도 사용가능하도록 저장
module.exports = {User}