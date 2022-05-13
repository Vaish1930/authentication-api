import express from "express";
import cors from "cors";
import connectDb from "./db.js";
import authRouter from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(cors());

await connectDb();

app.get("/", (req, res) => res.json("Autehntication"));
app.use("/api", authRouter);

app.listen(80, () => console.log("Listening on localhost : 80"));

// ZMbRwK3D9Hlwnbb2
