const UserModel = require('../model/userModel');

const addUser = async (req, res) => {
    try {
        const {
            firstname,
            lastname,
            userImg,
            email,
            contact,
            address1,
            address2,
            city,
            state,
            country,
            zipCode
        } = req.body

        const filename = `userImg-${req.file.originalname}`;

        const newUser = new UserModel({
            firstname,
            lastname,
            userImg: filename,
            email,
            contact,
            address1,
            city,
            state,
            country,
            zipCode
        })

        const savedUser = await newUser.save()

        return res.status(201).json({ msg: "User added successfully", savedUser })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

const editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            firstname,
            lastname,
            email,
            contact,
            address1,
            address2,
            city,
            state,
            country,
            zipCode
        } = req.body;

        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Update user fields
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.contact = contact;
        user.address1 = address1;
        user.address2 = address2;
        user.city = city;
        user.state = state;
        user.country = country;
        user.zipCode = zipCode;

        // Update userImg if req.file is present
        if (req.file) {
            user.userImg = `userImg-${req.file.originalname}`;
        }

        // Save the updated user
        const updatedUser = await user.save();

        return res.status(200).json({ msg: "User updated successfully", updatedUser });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByIdAndDelete({ _id: id });

        if (!user) {
            return res.status(404).json({ msg: "Todo not found" });
        }

        return res.status(200).json({ msg: "User deleted successfully" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await UserModel.find();

        if (!users) {
            return res.status(404).json({ msg: "No user found" })
        }

        return res.status(200).json({ msg: "Users found successfully", usersCount: users.length, users });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params
        const getUser = await UserModel.findById({ _id: id })
        if (!getUser) {
            return res.status(404).json({ msg: "Can't find the user!!" })
        }
        return res.status(200).json({ msg: "User found successfully!!", getUser })
    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

module.exports = {
    addUser,
    editUser,
    deleteUser,
    getAllUser,
    getSingleUser
}