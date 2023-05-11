import Hero from '@/components/Hero';
import Navbar from '@/components/NavBar';
import SectionTitle from '@/components/SectionTitle';
import TimeTable from '@/components/TimeTable';
import Head from 'next/head';

export default function Home() {
    return (
        <>
            <Head>
                <title>Câu lạc bộ Toán Ánh Sáng</title>
                <meta name='description' content='Trung tâm học toán chất lượng cao từ lớp 8 đến lớp 12' />
                <link rel='icon' href='/favicon.ico' />
            </Head>

            <Navbar />
            <Hero />

            <SectionTitle pretitle='Thời gian học' title='Với giờ giấc cố định trong suốt học kỳ'></SectionTitle>

            <TimeTable />
        </>
    );
}
