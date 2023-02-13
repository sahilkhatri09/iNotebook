const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser')

const JWT_SECRET = "mynameissahilkhatri";
// Create a User Using : Post "/api/auth/"
router.post('/createuser', async (req, res) => {
    // console.log(req.body);
    try {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const data = {
            user: {
                id: user.id,
            }
        }
        const jwtToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        return res.status(201).json({
            success: true,
            jwtToken
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: 'fail',
            err
        })
    }

})


// Authenticate a user 
router.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: "Please enter password or email"
            })
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Please enter correct password or email"
            })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({
                success: false,
                message: "Please enter correct password or email"
            })
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        const jwtToken = jwt.sign(data, JWT_SECRET);
        return res.status(201).json({
            success: true,
            jwtToken
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: "Internal server error"
        })
    }
})


// Route 3 : Get loggedinUser Details
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({
            success: true,
            user
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
})
module.exports = router;