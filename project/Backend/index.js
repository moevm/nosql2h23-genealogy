import express, {urlencoded} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import Routes from './routes/api.js'
import neo4j_api from "./neo4j_api/neo4j_api.js";
const app = express()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(Routes)

const PORT = process.env.PORT ?? 3000
app.listen(PORT ,async () => {
    await neo4j_api.get_users()   
    console.log(`Server has been started on port ${PORT}`)
})
