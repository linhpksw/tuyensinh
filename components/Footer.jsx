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
        <Container>
            {/* <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                {navigation.map((item) => (
                    <div key={item.name} className="px-5 py-2">
                        <a href={item.href} className="text-base text-gray-500 hover:text-gray-900">
                            {item.name}
                        </a>
                    </div>
                ))}
            </nav> */}
            <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-semibold flex justify-center mb-4 uppercase text-gray-600">Thông tin lớp học</h3>

                <div className="flex flex-col gap-5 md:flex-row md:justify-center md:items-center md:gap-20 mb-10 md:mb-20">

                    <div className="flex items-start md:items-center gap-2">
                        <MapPinIcon className="w-10 h-10 md:w-6 md:h-6 text-indigo-500" />

                        <p className="text-gray-500">
                            Địa chỉ: <Link className="text-indigo-500 hover:text-indigo-400" href='https://goo.gl/maps/proqtNoL24gvuNxy9'>Trường THPT DL Lê Hồng Phong - số 27 Tô Hiệu, Hà Đông</Link>
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <PhoneIcon className="w-6 h-6 text-indigo-500" />

                        <p className="text-gray-500">Điện thoại: <a href="tel:0362860970" className="text-indigo-500 hover:text-indigo-400 whitespace-nowrap">036 286 0970</a></p>
                    </div>
                </div>


                <div className="flex justify-center">
                    <Image src={logoImg} alt="logo" width={300} height={300} />
                </div>
                <p className="mt-1 text-center text-gray-400">&copy; All rights reserved.</p>
            </div>

        </Container>
    )
}

export default Footer