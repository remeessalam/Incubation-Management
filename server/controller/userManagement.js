const { asyncWrapper } = require('../middlewares/asyncwrapper');
const userModel = require('../models/userModel');
let n=1;
module.exports = {

    getAllUser: asyncWrapper(async (req, res) => {
        const user = await userModel.find({})
        res.status(200).json({ status: true, users: user })
    }),

    updateUser: asyncWrapper(async (req, res) => {
        const id = req.params.id
        const users = await userModel.findOne({ _id: id })
        const user = await userModel.updateOne({ _id: id }, { $set: { status: !users.status } })
        res.status(200).json({ status: true })
    }),
    deleteUser: asyncWrapper(async (req, res) => {
        
        const id = req.params.id
        console.log(id+"hai",n++)
        await userModel.deleteOne({_id:id})
        res.status(200).json({ status: true })

    })
}