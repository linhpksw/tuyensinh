import { MongoClient } from 'mongodb';
const uri = 'mongodb+srv://linhpksw:Bmcmc20@tuyensinh.uptfdvd.mongodb.net/';
const client = new MongoClient(uri);

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        res.status(405).end(); // Method Not Allowed
        return;
    }

    const body = req.body;
    const registerPhone = body[0].registerPhone;

    try {
        await client.connect();
        const database = client.db('tuyensinhdb');
        const student = database.collection('student');

        const updatePromises = body.map((item) => {
            const filter = { registerPhone: item.registerPhone };
            const updateDoc = {
                $set: {
                    studentName: item.studentName,
                    studentPhone: item.studentPhone,
                    school: item.school,
                    year: item.year,
                    subject: item.subject,
                    backupPhone: item.backupPhone,
                    email: item.email,
                },
            };
            return student.updateOne(filter, updateDoc);
        });

        const results = await Promise.all(updatePromises);

        if (results.every((result) => result.modifiedCount >= 1)) {
            res.status(200).json({ id: registerPhone });
        } else {
            res.status(400).json({ message: 'Update failed' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    } finally {
    }
}
