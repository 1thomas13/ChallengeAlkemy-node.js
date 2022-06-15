import {Character} from '../models/index.js'

export const addCharacter = async(req,res) => {

    const characters = await Character.findAll()

    res.json({msg:characters})
}

export const getAllCharacters = async(req,res) => {
    const characters = await Character.findAll()

    res.json({msg:characters})
}