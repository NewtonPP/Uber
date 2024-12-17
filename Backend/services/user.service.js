import { UserModel } from "../models/user.model.js";

export const CreateUser = async ({FirstName, LastName, Email, Password}) =>{
    if (!FirstName || !LastName || !Email || !Password ){
        throw new Error ("All Fields are required")
    }

    const user = new UserModel({
        FullName:{
            FirstName,
            LastName,
        },
        Email,
        Password,
    })
   await user.save()
    return user
}