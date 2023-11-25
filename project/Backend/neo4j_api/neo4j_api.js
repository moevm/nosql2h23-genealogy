import neo4j from 'neo4j-driver'
import {creds} from '../config/credentials.js'

const driver = neo4j.driver("bolt://127.0.0.1:7687", neo4j.auth.basic(creds.neo4jusername, creds.neo4jpw));

let get_users = async () => { // просим количество user
    let session = driver.session();
    const num_nodes = await session.run('MATCH (n) RETURN n', {
    });
    session.close();
    console.log("RESULT:");
    num_nodes.records.forEach((user) =>{
        console.log(user._fields[0])
    })

    return (!num_nodes ? [] : num_nodes.records);
};

let getUserByLogin = async (login) => { //получаем пользователя по логину для регистрации или авторизации
    let session = driver.session();
    const res = await session.run('MATCH (n) WHERE n.login = $login RETURN n', {
        login: login
    });
    session.close();
    console.log("RESULT:");
    console.log(res.records[0]._fields)
    return (!res ? {} : res.records[0]._fields[0]);

}
let getUserByLoginPassword = async (login,password) => {
    let session = driver.session();
    const res = await session.run('MATCH (n) WHERE n.login = $login AND n.password = $password RETURN n', {
        login: login,
        password: password
    });
    session.close();
    return res.records[0]?._fields[0] || {};
}
let getUserData = async (login,password) => { // получение всех связей с узлом пользователя
    let session = driver.session();
    const res = await session.run('MATCH(N)-[r]->(e) WHERE N.login = $login AND N.password = $password\n' +
        'MATCH(k)-[m]->(N)\n' +
        'RETURN *', {
        login: login,
        password: password,
    });
    session.close();
    console.log("RESULT:");
    console.log(res.records)
    return (!res ? [] : res.records);
}
let createUser = async (user) => { // создаём пользователя
    let session = driver.session();
    let res = {}
    try {
        res = await session.run('CREATE(user:Relative $user)', {
            user: user
        });
    }
    catch (err) {
        console.error(err);
        return res;
    }
    return res;
}

let createNode = async (node)=>{//},relationships) =>{ // создать узел дерева со связями (узел - json, связи список с json в которх id и тип отношений)

    let session = driver.session();
    let primitiveNode = {
        UserId: String(node.UserId),
        name: String(node.name),
        surname: String(node.surname),
        patronymic: String(node.patronymic),
        dateOfBirth: String(node.dateOfBirth),
        dateOfDeath: String(node.dateOfDeath),
        gender: String(node.gender),
        generation: Number(node.generation)
      };
    try {
        const id = await session.run('CREATE(node:Relative $node)\n' +
            'RETURN node.id', {
            node: primitiveNode
        });
        // for (const relative of relationships) {
        //     let response = await session.run('MATCH(N) WHERE Id(N) = $id\n' +
        //         'CREATE(N)-[m:$relativeEdgeTo]->(r) WHERE Id(r) = $relativeId\n' +
        //         'CREATE(r)-[q:$relativeEdgeFrom]->(N)', {
        //         id: id,
        //         relativeEdgeTo: relative.relationshipTo,
        //         relativeEdgeFrom: relative.relationshipFrom,
        //         relativeId: relative.id
        //     });
        // }
    }
    catch (err) {
        console.error(err);
        return 'error';
    }
    return 'success added Node by Id: ' + id;
}

let deleteNode = async (id) => { // создать узел дерева со связями (узел - json, связи список с json в которх id и тип отношений)

    let session = driver.session();
    try {
        const res = await session.run('MATCH (N) WHERE Id(N) = $id\n' +
            'DETACH DELETE N', {
            id: id
        });
    }
    catch (err) {
        console.error(err);
        return 'cannot delete';
    }
    return `node by Id: ${id} was deleted`;
}

let giveAccess = async (userId, observers) => { // передаём id пользователя и список id тех кому нужен доступ
    let session = driver.session();
    try {
        for (const observerId of observers) {
            const res = await session.run('MATCH (N) WHERE Id(N) = $userId\n' +
                'CREATE (R)-[e:HAVE_PRIVACY]->(N) WHERE Id(R) = $observerId', {
                userId: userId,
                observerId: observerId
            });
        }

    }
    catch (err) {
        console.error(err);
        return 'cannot give access';
    }
    return "Access was given";
}

let takeAccess = async (userId, observers) => { // передаём id пользователя и список id тех у кого доступ нужно забрать
    let session = driver.session();
    try {
        for (const observerId of observers) {
            const res = await session.run('MATCH(R)-[e:HAVE_PRIVACY]->(N) WHERE Id(N) = $userId ' +
                'AND WHERE Id(R) = $observerId\n'+ 'DELETE e', {
                userId: userId,
                observerId: observerId
            });
        }

    }
    catch (err) {
        console.error(err);
        return 'cannot give access';
    }
    return "Access was taken";
}

let updateUser = async (userId,data) =>{ // передача новых данных по пользователю при редактировании профиля
    let session = driver.session();
    try {
            const res = await session.run('MATCH(N) WHERE Id(N) = $userId ' +
                'SET N = properties($updateUserData)', {
                userId: userId,
                updateUserData: data
            });

    }
    catch (err) {
        console.error(err);
        return 'cannot give access';
    }
    return "Access was taken";
}

let getTreeByUserId = async (userId) =>{ // передача новых данных по пользователю при редактировании профиля
    let session = driver.session();

    try {
        const res = await session.run('MATCH path = (N)-[*]-(other) ' +
        'WHERE elementid(N) = $userId AND NOT type(relationships(path)[0]) = "HAVE_PRIVACY" ' +
        'WITH relationships(path) AS rels, nodes(path) AS nodes ' +
        'UNWIND range(0, size(rels) - 1) AS idx ' +
        'WITH rels[idx] AS rel, nodes[idx] AS start, nodes[idx+1] AS end ' +
        'WHERE NOT type(rel) = "HAVE_PRIVACY" AND id(start) < id(end) ' +
        'WITH start, rel, end ' +
        'ORDER BY start ' +
        'RETURN COLLECT(DISTINCT {start: start, rel: rel, end: end}) AS result', {
            userId: userId
        });
        return res.records[0]._fields[0]
    }
    catch (err) {
        console.error(err);
        return 'cannot give access';
    }
}



export default {
    get_users,
    getUserByLogin,
    createUser,
    getUserData,
    createNode,
    deleteNode,
    takeAccess,
    giveAccess,
    updateUser,
    getUserByLoginPassword,
    getTreeByUserId
}