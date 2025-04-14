
import bcrypt from "bcryptjs";
import { User } from "../schema/users.schema.js";
export const usersService = async (user) => {
    try {
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
        const data = await User.create(user)
        return data
    } catch(err) {
        throw new Error(err.message)
    }
}

export const usersLoginService = async (email) => {
    try {
       return await User.findOne({email})
    } catch(err) {
        throw new Error(err.message)
    }
}