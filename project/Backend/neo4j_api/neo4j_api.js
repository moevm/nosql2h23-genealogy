import neo4j from 'neo4j-driver'
import {creds} from '../config/credentials.js'
const dbPort = '7687'
const driver = neo4j.driver(`bolt://db:${dbPort}`, neo4j.auth.basic(creds.neo4jusername, creds.neo4jpw));

let get_users = async () => { // просим количество user
    let session = driver.session();
    const num_nodes = await session.run('MATCH (n) RETURN n', {
    });
    session.close();
    if(num_nodes.records.length === 0){
     await init_db();
    }
    return (!num_nodes ? [] : num_nodes.records);
};

let init_db = async () => {
    let session = driver.session();
    const firstQuery = await session.run('CREATE(N:Relative {login: \'zevsCool228\', password: "Zevs322Cool!", dateOfBirth: date("1500-12-22"), gender: "М", generation: 1, name: \'Зевс\', oldest: false, surname: \'Греков\', patronymic: \'Кроносович\' });', {});
    await session.run('MATCH(N) WHERE Id(N) = 0' +
        '    CREATE(R:Relative {dateOfBirth: date("1001-08-15"), dateOfDeath: date("1600-10-11"), gender: "М", generation: 0, name: \'Кронос\', oldest: true, surname: \'Греков\', patronymic: \'Криевич\', UserId: elementId(N) });',{})
    await session.run(        '    MATCH(N) WHERE Id(N) = 0\n' +
        '    CREATE(R:Relative {dateOfBirth: date("1002-07-13"), dateOfDeath: date("1605-05-22"), gender: "Ж", generation: 0, name: \'Рея\', oldest: true, surname: \'Грекова\', patronymic: \'Титанидова\', UserId: elementId(N) });',{})
    await session.run(        '    MATCH(N) WHERE Id(N) = 0\n' +
        '    CREATE(R:Relative {dateOfBirth: date("1512-07-13"), gender: "Ж", generation: 1, name: \'Гера\', oldest: false, surname: \'Грекова\', patronymic: \'Кроносовична\', UserId: elementId(N) });',{})
    await session.run(        'MATCH(N) WHERE Id(N) = 0' +
        '    CREATE(R:Relative {dateOfBirth: date("1700-02-15"), gender: "М", generation: 2, name: \'Гефест\', oldest: false, surname: \'Греков\', patronymic: \'Зевсович\', UserId: elementId(N) });',{})
    await session.run(   '    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 0 AND Id(R) = 4\n' +
        '    CREATE(N)-[:FATHER]->(R)\n' +
        '    CREATE(R)-[:SON]->(N);\n',{})
    await session.run ('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 1 AND Id(R) = 0\n' +
        '    CREATE(N)-[:FATHER]->(R)\n' +
        '    CREATE(R)-[:SON]->(N);\n',{})
    await session.run( '    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 1 AND Id(R) = 3\n' +
        '    CREATE(N)-[:FATHER]->(R)\n' +
        '    CREATE(R)-[:DAUGHTER]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 2 AND Id(R) = 0\n' +
        '    CREATE(N)-[:MOTHER]->(R)\n' +
        '    CREATE(R)-[:SON]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 2 AND Id(R) = 3\n' +
        '    CREATE(N)-[:MOTHER]->(R)\n' +
        '    CREATE(R)-[:DAUGHTER]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 1 AND Id(R) = 2\n' +
        '    CREATE(N)-[:HUSBAND]->(R)\n' +
        '    CREATE(R)-[:WIFE]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 0 AND Id(R) = 3\n' +
        '    CREATE(N)-[:HUSBAND]->(R)\n' +
        '    CREATE(R)-[:WIFE]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 4 AND Id(R) = 3\n' +
        '    CREATE(N)-[:SON]->(R)\n' +
        '    CREATE(R)-[:MOTHER]->(N);',{})

    await session.run('CREATE(N:Relative {login: \'nevsCool228\', password: "Nevs322Cool!", dateOfBirth: date("1500-12-22"), gender: "М", generation: 1, name: \'Невс\', oldest: false, surname: \'Греков\', patronymic: \'Кроносович\' });', {});
    await session.run('MATCH(N) WHERE Id(N) = 5' +
        '    CREATE(R:Relative {dateOfBirth: date("1001-08-15"), dateOfDeath: date("1600-10-11"), gender: "М", generation: 0, name: \'Нронос\', oldest: true, surname: \'Греков\', patronymic: \'Криевич\', UserId: elementId(N) });',{})
    await session.run(        '    MATCH(N) WHERE Id(N) = 5\n' +
        '    CREATE(R:Relative {dateOfBirth: date("1002-07-13"), dateOfDeath: date("1605-05-22"), gender: "Ж", generation: 0, name: \'Нея\', oldest: true, surname: \'Грекова\', patronymic: \'Титанидова\', UserId: elementId(N) });',{})
    await session.run(        '    MATCH(N) WHERE Id(N) = 5\n' +
        '    CREATE(R:Relative {dateOfBirth: date("1512-07-13"), gender: "Ж", generation: 1, name: \'Нера\', oldest: false, surname: \'Грекова\', patronymic: \'Кроносовична\', UserId: elementId(N) });',{})
    await session.run(        'MATCH(N) WHERE Id(N) = 5' +
        '    CREATE(R:Relative {dateOfBirth: date("1700-02-15"), gender: "М", generation: 2, name: \'Нефест\', oldest: false, surname: \'Греков\', patronymic: \'Зевсович\', UserId: elementId(N) });',{})
    await session.run(   '    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 5 AND Id(R) = 9\n' +
        '    CREATE(N)-[:FATHER]->(R)\n' +
        '    CREATE(R)-[:SON]->(N);\n',{})
    await session.run ('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 6 AND Id(R) = 5\n' +
        '    CREATE(N)-[:FATHER]->(R)\n' +
        '    CREATE(R)-[:SON]->(N);\n',{})
    await session.run( '    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 6 AND Id(R) = 8\n' +
        '    CREATE(N)-[:FATHER]->(R)\n' +
        '    CREATE(R)-[:DAUGHTER]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 7 AND Id(R) = 5\n' +
        '    CREATE(N)-[:MOTHER]->(R)\n' +
        '    CREATE(R)-[:SON]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 7 AND Id(R) = 8\n' +
        '    CREATE(N)-[:MOTHER]->(R)\n' +
        '    CREATE(R)-[:DAUGHTER]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 6 AND Id(R) = 7\n' +
        '    CREATE(N)-[:HUSBAND]->(R)\n' +
        '    CREATE(R)-[:WIFE]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 5 AND Id(R) = 8\n' +
        '    CREATE(N)-[:HUSBAND]->(R)\n' +
        '    CREATE(R)-[:WIFE]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 9 AND Id(R) = 8\n' +
        '    CREATE(N)-[:SON]->(R)\n' +
        '    CREATE(R)-[:MOTHER]->(N);',{})
    

    await session.run('CREATE(N:Relative {login: \'revsCool228\', password: "Revs322Cool!", dateOfBirth: date("1500-12-22"), gender: "М", generation: 1, name: \'Ревс\', oldest: false, surname: \'Греков\', patronymic: \'Кроносович\' });', {});
    await session.run('MATCH(N) WHERE Id(N) = 10' +
        '    CREATE(R:Relative {dateOfBirth: date("1001-08-15"), dateOfDeath: date("1600-10-11"), gender: "М", generation: 0, name: \'Рронос\', oldest: true, surname: \'Греков\', patronymic: \'Криевич\', UserId: elementId(N) });',{})
    await session.run(        '    MATCH(N) WHERE Id(N) = 10\n' +
        '    CREATE(R:Relative {dateOfBirth: date("1002-07-13"), dateOfDeath: date("1605-05-22"), gender: "Ж", generation: 0, name: \'Рея\', oldest: true, surname: \'Грекова\', patronymic: \'Титанидова\', UserId: elementId(N) });',{})
    await session.run(        '    MATCH(N) WHERE Id(N) = 10\n' +
        '    CREATE(R:Relative {dateOfBirth: date("1512-07-13"), gender: "Ж", generation: 1, name: \'Рера\', oldest: false, surname: \'Грекова\', patronymic: \'Кроносовична\', UserId: elementId(N) });',{})
    await session.run(        'MATCH(N) WHERE Id(N) = 10' +
        '    CREATE(R:Relative {dateOfBirth: date("1700-02-15"), gender: "М", generation: 2, name: \'Рефест\', oldest: false, surname: \'Греков\', patronymic: \'Зевсович\', UserId: elementId(N) });',{})
    await session.run(   '    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 10 AND Id(R) = 14\n' +
        '    CREATE(N)-[:FATHER]->(R)\n' +
        '    CREATE(R)-[:SON]->(N);\n',{})
    await session.run ('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 11 AND Id(R) = 10\n' +
        '    CREATE(N)-[:FATHER]->(R)\n' +
        '    CREATE(R)-[:SON]->(N);\n',{})
    await session.run( '    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 11 AND Id(R) = 13\n' +
        '    CREATE(N)-[:FATHER]->(R)\n' +
        '    CREATE(R)-[:DAUGHTER]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 12 AND Id(R) = 10\n' +
        '    CREATE(N)-[:MOTHER]->(R)\n' +
        '    CREATE(R)-[:SON]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 12 AND Id(R) = 13\n' +
        '    CREATE(N)-[:MOTHER]->(R)\n' +
        '    CREATE(R)-[:DAUGHTER]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 11 AND Id(R) = 12\n' +
        '    CREATE(N)-[:HUSBAND]->(R)\n' +
        '    CREATE(R)-[:WIFE]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 10 AND Id(R) = 13\n' +
        '    CREATE(N)-[:HUSBAND]->(R)\n' +
        '    CREATE(R)-[:WIFE]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 14 AND Id(R) = 13\n' +
        '    CREATE(N)-[:SON]->(R)\n' +
        '    CREATE(R)-[:MOTHER]->(N);',{})

    await session.run('CREATE(N:Relative {login: \'yevsCool228\', password: "Yevs322Cool!", dateOfBirth: date("1500-12-22"), gender: "М", generation: 1, name: \'Зевс\', oldest: false, surname: \'Греков\', patronymic: \'Кроносович\' });', {});
    await session.run('MATCH(N) WHERE Id(N) = 15' +
        '    CREATE(R:Relative {dateOfBirth: date("1001-08-15"), dateOfDeath: date("1600-10-11"), gender: "М", generation: 0, name: \'Кронос\', oldest: true, surname: \'Греков\', patronymic: \'Криевич\', UserId: elementId(N) });',{})
    await session.run(        '    MATCH(N) WHERE Id(N) = 15\n' +
        '    CREATE(R:Relative {dateOfBirth: date("1002-07-13"), dateOfDeath: date("1605-05-22"), gender: "Ж", generation: 0, name: \'Рея\', oldest: true, surname: \'Грекова\', patronymic: \'Титанидова\', UserId: elementId(N) });',{})
    await session.run(        '    MATCH(N) WHERE Id(N) = 15\n' +
        '    CREATE(R:Relative {dateOfBirth: date("1512-07-13"), gender: "Ж", generation: 1, name: \'Гера\', oldest: false, surname: \'Грекова\', patronymic: \'Кроносовична\', UserId: elementId(N) });',{})
    await session.run(        'MATCH(N) WHERE Id(N) = 15' +
        '    CREATE(R:Relative {dateOfBirth: date("1700-02-15"), gender: "М", generation: 2, name: \'Гефест\', oldest: false, surname: \'Греков\', patronymic: \'Зевсович\', UserId: elementId(N) });',{})
    await session.run(   '    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 15 AND Id(R) = 19\n' +
        '    CREATE(N)-[:FATHER]->(R)\n' +
        '    CREATE(R)-[:SON]->(N);\n',{})
    await session.run ('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 16 AND Id(R) = 15\n' +
        '    CREATE(N)-[:FATHER]->(R)\n' +
        '    CREATE(R)-[:SON]->(N);\n',{})
    await session.run( '    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 16 AND Id(R) = 18\n' +
        '    CREATE(N)-[:FATHER]->(R)\n' +
        '    CREATE(R)-[:DAUGHTER]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 17 AND Id(R) = 15\n' +
        '    CREATE(N)-[:MOTHER]->(R)\n' +
        '    CREATE(R)-[:SON]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 17 AND Id(R) = 18\n' +
        '    CREATE(N)-[:MOTHER]->(R)\n' +
        '    CREATE(R)-[:DAUGHTER]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 16 AND Id(R) = 17\n' +
        '    CREATE(N)-[:HUSBAND]->(R)\n' +
        '    CREATE(R)-[:WIFE]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 15 AND Id(R) = 18\n' +
        '    CREATE(N)-[:HUSBAND]->(R)\n' +
        '    CREATE(R)-[:WIFE]->(N);\n',{})
    await session.run('    MATCH(N),(R)\n' +
        '    WHERE Id(N) = 19 AND Id(R) = 18\n' +
        '    CREATE(N)-[:SON]->(R)\n' +
        '    CREATE(R)-[:MOTHER]->(N);',{})

    session.close();
    console.log("RESULT:");

    return (!firstQuery ? [] : firstQuery.records);
}

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
    //const res = await session.run('MATCH (N) RETURN N',{});
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

let getUserInfo = async (userId) => { // получение информации о пользователе
    let session = driver.session();
    try{
        const res = await session.run('MATCH (N) WHERE elementid(N) = $userId ' +
            'RETURN N',{
                userId: userId
            }
        );
        return res.records[0]._fields[0].properties
    }
    catch(err){
        console.error(err);
    }

    session.close();

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
      //console.log(node)
    try {
        const dateB = node.dateOfBirth.split('-')
        const dateD = node.dateOfDeath.split('-')
        const dateOfBirthday = new neo4j.Date(+dateB[0], +dateB[1], +dateB[2])
        const dateOfDeath = new neo4j.Date(+dateD[0], +dateD[1], +dateD[2])
        node.dateOfBirth = dateOfBirthday
        node.dateOfDeath = dateOfDeath
        const response = await session.run('CREATE(node:Relative $node) RETURN node',{
            node: node,
        }
        );
        
       return response.records[0]._fields[0]
    }
    catch (err) {
        console.error(err);
        return 'error';
    }
    return 'success added Node' ;
}

let createRelation = async (relationships)=>{

    let session = driver.session();
    try {        
        let response = await session.run('MATCH(n1), (n2)\n'+
        'WHERE elementId(n1) = $id AND elementId(n2) = $relativeId\n' +
        'CREATE(n1)-[:'+relationships.relationshipTo+']->(n2)\n' +
        'CREATE(n2)-[:'+relationships.relationshipFrom+']->(n1)', {
            id: relationships.id,
            relativeId: relationships.relativeId
        });
        
    }
    catch (err) {
        console.error(err);
        return 'error';
    }
    return 'success added Node' ;
}


let deleteNodeById = async (id) => { // создать узел дерева со связями (узел - json, связи список с json в которх id и тип отношений)

    let session = driver.session();
    try {
        const res = await session.run('MATCH (N) WHERE elementId(N) = $id\n' +
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

let updateUser = async (data) =>{ // передача новых данных по пользователю при редактировании профиля
    const dateB = data.dateOfBirth.split('-')
    const dateOfBirthday = new neo4j.Date(+dateB[0], +dateB[1], +dateB[2])
    let session = driver.session();
    try {
            const res = await session.run('MATCH(N) WHERE elementId(N) = $userId ' +
                'SET N.gender = $gender,' +
                'N.name = $name,' +
                'N.surname = $surname,' +
                'N.login = $login,' +
                'N.password = $password,' +
                'N.patronymic = $patronymic,' +
                'N.dateOfBirth = $dateOfBirth', {
                userId: data.userId,
                gender: data.gender,
                name: data.name,
                surname: data.surname,
                login: data.login,
                password: data.password,
                patronymic: data.patronymic,
                dateOfBirth: dateOfBirthday,
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
        const res = await session.run('MATCH path = (n)-[k]-(other) WHERE elementid(n) = $userId or other.UserId = $userId ' + 
        'WITH relationships(path) AS rels, nodes(path) AS nodes ' +
        'UNWIND range(0, size(rels) - 1) AS idx ' +
        'WITH rels[idx] AS rel, nodes[idx] AS start, nodes[idx+1] AS end ' +
        'WHERE NOT type(rel) = "HAVE_PRIVACY" AND id(start) < id(end) ' +
        'WITH start, rel, end ' +
        'ORDER BY start ' +
        'RETURN COLLECT(DISTINCT {start: start, rel: rel, end: end}) AS result ', {
            userId: userId
        });
        return res.records[0]._fields[0]
    }
    catch (err) {
        console.error(err);
        return 'cannot give access';
    }
}

let getAllId = async (userId) => { // получение всех id дерева
    let session = driver.session();
    try{
        const res = await session.run('MATCH (N) WHERE N.UserId = $userId or elementid(N) = $userId OPTIONAL MATCH (N)-[r]->(m) WHERE elementid(m) = $userId ' +
            'RETURN N, r',{
                userId: userId
            }
        );
        return res.records
    }
    catch(err){
        console.error(err);
    }
    session.close();
}


let exportInfo = async (userId) => { // получение всех id дерева
    let session = driver.session();
    try{
        const res = await session.run('MATCH (N)-[r]->(M) WHERE N.UserId = $userId or elementid(N) = $userId ' +
            'RETURN PROPERTIES(N), type(r), PROPERTIES(M)',{
                userId: userId
            }
        )
        let jsonResult = res.records.map(record => {
            return record._fields;
          })
        return jsonResult
    }
      catch(err){
        console.error(err);
    }
    session.close();
}

let ImportInfo = async (userId, first_node, relation, second_node) => { // получение всех id дерева
    let node_info1 = {
        userId: userId,
        gender: first_node.gender,
        name: first_node.name,
        surname: first_node.surname,
        patronymic: first_node.patronymic,
        dateOfBirth: new neo4j.Date(+first_node.dateOfBirth.year.low, +first_node.dateOfBirth.month.low, +first_node.dateOfBirth.day.low),
        generation: first_node.generation.low,
        oldest: first_node.oldest !== undefined ? first_node.oldest : false
    }
    
    if (first_node.dateOfDeath !== undefined)
        node_info1.dateOfDeath = new neo4j.Date(+first_node.dateOfDeath.year.low, +first_node.dateOfDeath.month.low, +first_node.dateOfDeath.day.low)

    let node_info2 = {
        userId: userId,
        gender: second_node.gender,
        name: second_node.name,
        surname: second_node.surname,
        patronymic: second_node.patronymic,
        dateOfBirth: new neo4j.Date(+second_node.dateOfBirth.year.low, +second_node.dateOfBirth.month.low, +second_node.dateOfBirth.day.low),
        generation: second_node.generation.low,
        oldest: second_node.oldest !== undefined ? second_node.oldest : false
    }


    if (second_node.dateOfDeath !== undefined)
        node_info2.dateOfDeath = new neo4j.Date(+second_node.dateOfDeath.year.low, +second_node.dateOfDeath.month.low, +second_node.dateOfDeath.day.low)

    
    try{
        let session = driver.session();
        if (node_info1.dateOfDeath !== undefined){
            await session.run('MERGE (n:Relative {UserId: $node1.userId, gender: $node1.gender, name: $node1.name, surname: $node1.surname, patronymic: $node1.patronymic, dateOfBirth: $node1.dateOfBirth, dateOfDeath: $node1.dateOfDeath, generation: toInteger($node1.generation), oldest: $node1.oldest})\n',{
                node1: node_info1
            });}
        else{
            await session.run('MERGE (n:Relative {UserId: $node1.userId, gender: $node1.gender, name: $node1.name, surname: $node1.surname, patronymic: $node1.patronymic, dateOfBirth: $node1.dateOfBirth, generation: toInteger($node1.generation), oldest: $node1.oldest})\n',{
                node1: node_info1
            });
        }

        session.close();
        session = driver.session();
            
        if (node_info2.dateOfDeath !== undefined){
            await session.run('MERGE (m:Relative {UserId: $node2.userId, gender: $node2.gender, name: $node2.name, surname: $node2.surname, patronymic: $node2.patronymic, dateOfBirth: $node2.dateOfBirth, dateOfDeath: $node2.dateOfDeath, generation: toInteger($node2.generation), oldest: $node2.oldest})\n',{
                node2: node_info2
        });}
        else{
            await session.run('MERGE (m:Relative {UserId: $node2.userId, gender: $node2.gender, name: $node2.name, surname: $node2.surname, patronymic: $node2.patronymic, dateOfBirth: $node2.dateOfBirth, generation: toInteger($node2.generation), oldest: $node2.oldest})\n',{
                node2: node_info2
            });
        }

        session.close();
        session = driver.session();
        await session.run('MATCH (p:Relative {UserId: $node1.userId, gender: $node1.gender, name: $node1.name, surname: $node1.surname, patronymic: $node1.patronymic, dateOfBirth: $node1.dateOfBirth,'+ (node_info1.dateOfDeath!==undefined ? ' dateOfDeath: $node1.dateOfDeath,' : '') +' generation: $node1.generation, oldest: $node1.oldest}), (m:Relative {UserId: $node2.userId, gender: $node2.gender, name: $node2.name, surname: $node2.surname, patronymic: $node2.patronymic, dateOfBirth: $node2.dateOfBirth, '+ (node_info2.dateOfDeath!==undefined ? ' dateOfDeath: $node2.dateOfDeath,' : '') +' generation: $node2.generation, oldest: $node2.oldest})\n' +
        'MERGE (p)-[:'+relation+']->(m)\n',{
            node1: node_info1,
            node2: node_info2
        });
        session.close();
    }
      catch(err){
        console.error(err);
    }
}

let getOtherTrees = async (userId) => { // получение всех других деревьев
    let session = driver.session();
    try{
        const res = await session.run('MATCH (n) WHERE n.UserId <> $userId ' +
            'RETURN DISTINCT n.UserId',{
                userId: userId
            }
        );
        return res.records
    }
    catch(err){
        console.error(err);
    }
    session.close();
}

let getMaxGeneration = async (userId) => { // получение наибольшего поколения
    let session = driver.session();
    try{
        const res = await session.run('MATCH (N) WHERE N.UserId = $userId or elementid(N) = $userId ' +
            'RETURN MAX(N.generation)',{
                userId: userId
            }
        );
        return res.records[0]._fields[0].low
    }
    catch(err){
        console.error(err);
    }
    session.close();
}

let getFullName = async (userId) => { // получение ФИО
    let session = driver.session();
    try{
        const res = await session.run('MATCH (n) WHERE elementId(n)= $userId '+
        'RETURN n.name +'+'\' \''+'+ n.surname + '+'\' \''+' + n.patronymic',{
                userId: userId
            }
        );
        return res.records
    }
    catch(err){
        console.error(err);
    }
    session.close();
}

let getAmountInGenration = async (userId, gen) => { // получение количества узлов в поколении
    let session = driver.session();
    try{
        const res = await session.run('MATCH (N) WHERE (N.UserId = $userId or elementid(N) = $userId) and N.generation = $gen ' +
            'RETURN COUNT(N)',{
                userId: userId,
                gen: gen
            }
        );
        return res.records[0]._fields[0].low
    }
    catch(err){
        console.error(err);
    }
    session.close();
}

let getMaleAmount = async (userId, gen) => { // получение количества мужчин в поколении
    let session = driver.session();
    try{
        const res = await session.run('MATCH (N) WHERE (N.UserId = $userId or elementid(N) = $userId) and N.generation = $gen and N.gender = "М" ' +
            'RETURN COUNT(N)',{
                userId: userId,
                gen: gen,
            }
        );
        return res.records[0]._fields[0].low
    }
    catch(err){
        console.error(err);
    }
    session.close();
}


let getCountAllNodeInTree = async (userId) => { // получение количества всех узлов
    let session = driver.session();
    try{
        const res = await session.run('MATCH (n)'+
        'WHERE n.UserId = $userId '+
        'RETURN COUNT(*)+1',{
                userId: userId
            }
        );
        return res.records
    }
    catch(err){
        console.error(err);
    }
    session.close();
}

let getCountMatchingNodeInTree = async (userId, userId1) => { // получение количества совпадающих узлов
    let session = driver.session();
    try{
        const res = await session.run('MATCH (n1) '+
        'MATCH (n2) '+
        'WHERE n1.name = n2.name AND n1.surname = n2.surname AND n1.patronymic = n2.patronymic AND n1.dateOfBirth = n2.dateOfBirth '+
        'AND (n1.UserId = $userId OR elementId(n1) = $userId) '+
        'AND (n2.UserId = $userId1 OR elementId(n2) = $userId1) '+
        'RETURN COUNT(*)',{
                userId: userId,
                userId1: userId1
            }
        );
        return res.records
    }
    catch(err){
        console.error(err);
    }
    session.close();
}

let getPairsAmount = async (userId, gen) => { // получение количества пар в поколении
    let session = driver.session();
    try{
        const res = await session.run('MATCH (N)-[:HUSBAND]->(m) WHERE (N.UserId = $userId or elementid(N) = $userId) and N.generation = $gen ' +
            'RETURN COUNT(N)',{
                userId: userId,
                gen: gen
            }
        );
        return res.records[0]._fields[0].low
    }
    catch(err){
        console.error(err);
    }
    session.close();
}


let getCountGenerationalCoincidences = async (userId, userId1) => { // получение количества совпадений на поколениях
    let session = driver.session();
    try{
        const res = await session.run('MATCH (n1) '+
        'MATCH (n2) '+
        'WHERE n1.name = n2.name AND n1.surname = n2.surname AND n1.patronymic = n2.patronymic AND n1.dateOfBirth = n2.dateOfBirth '+
        'AND (n1.UserId = $userId OR elementId(n1) = $userId) '+
        'AND (n2.UserId = $userId1 OR elementId(n2) = $userId1) '+
        'RETURN COUNT(DISTINCT n1.generation)',{
                userId: userId,
                userId1: userId1
            }
        );
        return res.records
          }
    catch(err){
        console.error(err);
    }
    session.close();
}

let getAvgAge = async (userId, gen) => { // получение среднего возраста в поколении
    let session = driver.session();
    try{
        const res = await session.run('MATCH (N) WHERE (N.UserId = $userId or elementid(N) = $userId) and N.generation = $gen ' +
            'RETURN AVG(CASE (N.dateOfDeath IS NULL) ' +
            '  WHEN TRUE THEN datetime().year - N.dateOfBirth.year ' +
            '  ELSE N.dateOfDeath.year - N.dateOfBirth.year ' +
            'END)',{
                userId: userId,
                gen: gen
            }
        );
        return res.records[0]._fields[0]
    }
    catch(err){
        console.error(err);
    }
    session.close();
}

export default {
    get_users,
    getUserByLogin,
    createUser,
    getUserData,
    createNode,
    createRelation,
    deleteNodeById,
    takeAccess,
    giveAccess,
    updateUser,
    getUserByLoginPassword,
    getTreeByUserId,
    getUserInfo,
    getAllId,
    exportInfo,
    ImportInfo,
    init_db,
    getOtherTrees,
    getFullName,
    getCountAllNodeInTree,
    getCountMatchingNodeInTree,
    getCountGenerationalCoincidences,
    getMaxGeneration,
    getAmountInGenration,
    getMaleAmount,
    getPairsAmount,
    getAvgAge,
}