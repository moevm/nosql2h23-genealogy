import {Router} from 'express'
import path from 'path'
import neo4j_api from "../neo4j_api/neo4j_api.js";
const router = Router()

const __dirname = path.resolve()
router.get('/',  (req, res, next) => {
    res.sendFile(path.resolve(__dirname,'static','index.html'))
})

router.get('/get_user/:login',  async(req, res, next)=> {
    const login = req.params.login;
    let result = await neo4j_api.getUserByLogin(login);
    console.log("RESULT IS", result)
    res.status(200).send({ result })
})

router.get('/get_user_data/:login/:password',  async(req, res, next)=> {
    const login = req.params.login;
    const password = req.params.password;
    let result = await neo4j_api.getUserData(login,password);
    //console.log("RESULT IS", result)
    res.status(200).send({ result })
})

router.post('/create_user', async(req, res, next) => {
    const user = req.body;
    await neo4j_api.createUser(user);
    // let string = await neo4j_api.set_user();
    res.status(200).send("User created")
})


router.post('/neo4j_post', async(req, res, next) => {

    let { name } = req.body;
    await neo4j_api.set_user();
   // let string = await neo4j_api.set_user();
    res.status(200).send("User named " + " created")
})
export default router