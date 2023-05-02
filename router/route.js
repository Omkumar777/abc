const users = require("../controller/controller")

module.exports = app => {

    const router = require("express").Router()
    router.post("/",users.createUsers )



    router.use("/users")
}