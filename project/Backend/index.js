import express, {urlencoded} from 'express'
import bodyParser from "body-parser";
//import Routes from './routes/servers.js'

const app = express()

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
//app.use(Routes)

const PORT = process.env.PORT ?? 3000
app.listen(PORT ,() => {
    console.log(`Server has been started on port ${PORT}`)
})