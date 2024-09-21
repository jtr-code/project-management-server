import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

// ROUTES IMPORTS
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

// CONFIGURATIONS
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES DECLARATION
app.get("/", (req, res) => {
  res.send("OK");
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port - ${process.env.PORT}`);
});
