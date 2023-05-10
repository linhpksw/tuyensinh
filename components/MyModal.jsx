import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment } from 'react'
import { UserIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router';

export default function MyModal({ onClose, registerPhone }) {
    const router = useRouter();

    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false);
        onClose(); // call the onClose function passed from MyForm
    }

    const [numStudents, setNumStudents] = useState(1);

    const handleNumStudentsChange = (e) => {
        setNumStudents(parseInt(e.target.value)); // parse the selected value as an integer
    };

    const classOptions = [
        'Chọn lớp học',
        'Lớp 8 chuyên toán',
        'Lớp 9A0 chuyên toán',
        'Lớp 9A1 chuyên toán',
        'Lớp 9A2 toán nâng cao'
    ];

    const renderStudentFields = () => {
        let fields = [];
        for (let i = 1; i <= numStudents; i++) {
            fields.push(

                <div key={i}>
                    <div className='flex items-center gap-1 mb-5'>
                        <UserIcon className="h-6 w-6 text-rose-600" />
                        <span className='text-rose-600 font-medium text-lg'>{numStudents == 1 ? 'Thông tin học sinh' : 'Thông tin học sinh thứ ' + i}</span>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6 ">
                        <div className="relative z-0 w-full mb-6 group">
                            <input id={`studentName${i}`} type="text" name="studentName" className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="studentName"
                                className=" peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6">Họ và tên <span className='text-red-600'>*</span></label>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input id={`year${i}`} type="number" name="year" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="year" className=" peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6">Năm sinh <span className='text-red-600'>*</span></label>
                        </div>

                    </div>


                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input id={`school${i}`} type="text" name="school" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="school" className=" peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6">Trường <span className='text-red-600'>*</span></label>
                        </div>


                        <div className="relative z-0 w-full mb-3 group">
                            <input id={`studentPhone${i}`} type="tel" name="studentPhone" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                            <label htmlFor="studentPhone" className=" peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6">Số điện thoại</label>
                        </div>
                    </div>

                    <div>
                        <select id={`subject${i}`} className="mb-5 block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-300 peer" required>
                            {classOptions.map((option) => (
                                <option key={option} value={option} className=' text-gray-500'>{option}</option>
                            ))}
                        </select>
                    </div>

                </div>
            );
        }
        return fields;
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = [];

        for (let i = 1; i <= numStudents; i++) {
            data.push({
                registerPhone: registerPhone,
                studentName: e.target[`studentName${i}`].value,
                studentPhone: e.target[`studentPhone${i}`].value,
                school: e.target[`school${i}`].value,
                year: e.target[`year${i}`].value,
                subject: e.target[`subject${i}`].value,
                backupPhone: e.target.backupPhone.value,
                email: e.target.email.value
            })
        }

        setIsLoading(true);
        const JSONdata = JSON.stringify(data);
        const endpoint = '/api/form';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        };

        const response = await fetch(endpoint, options);

        const result = await response.json();


        const { id } = result;

        setIsLoading(false);

        router.push(`/${id}`)
    }

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md lg:max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h1"
                                        className="text-2xl  font-bold text-gray-900 mb-4"
                                    >
                                        Phiếu đăng kí học tại lớp toán Câu lạc bộ Ánh Sáng
                                    </Dialog.Title>

                                    <form onSubmit={handleSubmit}>
                                        <div>
                                            <select id="quantity" value={numStudents} onChange={handleNumStudentsChange} className="mb-5 block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-300 peer">

                                                {[1, 2, 3, 4, 5].map((num, id) =>
                                                    (<option key={id} value={num} className=" text-gray-500">Đăng kí cho {num} học sinh</option>)
                                                )}
                                            </select>
                                        </div>

                                        {numStudents > 0 && renderStudentFields()} {/* Render the student fields only if numStudents > 0 */}

                                        {/* Phan ko lap lai */}
                                        <div className='flex items-center gap-1 mb-5'>
                                            <UsersIcon className="h-6 w-6 text-rose-600" />
                                            <span className='text-rose-600 font-medium text-lg'>Thông tin phụ huynh</span>
                                        </div>

                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            {/* Backup Phone */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="tel" name="backupPhone" id="backupPhone" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

                                                <label htmlFor="backupPhone" className=" peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6">Số điện thoại dự phòng <span className='text-red-600'>*</span></label>
                                            </div>
                                            {/* Email */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="email" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-1 peer-focus:scale-75 peer-focus:-translate-y-6">Email phụ huynh <span className='text-red-600'>*</span></label>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className={`inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2  font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${isLoading ? 'cursor-wait opacity-50' : ''}`}

                                            >
                                                {isLoading ? (
                                                    <>
                                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                                        </svg>
                                                        <span>Đang xử lý...</span>
                                                    </>
                                                ) : 'Đăng ký'}
                                            </button>


                                            <button type="button" onClick={closeModal} className="text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg  px-4 py-2 text-center mr-2 mb-2 ml-4">Huỷ đăng ký</button>
                                        </div>
                                    </form>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
