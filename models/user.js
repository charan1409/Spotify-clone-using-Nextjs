import { Schema , model, models } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    image: {
        type: String,
    }
});

export default models.User || model('User', userSchema);