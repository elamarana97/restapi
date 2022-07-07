const express = require('express');
const router = express.Router();
const Model = require('../models/model.js');
//Post api
router.post('/post', async (req, res) => {
   

    try {
        const data = new Model({
            name: req.body.name,
            age: req.body.age
        });
        var name = req.body.name;
        await Model.findOne({ name: name }, function (err, example) {
            if (err) {
                console.log(err)
            }
            if (example) {
                res.json({ message: 'this record already exists' }); return 0;

            }
            else {

                const dataToSave = data.save();
                res.status(200).json(dataToSave); return 0;
            }
        });

    }catch(error) {
        res.status(400).json({ message: error.message });
    }
});
//Get all api
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }


});
//Get by Id 
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id)
        res.send(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }



})
//update by id 
router.patch('/udpate/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const udpateData = req.body;
        const options = { new: true }
        const result = await Model.findByIdAndUpdate(
            id, udpateData, options
        );
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

})
//delete by id
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id);
        res.json(`Document with ${data.name} has been deleted....`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});


module.exports = router;