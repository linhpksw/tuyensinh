import Container from "./Container";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { UserIcon, UsersIcon } from "@heroicons/react/24/outline";

const Confirmation = ({ data }) => {

    const listStudents = data.map((v, i) => (
        <>
            <div className="flex items-center gap-1">
                <UserIcon className="h-6 w-6 text-rose-600" />
                <h3 className="text-lg font-medium leading-6 text-rose-600">{data.length > 1 ? `Thông tin học sinh thứ ${i + 1}` : 'Thông tin học sinh'}</h3>
            </div>

            <div className="mt-5 mb-10 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                    <div className=" py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className=" font-medium text-gray-500">Họ và tên học sinh</dt>
                        <dd className="mt-1  text-gray-900 sm:col-span-2 sm:mt-0">{v.studentName}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="font-medium text-gray-500">Đăng kí lớp học</dt>
                        <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">{v.class}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="font-medium text-gray-500">Trường</dt>
                        <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">{v.school}</dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className=" font-medium text-gray-500">Số điện thoại học sinh</dt>
                        <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">{v.studentPhone}   </dd>
                    </div>
                </dl>
            </div>
        </>
    ))


    return (
        <Container>
            <main className="bg-white pt-14">

                <h1 className="text-base font-medium text-indigo-600">Cảm ơn quý phụ huynh!</h1>

                <div className="flex items-center gap-2 mt-3">
                    <p className="text-2xl lg:text-4xl font-bold tracking-tighter text-gray-900">Đăng kí học thành công</p>
                    <CheckBadgeIcon className="w-8 h-8 lg:w-10 lg:h-10 text-green-500" />
                </div>

                <p className="mt-3 text-base text-gray-500">Đơn đăng kí học cho học sinh {data.length === 1
                    ? data[0].studentName
                    : data.map((v, i) => {
                        if (i === data.length - 1) {
                            return ' và ' + v.studentName;
                        } else if (i === 0) {
                            return v.studentName;
                        } else {
                            return ', ' + v.studentName;
                        }
                    })} đã được trung tâm xác nhận.</p>

                <div className="mt-10">
                    {listStudents}

                    <div className=" flex items-center gap-1">
                        <UsersIcon className="h-6 w-6 text-rose-600" />
                        <h3 className="text-lg font-medium leading-6 text-rose-600">Thông tin phụ huynh</h3>
                    </div>

                    <div className="mt-5 border-t border-gray-200">
                        <dl className="sm:divide-y sm:divide-gray-200">
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                <dt className="font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">{data[0].email}</dd>
                            </div>
                            <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                                <dt className="font-medium text-gray-500">Số điện thoại dự phòng</dt>
                                <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">{data[0].backupPhone}</dd>
                            </div>

                        </dl>
                    </div>

                </div>
            </main>
        </Container>
    )
}

export default Confirmation