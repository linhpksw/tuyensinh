import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://linhpksw:Bmcmc20@tuyensinh.uptfdvd.mongodb.net/';
const client = new MongoClient(uri);

async function connect() {
    if (!client.isConnected()) {
        await client.connect();
    }
}

async function disconnect() {
    if (client.isConnected()) {
        await client.close();
    }
}

export { connect, disconnect, client };
