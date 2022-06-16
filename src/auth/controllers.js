import {User} from '../models/index.js'
import { Op } from 'sequelize'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendEmailWelcome } from '../helpers/sendEmail.js'

export const register = async (req, res) =>{

    const {password, username, email} = req.body
    
    if(!password || !username || !email){
        return res.status(400).json({msg:'You must complete all the fields'})
    }

    if(password.length <6){
        return res.status(400).json({msg:'The password must exceed 5 characters'})
    }

    if(username.length <4){
        return res.status(400).json({msg:'The username must exceed 3 characters'})
    }

    if(!email){
        return res.status(400).json({msg:'Your email is invalid'})
    }
    
    try {

        const repeatUser =  await User.findOne({ where: {
            [Op.or]: [
              { email: email },
              { username: username }
            ]
        }});

        if(repeatUser) {
            return res.status(400).json({ msg: 'This email or usernam already exists' })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const user = {
            password:hash,
            username,
            email
        }

        await User.create(user)

        sendEmailWelcome({email, username})
        
    } catch (error) {
        return res.json({msg: error})
    }
    
    res.status(201).json({msg:'User created successfully'})
}

export const login = async (req, res) =>{

    const {password, email} = req.body

    try {

        if(!password || !email) {
            return res.status(400).json({msg: 'fill in the fields!'})
        }

        const user =  await User.findOne({where: {email:email}});

        if(!user) {
           return res.status(400).json({msg:'incorrects credentials'})
        }

        const validatePassword = bcrypt.compareSync(password, user.password)

        if(!validatePassword){
            return res.status(400).json({msg:'incorrect password'}) 
        }
        
        const token = jwt.sign({email: email }, process.env.PASS_JWT, { expiresIn: '48h' });

        res.status(200).json({token})

    } catch (error) {
        return res.json({msg: error})
    }
}