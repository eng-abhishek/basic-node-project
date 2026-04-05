const { faker } = require('@faker-js/faker');
const userModel = require('../../models/userModel');
const bcrypt = require('bcryptjs');

const getDashboardData = async (req, res) => {

    try {

        const adminId = req.admin.id;
        const adminUser = await userModel.findById(adminId);
        if (!adminUser) {
            return res.status(404).json({ message: 'Admin user not found' });
        }

        res.json({ message: 'Welcome to Admin Dashboard', admin: adminUser.username });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getUserList = async (req, res) => {

    try {

        const userList = await userModel.find({ role: 'user' });
        res.status(200).json({ users: userList });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const editUser = async (req, res) => {

    try {

        const userId = req.params.userId;

        const { address, dob, skills, state, gender } = req.body;

        const file = req.file ? req.file.buffer.toString('base64') : null;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profileImage = file || user.profileImage;
        user.address = address || user.address;
        user.dob = dob || user.dob;
        user.state = state || user.state;
        user.gender = gender || user.gender;
        user.skills = skills ? (Array.isArray(skills) ? skills.join(',') : skills) : user.skills;

        //await user.save();
        await userModel.findByIdAndUpdate(userId, user, { new: true });

        res.status(200).json({ message: 'User updated successfully', user });

        // await userModel.findByIdAndUpdate(
        // req.params.id,
        // req.body,
        // { new: true }
        // );

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const deleteUser = async (req, res) => {

    try {
        const userId = req.params.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await userModel.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createFakeUsers = async (req, res) => {

    try {

        const users = [];

        for (let i = 0; i < 100; i++) {
            users.push({
                username: faker.person.fullName(),
                email: faker.internet.email(),
                password: await bcrypt.hashSync("123456789", 10), // better as string or hash
                dob: faker.date.birthdate({ min: 18, max: 50, mode: 'age' }),
                address: faker.location.streetAddress(),
                profileImage: null,
                gender: faker.person.sexType(),
                is_indian_citizon: faker.datatype.boolean(),
                state: faker.location.state(),
                skills: faker.helpers
                    .arrayElements(
                        ['JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go'],
                        faker.number.int({ min: 1, max: 5 })
                    )
                    .join(','),
            });
        }

        // Insert into DB
        
        await userModel.insertMany(users);

        return res.status(200).json({
            message: 'Fake users created successfully',
            total: users.length,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}


module.exports = {
    getDashboardData,
    getUserList,
    editUser,
    deleteUser,
    createFakeUsers
}
