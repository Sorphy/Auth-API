import express, {
  urlencoded,
  json, Request,
  Response,
  NextFunction,
} from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(logger("dev"));
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
