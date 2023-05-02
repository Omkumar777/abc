const db = require("../model/connection");
const Users = db.users;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const joi = require("joi")

function format (data,status = 200,message = 'ok'){
    return data,
    status,
    message
}

const createUsers = async (req,res)=>{
    try {
        const user = req.body;       
        const data = Users.create(user);
        res.status(200).json(format(data))
    } catch (error) {
        res.status(500).json(format(null,500,error))
    }
}

const login = async (req,res)=>{
    try {
        function validate(data) {
            const valid = joi.object({
                username: joi.string().required(),
                password: joi.required()
            })
            return valid.validate(data); 
        }
        const result = validate(req.body)
        if(!result.error){
        const token = jwt.sign(req.body , process.env.TOKEN)
        res.status(200).json(format(token))
    }else {
        res.status(404).json(format(null, 404, result.error.details))
    }
    } catch (error) {
        res.status(500).json(format(null,500,error))
    }
}


const authenticate = async (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) return res.status(401).json(format(null, 401, 'Not Authorized'));

    jwt.verify(token, process.env.TOKEN, async (err, user) => {
        if (err) {
            return res.status(403).json(format(null, 403, err));
        }
        try {
            const data = await Admin.findOne({ where: { username: user.username, password: user.password } })

            if (data.role == admin) {
               next()
            }
            else {
                res.status(404).json(format(null, 404, "You make this action"))
            }
        }
        catch (err) {
            res.status(404).json(format(null, 404, err))
        }
    })
}


module.exports = {
    createUsers ,login,authenticate
}