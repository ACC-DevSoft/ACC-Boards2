const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./bd/db");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const Role = require("./routes/role");
const Auth = require("./routes/auth");
const User = require("./routes/user");
const WorkSpace = require("./routes/workspace");
const Task = require("./routes/tasks");
const Board = require("./routes/board");
const Uploads = require("./routes/uploads");
const app = express();

app.use(express.json());
app.use(cors());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
		createParentPath: true,
	})
);

app.use("/api/role/", Role);
app.use("/api/auth/", Auth);
app.use("/api/user/", User);
app.use("/api/workSpace/", WorkSpace);
app.use("/api/board/", Task);
app.use("/api/board/", Board);
app.use("/api/uploads/", Uploads);

app.listen(process.env.PORT, () =>
	console.log("Backend server running on port: " + process.env.PORT)
);

dbConnection();
