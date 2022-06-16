import {Character, MovieCharacter} from '../models/index.js'

export const addCharacter = async(req,res) => {
  
    const {characters} = req.body

    if(!characters) {
       return res.status(200).json({msg: 'You must enter data to create characters'})
    }

    
    for await (let character of characters) {
        await Character.create(character)
    }
  

    res.json({msg: 'Character/s creates succesfully'})
} 


export const getAllCharacters = async(req,res) => {


    const characters = await Character.findAll({
        attributes: ['img', 'name']
      })
    
    if(characters.length === 0) {
        return res.status(400).json({msg:'No characters yet'})
    }

    res.json({msg:characters})
}

export const getDetailCharacter = async(req,res) => {

    const {id} = req.params

    const character = await Character.findOne({where: {id:id}, include: MovieCharacter})

    if(!character){
        return res.status(400).json({msg:'The character not exist!'})
    }

    res.json({msg:character})
}

export const editCharacter = async(req,res) => {

    const {id} = req.params
    const {img, name, age, weight, history} = req.body

    const character = await Character.findOne({where: {id:id}})

 
    if (!character){
        return res.status(404).json({ msg: 'Character not exist' })
    }
      
    character.img = img || character.img
    character.name = name || character.name
    character.age = age || character.age
    character.weight = weight || character.weight
    character.history = history || character.history

    await character.save()

    res.json({msg:'Successfully modified character'})
}

export const deleteCharacter = async(req,res) => {

    const {id} = req.params

    const character = await Character.findOne({where:{id:id}})

    if(!character){
        return res.status(404).json({ msg: 'Character not exist' })
    }

    await character.destroy()

    res.json({msg: 'Successfully deleted character'})
}