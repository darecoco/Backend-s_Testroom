const { MongoClient } = require('mongodb');

// MongoDB 연결
const uri = 'mongodb://localhost:27017'; // MongoDB 서버 주소
const dbName = 'testdb';

// MongoDB client 생성
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// MongoDB 서버 연결
async function connect() {
    try {
        await client.connect();
        console.log('Connected to the MongoDB server');
    } catch (err) {
        console.error('Error connecting to MongoDB : ', err);
    }
}

// 연결 함수 호출
connect();

test = [
    {
        name: '곤니치와',
        age: 18,
        school: 'high'
    },
    {
        name: '오하요',
        age: 13,
        school: 'low'
    },
    {
        name: '곤방와',
        age: 24,
        school: 'big'
    }
];

// 컬렉션 생성(미리 만든 test 활용)
const collection = client.db(dbName).collection('test');

// 데이터 추가
async function insertData() {
    for (const data of test) {
        const result = await collection.insertOne(data);
        console.log('추가완료 : ', result.insertedId);
    }
}

// 데이터 조회
async function findData() {
    const cursor = collection.find({name:'곤방와', age:24});
    await cursor.forEach(doc => console.log(doc));
}

// 데이터 추가 및 조회 함수 호출
async function performOperations() {
    await insertData();
    await findData();
}

// performOperations 함수 호출
performOperations();
