import Container from "./Container"
import logoImg from '../public/img/logo.svg'
import Image from "next/image"

import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid"
import Link from "next/link"

const Footer = () => {
    const navigation = [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Jobs', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Accessibility', href: '#' },
        { name: 'Partners', href: '#' },
    ]

    return (
        <><Container>
            {/* <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                {navigation.map((item) => (
                    <div key={item.name} className="px-5 py-2">
                        <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                        </a>
                    </div>
                ))}
            </nav> */}

            <h3 id="infor" className="text-2xl md:text-3xl font-semibold flex justify-center mb-4 uppercase text-gray-600">Thông tin lớp học</h3>

            <div className="flex flex-col gap-5 md:flex-row md:justify-center md:items-center md:gap-20 mb-14 md:mb-20">

                <div className="flex items-start md:items-center gap-2">
                    <MapPinIcon className="w-10 h-10 sm:w-8 sm:h-8 md:w-7 md:h-7 text-indigo-500" />

                    <p className="text-gray-500">
                        Địa chỉ: <Link className="text-indigo-500 hover:text-indigo-400" href='https://goo.gl/maps/proqtNoL24gvuNxy9'>Trường THPT DL Lê Hồng Phong - số 27 Tô Hiệu, Hà Đông</Link>
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <PhoneIcon className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />

                    <p className="text-gray-500">Điện thoại: <a href="tel:0362860970" className="text-indigo-500 hover:text-indigo-400 whitespace-nowrap">036 286 0970</a></p>
                </div>
            </div>
        </Container>

            <div className="bg-black py-5 -mt-8 sm:py-10">
                <div className="flex justify-center md:hidden">
                    <Image src={logoImg} alt="logo" width={200} height={200} />
                </div>

                <div className="hidden md:flex justify-center">
                    <Image src={logoImg} alt="logo" width={300} height={300} />
                </div>
                <p className="mt-1 text-sm md:text-base text-center text-gray-200">2023 &copy; All rights reserved.</p>
            </div>

        </>

    )
}

export default Footer