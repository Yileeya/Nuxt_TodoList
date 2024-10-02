import mongoose from "mongoose";

const {MONGO_URL} = process.env;
export default async () => {
    try {
        await mongoose.connect(`${MONGO_URL}`);
        console.log("[ mongodb 連線成功 ]");
    } catch (err) {
        console.log("[ mongodb 連線錯誤 ]", err.message);
    }
};