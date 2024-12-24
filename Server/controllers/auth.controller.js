import User from "../model/user.model.js";
import bcrypt from "bcryptjs"

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
                await newUser.save();

                res.status(201).json({
                    _id: newUser._id,
                    fullname: newUser.fullname,
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

const userLogin = (req,res)=>{};

const userSignIn = (req,res)=>{}
export{
    userLogin,
    userSignIn,
    userSignUp
}