import {Router} from 'express'
import path from 'path'
import neo4j_api from "../neo4j_api/neo4j_api.js";
const router = Router()

const __dirname = path.resolve()
router.get('/',  (req, res, next) => {
    res.sendFile(path.resolve(__dirname,'static','index.html'))
})

router.get('/neo4j_get',  async(req, res, next)=> {
    let result = await neo4j_api.get_users();
    console.log("RESULT IS", result)
    res.status(200).send({ result })
})
router.get('/test_api',(req,res,next) =>{
    res.status(200).send('Test Work')
})
router.post('/neo4j_post', async(req, res, next) => {

    let { name } = req.body;
    let string = await neo4j_api.create_user(name);
    res.status(200).send("User named " + string + " created")
})
export default router