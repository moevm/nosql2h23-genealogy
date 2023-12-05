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

router.get('/get_user/:login/:password',  async(req, res, next)=> {
    const login = req.params.login;
    const password = req.params.password;
    let result = await neo4j_api.getUserByLoginPassword(login,password);
    console.log("RESULT IS", result)
    res.status(200).send(result)
})

router.post('/delete_node',  async(req, res, next)=> {
    const nodeId = req.body.nodeId;
    console.log('deleteNode')
    let result = await neo4j_api.deleteNodeById(nodeId);
    console.log("RESULT IS", result)
    res.status(200).send(result)
})
router.get('/get_tree/:id',  async(req, res, next)=> {
    const id = req.params.id;
    let result = await neo4j_api.getTreeByUserId(id);
    //console.log("RESULT IS", result)
    res.status(200).send(result)
})

router.get('/get_user_info/:id',  async(req, res, next)=> {
    const id = req.params.id;
    let result = await neo4j_api.getUserInfo(id);
    console.log("RESULT IS", result)
    res.status(200).send(result)
})

router.get('/get_all_id/:id',  async(req, res, next)=> {
    const id = req.params.id;
    let result = await neo4j_api.getAllId(id);
    console.log("RESULT IS", result)
    res.status(200).send(result)
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

router.post('/create_node', async(req, res, next) => {
    let node = req.body;
    const nodeCreated = await neo4j_api.createNode(node);

    res.status(200).send(nodeCreated)
})

router.post('/create_relation', async(req, res, next) => {
    let relationships = req.body;
    await neo4j_api.createRelation(relationships);
    // let string = await neo4j_api.set_user();
    res.status(200).send("Relation created")
})

export default router