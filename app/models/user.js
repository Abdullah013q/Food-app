import mongoose, { Schema } from "mongoose"

const userSchmea = new Schema({
    email: { type: String },
    password: {
        type: String,
        // requried: true,
        // validate: pass=>{
        //     if(!pass?.length || pass?.length < 7){
        //        new Error("Enter password with 7 charater")
        //     }
        // }

    }
}, { timestamps:true},)

// userSchmea.post('validate', function (user) {
//     const password = user.password
//     const salt = bcrypt.genSaltSync(10)
//     user.password = bcrypt.hashSync(password,salt)
    
    
// })

export const User = mongoose.models.User || mongoose.model('User', userSchmea)

