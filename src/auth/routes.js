import  express  from "express";
import { login, register } from "./controllers.js";
const router = express.Router()

router.post('/register', register)

router.get('/login', login)

export default router