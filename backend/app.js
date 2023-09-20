import  express   from "express";
import cors from "cors";

import  {db}  from "./database/db.js";
import router from "./routes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', router);

try {
  await db.authenticate();
  console.log("conexion realizada correctamente");
} catch (error) {
  console.log(error.message)
}


app.listen(8000, ()=>{
  console.log('el servidor esta corriendo en http://localhost:8000/');
});