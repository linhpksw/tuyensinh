import { MongoClient } from 'mongodb';
const uri = 'mongodb+srv://linhpksw:Bmcmc20@tuyensinh.uptfdvd.mongodb.net/';
const client = new MongoClient(uri);

export default async function handler(req, res) {
    const body = req.body;
    const registerPhone = body[0].registerPhone;

    try {
        const database = client.db('tuyensinhdb');
        const student = database.collection('student');

        const docs = body.map((item) => {
            return {
                registerPhone: registerPhone,
                studentName: item.studentName,
                studentPhone: item.studentPhone,
                school: item.school,
                year: item.year,
                class: item.class,
                backupPhone: item.backupPhone,
                email: item.email,
            };
        });

        const result = await student.insertMany(docs, { ordered: true });

        if (result.insertedCount >= 1) {
            // Sends a HTTP success code
            res.status(200).json({ id: registerPhone });
        } else {
            res.status(400).json({ message: 'Insert failed' });
        }
    } catch (err) {
        console.error(err);
    } finally {
    }
}
