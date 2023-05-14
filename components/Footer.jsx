import Container from "./Container"
import logoImg from '../public/img/logo.svg'
import Image from "next/image"

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
                <div className="flex justify-center">
                    <Image src={logoImg} alt="logo" width={250} height={250} />
                </div>
                <p className="mt-4 text-center text-sm text-gray-400">&copy; 2023 Light Mathematics Club. All rights reserved.</p>
            </div>

        </Container>
    )
}

export default Footer