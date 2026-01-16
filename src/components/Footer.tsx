import { IoFastFood, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5'

export default function Footer() {
    return (
        <footer className="bg-linear-to-r from-gray-100 via-orange-200 to-gray-100">
            <div className="max-w-7xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    <div className="flex gap-2">
                        <IoFastFood size={30} className="text-orange-400" />
                        <h1 className="text-3xl font-bold">Melp</h1>
                    </div>
                    <p className="max-w-xs mt-4 text-center">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, accusantium.
                    </p>
                    <div className="flex justify-center mt-8 space-x-6 text-gray-600">
                        <a className="hover:opacity-75" href="#">
                            <span className="sr-only"> Facebook </span>
                            <IoLogoFacebook size={25} className="text-black" />
                        </a>
                        <a className="hover:opacity-75" href="#">
                            <span className="sr-only"> Instagram </span>
                            <IoLogoInstagram size={25} className="text-black" />
                        </a>
                        <a className="hover:opacity-75" href="#">
                            <span className="sr-only"> Twitter </span>
                            <IoLogoTwitter size={25} className="text-black" />
                        </a>
                    </div>
                </div>
                <p className="mt-8 text-center">
                    © 2026 Melp
                </p>
            </div>
        </footer>
    )
}
