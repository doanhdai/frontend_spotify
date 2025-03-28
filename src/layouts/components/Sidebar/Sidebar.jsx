import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGlobe, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { assets } from '@/assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import config from '@/configs';
import Language from '../Language/language';
import { useSelector } from 'react-redux';
import { use } from 'react';
import { getAllPlaylist } from '@/service/apiService';
import Item from '@/components/Item';

const Sidebar = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const headerRef = useRef();
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);

    const GetAllPlaylist = async () => {
        try {
            const response = await getAllPlaylist();
            setPlaylists(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        GetAllPlaylist();
    }, []);
    const handlerScroll = (e) => {
        const scrollTop = e.target.scrollTop;
        if (scrollTop > 0) {
            headerRef.current.style.boxShadow = '0 6px 10px rgba(0, 0, 0, .6)';
        } else {
            headerRef.current.style.boxShadow = 'none';
        }
    };

    return (
        <div className="w-[21%] h-full] p-2 flex-col gap-2 text-white hidden lg:flex">
            <div className="bg-[#121212] h-full rounded-xl">
                <div ref={headerRef}>
                    <div className="p-4 pt-5 flex items-center justify-between mx-2 z-10">
                        <div className="flex items-center gap-3">
                            <img className="w-6" src={assets.stack_icon} alt="" />
                            <p className="font-semibold">Thư viện</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Tippy content="Tạo danh sách phát hoặc thư mục">
                                <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#1f1f1f]">
                                    <img className="w-4" src={assets.plus_icon} alt="" />
                                </button>
                            </Tippy>
                            {isLoggedIn ? (
                                <Tippy content="Xem thêm">
                                    <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#1f1f1f]">
                                        <img className="w-4" src={assets.arrow_icon} alt="" />
                                    </button>
                                </Tippy>
                            ) : null}
                        </div>
                    </div>
                </div>
                {isLoggedIn ? (
                    <>
                        <div className="p-3 pt-2 flex items-center mx-1 text-[14px] gap-2 text-b">
                            <button className="bg-[#2a2a2a] text-white px-4 py-1.5 rounded-2xl cursor-pointer font-semibold hover:bg-[#333333] transition-colors transition-colors duration-200">
                                Danh sách phát
                            </button>
                            <button className="bg-[#2a2a2a] text-white px-4 py-1.5 rounded-2xl cursor-pointer font-semibold hover:bg-[#333333] transition-colors transition-colors duration-200">
                                Album
                            </button>
                        </div>
                        <div className="flex px-8 pl-5 justify-between mb-1">
                            <button className="text-[#b3b3b3] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#2a2a2a] hover:text-white">
                                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4" />
                            </button>
                            <button className="flex items-center gap-2 text-[#b3b3b3] hover:text-white hover:scale-105">
                                <span className="text-[14px] font-semibold">Gần đây</span>
                                <FontAwesomeIcon icon={faBars} />
                            </button>
                        </div>

                        <div className="px-1 py-1 mx-2 mt-1 rounded font-semibold flex flex-col">
                            {playlists.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex px-3 py-2 hover:bg-[#1f1f1f] rounded-lg"
                                    onClick={() => navigate(config.routes.playlist + `/${item.ma_playlist}`)}
                                >
                                    <img className="w-12 rounded mr-3" src={item.hinh_anh} alt="" />
                                    <div>
                                        <h5 className="text-white">{item.ten_playlist}</h5>
                                        <p className="line-clamp-1 text-[#b3b3b3] text-[14px]">
                                            Danh mục phát • {localStorage.getItem('name_user')}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div
                            className="h-[45%] flex flex-col gap-6 p-2 overflow-hidden overflow-y-auto"
                            onScroll={handlerScroll}
                        >
                            <section className="px-6 py-4 bg-[#1f1f1f] rounded-lg">
                                <div>
                                    <h1 className="text-white font-bold mb-2">Tạo danh sách phát đầu tiên của bạn</h1>
                                    <p className="text-[14px] mb-6">Rất dễ! Chúng tôi sẽ giúp bạn</p>
                                </div>
                                <div>
                                    <button
                                        className="text-[14px] text-black bg-white px-4 py-1 rounded-full font-bold hover:scale-105 hover:bg-[#f0f0f0]"
                                        onClick={() => navigate('/login')}
                                    >
                                        Tạo danh sách phát
                                    </button>
                                </div>
                            </section>
                            <section className="px-6 py-4 bg-[#1f1f1f] rounded-lg">
                                <div>
                                    <h1 className="text-white font-bold mb-2">
                                        Hãy cùng tìm và theo dõi một số podcast
                                    </h1>
                                    <p className="text-[14px] mb-6">
                                        Chúng tôi sẽ cập nhật cho bạn thông tin về các tập mới
                                    </p>
                                </div>
                                <div>
                                    <Link to={config.routes.genre + `/670655c188f507216de96d30`}>
                                        <button className="text-[14px] text-black bg-white px-4 py-1 rounded-full font-bold hover:scale-105 hover:bg-[#f0f0f0]">
                                            Duyệt xem podcast
                                        </button>
                                    </Link>
                                </div>
                            </section>
                        </div>
                    </>
                )}
                {isLoggedIn ? null : (
                    <div>
                        <div className="px-6 my-8">
                            <div className="flex flex-wrap">
                                <div className="mr-4 mb-2">
                                    <a href="" className="text-[11px] text-[#b3b3b3]">
                                        Pháp lý
                                    </a>
                                </div>
                                <div className="mr-4 mb-2">
                                    <a href="" className="text-[11px] text-[#b3b3b3]">
                                        Trung tâm an toàn và quyền riêng tư
                                    </a>
                                </div>
                                <div className="mr-4 mb-2">
                                    <a href="" className="text-[11px] text-[#b3b3b3]">
                                        Chính sách quyền riêng tư
                                    </a>
                                </div>
                                <div className="mr-4 mb-2">
                                    <a href="" className="text-[11px] text-[#b3b3b3]">
                                        Cookie
                                    </a>
                                </div>
                                <div className="mr-4 mb-2">
                                    <a href="" className="text-[11px] text-[#b3b3b3]">
                                        Giới thiệu Quảng cáo
                                    </a>
                                </div>
                                <div className="mr-4 mb-2">
                                    <a href="" className="text-[11px] text-[#b3b3b3]">
                                        Hỗ trợ tiếp cận
                                    </a>
                                </div>
                            </div>
                            <a href="" className="text-white text-[12px]">
                                Cookie
                            </a>
                        </div>
                        <div>
                            <Language />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
