import { client } from '@/lib/mongodb';

try {
    await client.connect();
    console.log('Connected to MongoDB');
} catch (err) {
    console.error('Failed to connect to MongoDB', err);
}

export default async function handler(req, res) {
    if (req.method !== 'PUT') {
        res.status(405).end(); // Method Not Allowed
        return;
    }

    const { body } = req;

    try {
        const database = client.db('tuyensinhdb');
        const student = database.collection('student');

        for (let i = 0; i < body.length; i++) {
            const item = body[i];
            const filter = { studentId: item.studentId };

            const updateDoc = {
                $set: {
                    registerPhone: item.registerPhone,
                    studentName: item.studentName,
                    studentPhone: item.studentPhone,
                    school: item.school,
                    year: item.year,
                    subject: item.subject,
                    backupPhone: item.backupPhone,
                    email: item.email,
                },
            };

            const result = await student.updateOne(filter, updateDoc);

            if (result.matchedCount != 1) {
                res.status(400).json({ message: 'Update failed' });
            }
        }

        res.status(200).json({ status: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    } finally {
    }
}
