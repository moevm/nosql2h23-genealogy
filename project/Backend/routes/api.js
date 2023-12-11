import {Router} from 'express'
import path from 'path'
import neo4j_api from "../neo4j_api/neo4j_api.js";
import fs from 'fs/promises';
import { existsSync } from 'node:fs';
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
    let result = await neo4j_api.deleteNodeById(nodeId);
    console.log("RESULT IS", result)
    res.status(200).send(result)
})

router.post('/change_user_info',  async(req, res, next)=> {
    const data = req.body;
    let result = await neo4j_api.updateUser(data);
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

router.get('/ExportData/:id',  async(req, res, next)=> {
    const id = req.params.id;
    let filePath = path.join(__dirname, 'data', 'database.json')
    if (!existsSync(path.join(__dirname, 'data')))
        fs.mkdir(path.join(__dirname, 'data'))
    let result = await neo4j_api.exportInfo(id);
    try {
        await fs.writeFile(filePath, JSON.stringify(result, null, 2));
        console.log('Данные успешно записаны в файл');
      } catch (error) {
        console.error('Ошибка записи в файл:', error);
      }
    let file = await fs.readFile(filePath);

    res.setHeader('Content-Disposition', 'attachment; filename="database.json"');
    res.setHeader('Content-Type', 'application/json');
    res.send(file);
})

router.post('/ImportData/:id',  async(req, res, next)=> {
    let id = req.params.id
    let data = req.body
    data.forEach(element => {
        let result = neo4j_api.ImportInfo(id, element[0], element[1], element[2]);
    });
    res.status(200).send("Database imported")
})

router.get('/get_other_trees/:id',  async(req, res, next)=> {
    const id = req.params.id;
    let UsersId = await neo4j_api.getOtherTrees(id);
    let result = []
    for (let i = 0; i < UsersId.length; i++){
        let fullName = await neo4j_api.getFullName(UsersId[i]._fields[0]);
        let countAllNodes = await neo4j_api.getCountAllNodeInTree(UsersId[i]._fields[0]);
        let countMatchingNodes = await neo4j_api.getCountMatchingNodeInTree(id,UsersId[i]._fields[0]);
        let countGenerationalCoincidences = await neo4j_api.getCountGenerationalCoincidences(id,UsersId[i]._fields[0]);
        result.push({full_name: fullName[0]._fields[0], amount_in_tree: Number(countAllNodes[0]._fields[0]), amount_of_matches: Number(countMatchingNodes[0]._fields[0]), amount_in_generation: Number(countGenerationalCoincidences[0]._fields[0])})
    }
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

router.get('/getStatistics/:id',  async(req, res, next)=> {
    const id = req.params.id;

    let result = []
    let max_gen = await neo4j_api.getMaxGeneration(id);
    for (let i = 0; i <= max_gen; i++){
        let amount = await neo4j_api.getAmountInGenration(id, i);
        let males = await neo4j_api.getMaleAmount(id, i);
        let females = amount - males;
        let pairs = await neo4j_api.getPairsAmount(id, i);
        let ages = await neo4j_api.getAvgAge(id, i);
        //console.log({generation: i, amount_in_generation: amount, male: males, female: females, average_age: ages, pair_amount: pairs})
        result.push({generation: i, amount_in_generation: amount, male: males, female: females, average_age: ages, pair_amount: pairs})
    }

    res.status(200).send(result)
})

export default router