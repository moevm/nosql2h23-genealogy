CREATE(N:Relative {login: 'zevsCool228',password: "Zevs322Cool!", dateOfBirth: date("1500-12-22"),gender:"М",generation:1,name: 'Зевс',oldest: false,surname:'Греков' ,patronymic:'Кроносович' } );
MATCH(N) WHERE Id(N) = 0
CREATE(R:Relative {dateOfBirth: date("1001-08-15"), dateOfDeath: date("1600-10-11"),gender:"М",generation:0,name: 'Кронос ',oldest: true,surname:'Греков' ,patronymic:'Криевич',UserId: elementId(N) });
MATCH(N) WHERE Id(N) = 0
CREATE(R:Relative {dateOfBirth: date("1002-07-13"), dateOfDeath: date("1605-05-22"),gender:"Ж",generation:0,name: 'Рея',oldest: true,surname:'Грекова' ,patronymic:'Титанидова',UserId: elementId(N) });
MATCH(N) WHERE Id(N) = 0
CREATE(R:Relative {dateOfBirth: date("1512-07-13"),gender:"Ж",generation:1,name: 'Гера',oldest: false,surname:'Грекова' ,patronymic:'Кроносовична',UserId: elementId(N) });
MATCH(N) WHERE Id(N) = 0
CREATE(R:Relative {dateOfBirth: date("1700-02-15"),gender:"М",generation:2,name: 'Гефест',oldest: false,surname:'Греков' ,patronymic:'Зевсович',UserId: elementId(N) });
MATCH(N),(R)
WHERE Id(N) = 0 AND Id(R) = 4
CREATE(N)-[:FATHER]->(R)
CREATE(R)-[:SON]->(N);
MATCH(N),(R)
WHERE Id(N) = 1 AND Id(R) = 0
CREATE(N)-[:FATHER]->(R)
CREATE(R)-[:SON]->(N);
MATCH(N),(R)
WHERE Id(N) = 1 AND Id(R) = 3
CREATE(N)-[:FATHER]->(R)
CREATE(R)-[:DAUGHTER]->(N);
MATCH(N),(R)
WHERE Id(N) = 2 AND Id(R) = 0
CREATE(N)-[:MOTHER]->(R)
CREATE(R)-[:SON]->(N);
MATCH(N),(R)
WHERE Id(N) = 2 AND Id(R) = 3
CREATE(N)-[:MOTHER]->(R)
CREATE(R)-[:DAUGHTER]->(N);
MATCH(N),(R)
WHERE Id(N) = 1 AND Id(R) = 2
CREATE(N)-[:HUSBAND]->(R)
CREATE(R)-[:WIFE]->(N);
MATCH(N),(R)
WHERE Id(N) = 0 AND Id(R) = 3
CREATE(N)-[:HUSBAND]->(R)
CREATE(R)-[:WIFE]->(N);
MATCH(N),(R)
WHERE Id(N) = 4 AND Id(R) = 3
CREATE(N)-[:SON]->(R)
CREATE(R)-[:MOTHER]->(N);