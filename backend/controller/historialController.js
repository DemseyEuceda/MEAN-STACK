import { db } from "../database/db.js";


  export async function insertHistorial (req, res) {
    try {
        const { pais, ciudad, fecha, estadoclima, temperatura } = req.body;
        await db.query("INSERT INTO historials (pais, ciudad, fecha, estadoclima, temperatura) VALUES (?,?,?,?,?)", [pais, ciudad, fecha, estadoclima, temperatura]);
        console.log(req.body);
        res.json({
            "message":"historial Agregado"
        });
        
    } catch (error) {
       res.json({message : error.message});
    }
}

 export async function mostrarHistorial (req, res){
    try {
        var data = await db.query("SELECT * FROM historials");
        res.json(data)
    } catch (error) {
        res.json({message : error.message});
    }
}

 export async function eliminarHistorial (req, res){
    try {
        var data = await db.query("DELETE FROM historials");
        res.json(data)
    } catch (error) {
        res.json({message : error.message});
        
    }
 }




