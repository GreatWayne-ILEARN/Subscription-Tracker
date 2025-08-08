import mongoose from "mongoose";

import { DB_URI, NODE_ENV} from "../config/env.js";

if(!DB_URI){
    throw new Error('Please define the mongodb_uri environment inside the .env.<development/production>.local');
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connecting to database in ${NODE_ENV} mode`);
    } catch (error) {
        console.error('Error connecting to the database connection', error);

        process.exit(1);
    }
}

export default connectToDatabase;
