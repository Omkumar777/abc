const db = require("../model/connection");
const Users = db.users;
const Products = db.products;

function format (data,status = 200,message = 'ok'){
    return data,
    status,
    message
}
const methods = ()=> { 

    const createProduct = async (req,res)=>{
    try {
        const product = req.body;       
        const data = Products.create(product);
        res.status(200).json(format(data))
    } catch (error) {
        res.status(500).json(format(null,500,error))
    }
}


const viewAllProducts = async(req,res)=>{
    try {
        const products = Products.findAll();
        res.status(200).json(format(products))
    } catch (error) {
        res.status(500).json(format(null,500,error))        
    }
}

const viewProduct = async (req,res)=>{
    try {
        const product = Products.findOne({where :{id : req.params.id}})
        res.status(200).json(format(product))

    } catch (error) {
        res.status(500).json(format(null,500,error))
    }
}
}

module.exports = {
    methods
}