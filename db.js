import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const dbURI = `mongodb+srv://root:ZMbRwK3D9Hlwnbb2@cluster0.vmapo.mongodb.net/authentication?retryWrites=true&w=majority`;
    const conn = await mongoose.connect(dbURI, { autoIndex: false });
    console.log(`mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`error connecting database ${error}`);
  }
};

export default connectDb;
