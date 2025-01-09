import User from "../model/user.model.js";
import bcrypt from "bcryptjs"
import { generateAccessToken,generateRefreshToken } from "../utils/generateJwt.utils.js";

const userSignUp = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password didn't match" });
        }

        const userExists = await User.findOne({ username });
        
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;


        
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, function(err, salt) {
             bcrypt.hash(password, salt, async function(err, hashPassword) {

                const newUser = new User({
                     fullname,
                     username,
                     password:hashPassword,
                     gender,
                     profile_pic: gender === 'male' ? boyProfilePic : girlProfilePic,
                    })

                const accessToken = generateAccessToken(newUser._id,res);
                const refreshToken = generateRefreshToken(newUser._id,res);
                newUser.refreshToken = refreshToken;

                await newUser.save();

                const options = {
                    httpOnly: true,
                    secure:true,

                }
                
                res.status(201).cookie("refreshToken",refreshToken,options).json({
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    accessToken: accessToken,
                    username: newUser.username,
                    profilePic: newUser.profile_pic,
                });

            })
         });

    } catch (error) {
        console.error("Error details:", error);

        res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
};




const userLogin = async (req,res)=>{
    try {

        const {username, password} = req.body;
        const user = await User.findOne({ username: username});
        if(!user){
            return res.status(404).json({ error: 'user not found' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(404).json({ error: 'password incorrect' });
        }

        const accessToken = generateAccessToken(user._id,res);

        const options = {
            httpOnly: true,
            secure: true,
        }

        res.status(200)
        .cookie("refreshToken",user.refreshToken, options)
        .json({
            _id: user._id,
            username: user.username,
            fullname: user.fullname,
            accessToken: accessToken,
            profilePicture: user.profile_pic
        })
        
    } catch (error) {
        console.error("Error details:", error);

        res.status(500).json({ error: 'Internal Server Error', message: error.message });
        
    }
};

const userLogOut = (req,res)=>{
    try {
        console.log("helo");
        
        res.cookie("jwt",{maxAge:0})
        res.status(200).json({message: "User logged out"})
        
    } catch (error) {
        console.error("Error details:", error);

        res.status(500).json({ error: 'Internal Server Error', message: error.message });
        
    }
}
export{
    userLogin,
    userLogOut,
    userSignUp
}