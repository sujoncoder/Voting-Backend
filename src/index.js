import app from "./app.js";
import connectDB from "./config/db.js";

const port = process.env.PORT || 8000;

app.listen(port, async () => {
  console.log(`Server is running on ${port}`);
  await connectDB();
});
