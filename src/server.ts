import express from 'express';
import { errorHandle } from "./middlewares/errorHandling";
import { routes } from "./routes";

const app = express();
const PORT = 3000;  

app.use(express.json());
app.use(routes)

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  })
});

app.use(errorHandle);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
})