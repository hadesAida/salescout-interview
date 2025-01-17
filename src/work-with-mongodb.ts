// Write a script that:
// 1. Connects to MongoDB.
// 2. Creates the 'users' collection.
// 3. Adds new users.
// 4. Finds users with duplicate emails.

// Use Mongoose library

import mongoose, { Schema, Document, Model } from 'mongoose';

type UserDocument = Document & {
    name: string;
    email: string;
};

type DuplicatedUsers = {
    email: string;
};

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: false },
});

const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

async function manageUsers(): Promise<DuplicatedUsers[]> {
    const MONGO_URI = 'mongodb://localhost:27017/mydatabase'; 

    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');

        const usersData = [
            { name: 'Alice', email: 'alice@example.com' },
            { name: 'Bob', email: 'bob@example.com' },
            { name: 'Alice', email: 'alice@example.com' },
        ];

        
        await User.insertMany(usersData, { ordered: false }).catch(() => {
            console.log('Duplicate entries may already exist.');
        });

        
        const duplicates = await User.aggregate([
            { $group: { _id: '$email', count: { $sum: 1 } } },
            { $match: { count: { $gt: 1 } } },
            { $project: { _id: 0, email: '$_id' } },
        ]);

        return duplicates;
    } catch (error) {
        console.error('Error managing users:', error);
        return [];
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

module.exports = { manageUsers };
