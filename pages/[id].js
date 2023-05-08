import { useRouter } from 'next/router';

import { MongoClient } from 'mongodb';
import Confirmation from '@/components/Confirmation';
const uri = 'mongodb+srv://linhpksw:Bmcmc20@tuyensinh.uptfdvd.mongodb.net/';
const client = new MongoClient(uri);

export default function StudentDetails(props) {
    const router = useRouter();
    const { id } = router.query; // Get the ID from the URL path
    const { data } = props;

    return <Confirmation data={data} />;
}

export async function getServerSideProps(context) {
    const { id } = context.query; // Get the ID from the URL path

    // Fetch the student data from the database based on the ID
    try {
        const database = client.db('tuyensinhdb');
        const student = database.collection('student');

        const query = { registerPhone: id };
        const options = {
            projection: { _id: 0 },
        };

        const cursor = student.find(query, options);

        if ((await student.countDocuments(query)) === 0) {
            console.log('No documents found!');
        }

        let docs = [];

        for await (const doc of cursor) {
            docs.push(doc);
        }

        // Pass the student data as props to the StudentDetails component
        return {
            props: {
                data: docs,
            },
        };
    } catch (err) {
        console.error(err);
    } finally {
    }
}
