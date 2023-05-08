import Image from 'next/image';

import heroImg from '@/public/img/hero.jpg';
import Container from '@/components/Container';
import { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import MyModal from './MyModal';

const Hero = () => {
    const [isCorrect, setIsCorrect] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [registerPhone, setRegisterPhone] = useState('');


    const handleForm = (e) => {
        e.preventDefault();

        const inputRegisterPhone = e.target.phone.value;

        const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;


        if (regexPhoneNumber.test(inputRegisterPhone)) {
            setIsCorrect(true);
            setShowModal(true);
            setRegisterPhone(inputRegisterPhone);
        } else {
            setIsCorrect(false);
        }
    }

    const closeModal = () => {
        setShowModal(false); // set showModal state to false when the modal is closed
    };


    return (
        <>
            <Container className='flex items-start flex-wrap lg:flex-nowrap lg:gap-10'>
                <div className='flex items-center w-full lg:w-1/2'>
                    <div className='max-w-2xl mb-8 lg:mb-0'>
                        <h1 className='text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight '>
                            Câu lạc bộ Toán Ánh Sáng
                        </h1>
                        <p className='py-5 text-base leading-relaxed text-gray-500 lg:text-lg '>
                            Kính gửi các quý vị phụ huynh học sinh và các con!{"\n"}

                            Năm học 2023-2024 CLB Ánh Sáng tổ chức: 2 lớp toán 8 ôn thi vào chuyên toán, 2 lớp 9 ôn thi vào chuyên toán và 1 lớp 9 nâng cao ôn thi toán điều kiện vào 10,  có kiểm tra đầu vào để xếp lớp.

                        </p>

                        <form onSubmit={handleForm} className='mt-5 sm:flex sm:w-full sm:max-w-lg'>
                            <div className='min-w-0 flex-1'>
                                <label htmlFor='hero-email' className='sr-only'>
                                    Phone
                                </label>
                                <input
                                    id='phone'
                                    type='text'
                                    className='block w-full rounded-md border border-gray-300 px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-rose-500 focus:ring-rose-500'
                                    placeholder='Nhập số điện thoại phụ huynh'
                                />

                                {!isCorrect &&
                                    <div className='flex items-center gap-2 mt-2'>
                                        <ExclamationCircleIcon className='h-5 w-5 text-red-500' />

                                        <span className='text-red-500'>Số điện thoại không hợp lệ</span>
                                    </div>

                                }
                            </div>
                            <div className='mt-4 sm:mt-0 sm:ml-3'>
                                <button
                                    type='submit'
                                    className='block w-full rounded-md border border-transparent bg-rose-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 sm:px-10'>
                                    Đăng ký học
                                </button>
                            </div>
                        </form>

                        {/* bug here */}

                        {showModal && <MyModal onClose={closeModal} registerPhone={registerPhone} />}
                    </div>
                </div>

                <div className='flex items-center justify-center w-full lg:w-1/2'>
                    <div className=''>
                        <Image
                            src={heroImg}
                            width='616'
                            height='617'
                            className={'object-cover'}
                            alt='Hero Illustration'
                            loading='eager'
                            placeholder='blur'
                        />
                    </div>
                </div>
            </Container>

        </>
    );
};


export default Hero;
