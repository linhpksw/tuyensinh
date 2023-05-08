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
                    <div className='flex items-center gap-1 mb-4'>
                        <UserIcon className="h-6 w-6 text-rose-600" />
                        <span className='text-rose-600 font-medium text-lg'>{numStudents == 1 ? 'Thông tin học sinh' : 'Thông tin học sinh thứ ' + i}</span>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input id={`studentName${i}`} type="text" name="studentName" className="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="studentName" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Họ và tên <span className='text-red-600'>*</span></label>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input id={`year${i}`} type="number" name="year" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="year" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Năm sinh <span className='text-red-600'>*</span></label>
                        </div>

                    </div>


                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input id={`school${i}`} type="text" name="school" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="school" className="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Trường <span className='text-red-600'>*</span></label>
                        </div>

                        <div className="relative z-0 w-full mb-6 group">
                            <input id={`studentPhone${i}`} type="tel" name="studentPhone" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />

                            <label htmlFor="studentPhone" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số điện thoại</label>
                        </div>
                    </div>

                    <div>
                        <select id={`class${i}`} className="mb-6 block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer" required>
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
                class: e.target[`class${i}`].value,
                backupPhone: e.target.backupPhone.value,
                email: e.target.email.value
            })
        }

        // Send the data to the server in JSON format.
        const JSONdata = JSON.stringify(data);

        // API endpoint where we send form data.
        const endpoint = '/api/form';

        // Form the request for sending data to the server.
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        };

        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options);

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json();

        // Redirect the user to the new student details page
        const { id } = result;

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
                                            <select id="quantity" value={numStudents} onChange={handleNumStudentsChange} className="mb-6 block py-2.5 px-0 w-full text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">

                                                {[1, 2, 3, 4, 5].map((num, id) =>
                                                    (<option key={id} value={num} className=" text-gray-500">Đăng kí cho {num} học sinh</option>)
                                                )}
                                            </select>
                                        </div>

                                        {numStudents > 0 && renderStudentFields()} {/* Render the student fields only if numStudents > 0 */}

                                        {/* Phan ko lap lai */}
                                        <div className='flex items-center gap-1 mb-4'>
                                            <UsersIcon className="h-6 w-6 text-rose-600" />
                                            <span className='text-rose-600 font-medium text-lg'>Thông tin phụ huynh</span>
                                        </div>

                                        <div className="grid md:grid-cols-2 md:gap-6">
                                            {/* Backup Phone */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="tel" name="backupPhone" id="backupPhone" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />

                                                <label htmlFor="backupPhone" className="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Số điện thoại dự phòng <span className='text-red-600'>*</span></label>
                                            </div>
                                            {/* Email */}
                                            <div className="relative z-0 w-full mb-6 group">
                                                <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                                <label htmlFor="email" className="peer-focus:font-medium absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email phụ huynh <span className='text-red-600'>*</span></label>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <button
                                                type="submit"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2  font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

                                            >
                                                Đăng ký
                                            </button>

                                            <button type="button" onClick={closeModal} class="text-rose-700 hover:text-white border border-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg  px-4 py-2 text-center mr-2 mb-2 ml-4">Huỷ đăng ký</button>


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
