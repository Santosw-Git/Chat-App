import jwt from "jsonwebtoken";

const generateAccessToken = (user_Id,res)=>{
    const accessToken = jwt.sign({user_Id},process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRE
        }
    )
    return accessToken;
}

const generateRefreshToken = (user_Id,res)=>{  
    const refreshToken = jwt.sign({user_Id},process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRE
        }
    )
    return refreshToken;

}

export {
    generateAccessToken,
    generateRefreshToken,
}

