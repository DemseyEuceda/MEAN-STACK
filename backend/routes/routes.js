import express from 'express';
import { eliminarHistorial, insertHistorial, mostrarHistorial } from '../controller/historialController.js'

const router = express.Router();

router.get('/', mostrarHistorial);
router.post('/', insertHistorial);
router.delete('/', eliminarHistorial);



export default router;