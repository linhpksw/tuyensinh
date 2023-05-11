import { client } from '@/lib/mongodb';

(async function connectToDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
})();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { registerPhone } = req.query;

        try {
            const database = client.db('tuyensinhdb');
            const studentsCollection = database.collection('student');

            const query = { registerPhone: registerPhone };
            const options = {
                projection: { _id: 0 },
            };

            const cursor = studentsCollection.find(query, options);
            const students = await cursor.toArray();

            res.status(200).json(students);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching data from database', error });
        } finally {
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
