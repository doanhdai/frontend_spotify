import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Footer() {
    const socialIcons = [
        { icon: faInstagram, href: 'https://www.instagram.com/spotify' },
        { icon: faTwitter, href: 'https://x.com/spotify' },
        { icon: faFacebook, href: 'https://www.facebook.com/SpotifyVietnam/?brand_redir=6243987495' },
    ];

    return (
        <div className="flex-col px-8 pt-20 ">
            <div className="flex">
                <div className="flex flex-1">
                    <div className="w-48 h-44 mr-6 mb-8">
                        <ul>
                            <li className="text-white font-bold">Công ty</li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">Giới thiệu</Link>
                            </li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">Việc làm</Link>
                            </li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">For the Record</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-48 h-44 mr-6 mb-8">
                        <ul>
                            <li className="text-white font-bold">Cộng đồng</li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">
                                    Dành cho các Nghệ sĩ
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">Nhà phát triển</Link>
                            </li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">Quảng cáo</Link>
                            </li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">Nhà đầu tư</Link>
                            </li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">Nhà cung cấp</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-48 h-44 mr-6 mb-8">
                        <ul>
                            <li className="text-white font-bold">Liên kết hữu ích</li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">Hỗ trợ</Link>
                            </li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">
                                    Ứng dụng Di động Miễn phí
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-48 h-44 mr-6 mb-8">
                        <ul>
                            <li className="text-white font-bold">Các gói của Spotify</li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">
                                    Premium Individual
                                </Link>
                            </li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">Premium Student</Link>
                            </li>
                            <li className="mt-2">
                                <Link className="text-[#b3b3b3] hover:text-white hover:underline">Spotify Free</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex gap-4">
                    {socialIcons.map((social, index) => (
                        <a key={index} href={social.href} target="_blank" rel="noopener noreferrer">
                            <div className="flex justify-center items-center w-10 h-10 rounded-[50%] text-white bg-[#292929] cursor-pointer hover:bg-[#727272]">
                                <FontAwesomeIcon icon={social.icon} size="lg" className="text-white" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <hr className="mt-4 mb-9 border-0 border-t border-t-[1px] border-t-[#292929]" />
            <div className="mb-6 text-[14px]">
                <div className="flex">
                    <div className="flex-1">
                        <ul className="flex gap-5 text-[#b3b3b3]">
                            <li>
                                <a href="" className="hover:text-white">
                                    Pháp lý
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:text-white">
                                    Trung tâm an toàn và quyền riêng tư
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:text-white">
                                    Chính sách quyền riêng tư
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:text-white">
                                    Cookie
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:text-white">
                                    Giới thiệu Quảng cáo
                                </a>
                            </li>
                            <li>
                                <a href="" className="hover:text-white">
                                    Hỗ trợ tiếp cận
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="mr-4">
                        <span className="text-[14px] text-[#b3b3b3]">© 2024 Spotify AB</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
