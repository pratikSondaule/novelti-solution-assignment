const express = require('express');
const userRouter = express.Router();
const upload = require('../middleware/fileUpload');
const userController = require('../controller/userController');

userRouter.get('/get-user', userController.getAllUser);
userRouter.get('/get-single-user/:id', userController.getSingleUser);
userRouter.post('/add-user', upload.single('userImg'), userController.addUser);
userRouter.put('/edit-user/:id', upload.single('userImg'), userController.editUser);
userRouter.delete('/delete-user/:id', userController.deleteUser);

// To view the image in frontend
userRouter.use('/uploads', express.static('uploads'))

module.exports = userRouter;