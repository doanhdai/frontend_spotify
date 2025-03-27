import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import TippyHeadless from '@tippyjs/react/headless';
import { useState, useEffect, useRef, useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircleDown } from '@fortawesome/free-regular-svg-icons';
import {
    faArrowUpRightFromSquare,
    faFolderOpen,
    faHouse,
    faMagnifyingGlass,
    fas,
} from '@fortawesome/free-solid-svg-icons';
import { assets } from '@/assets/assets';
import config from '@/configs';
import { useTranslation } from 'react-i18next';
import Search from '@/pages/Search';
import { useSelector } from 'react-redux';

function Header() {
    const inputRef = useRef(null);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const [isFocused, setIsFocused] = useState(false);
    const [username, setUsername] = useState('');
    const [targetUser, setTargetUser] = useState(false);
    const [hovering, setHovering] = useState(false);
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        } else {
            setUsername('Dai');
        }
    }, []);

    const handleFocus = () => {
        if (inputRef.current) inputRef.current.focus();
    };

    const handleBlur = () => {
        if (inputRef.current) inputRef.current.blur();
    };

    const handleSearch = (e) => {
        if (e.key === 'Enter' && searchTerm.trim() !== '') {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.reload();
    };

    return (
        <>
            <div className="w-full h-[8%] flex justify-between items-center font-semibold px-2 pt-2">
                <div className="ml-5 flex-1">
                    <Link to={config.routes.home}>
                        <img className="w-8 h-8" src={assets.spotify_logo} alt="" />
                    </Link>
                </div>

                <div className="flex flex-1 items-center gap-2 mr-24 focus:outline-white">
                    <Link to={config.routes.home}>
                        <Tippy content="Trang chủ">
                            <button className="text-black bg-[#1f1f1f] w-12 h-12 rounded-full flex justify-center items-center hover:scale-105">
                                <FontAwesomeIcon icon={faHouse} className="w-6 h-6 text-white" />
                            </button>
                        </Tippy>
                    </Link>
                    <Link to={config.routes.search} className="block w-full">
                        <div
                            className={`relative w-full h-[48px] rounded-full flex items-center gap-2 ${
                                isFocused ? 'outline outline-white outline-2' : ''
                            } bg-[#1f1f1f] text-[#b3b3b3]  transition-all duration-150 cursor-pointer hover:bg-[#2a2a2a]`}
                        >
                            <Tippy content="Tìm kiếm">
                                <div className="flex">
                                    <FontAwesomeIcon
                                        icon={faMagnifyingGlass}
                                        className="w-6 h-6 px-3 -hover:text-white transition-colors duration-200"
                                        onClick={handleFocus}
                                    />
                                </div>
                            </Tippy>
                            <input
                                ref={inputRef}
                                className="bg-transparent w-full h-full focus:outline-none"
                                type="text"
                                placeholder="Nhập tên bài hát..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                onKeyDown={handleSearch}
                            />
                            <div className="absolute right-[60px] h-[24px] w-[1px] bg-gray-500"></div>
                            <Tippy content="Duyệt tìm">
                                <div className="px-5 text-[#b3b3b3] relative hover:text-white hover:scale-110">
                                    <FontAwesomeIcon icon={faFolderOpen} />
                                </div>
                            </Tippy>
                        </div>
                    </Link>
                </div>

                <div className={`flex items-center gap-5 ${isLoggedIn ? '' : 'w-[446px] justify-end'}`}>
                    {isLoggedIn ? (
                        <>
                            <button className="bg-white text-black font-bold text-[14px] px-4 py-1.5 rounded-2xl hidden md:block hover:scale-105 hover:bg-[#f0f0f0]">
                                {t('header.premium')}
                            </button>
                            <button className="flex items-center bg-black text-white font-bold px-3 py-1.5 rounded-2xl text-[14px] cursor-pointer gap-2 hover:scale-105">
                                <FontAwesomeIcon icon={faCircleDown} />
                                {t('header.download')}
                            </button>
                            <Tippy content="Thông tin mới">
                                <button className="text-[#b3b3b3] hover:text-white hover:scale-110 cursor-pointer">
                                    <FontAwesomeIcon icon={faBell} className="h-4 w-4" />
                                </button>
                            </Tippy>
                            <TippyHeadless
                                interactive
                                visible={hovering || targetUser}
                                placement="bottom-end"
                                render={(attrs) => (
                                    <div
                                        className="box text-white text-[14px] font-semibold bg-[#282828] px-1 py-2 mr-1 rounded-md shadow-xl"
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        {targetUser ? (
                                            <div className="min-w-[196px] h-56">
                                                <button className="flex items-center justify-between w-full py-3 pl-3 pr-2 rounded-[4px] cursor-pointer hover:bg-[#ffffff1a]">
                                                    <span> {t('header.title')}</span>
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                </button>
                                                <Link to={config.routes.user + `/${localStorage.getItem('userId')}`}>
                                                    <button className="flex items-center justify-between w-full py-3 pl-3 pr-2 rounded-[4px] cursor-pointer hover:bg-[#ffffff1a]">
                                                        <span>{t('header.profile')}</span>
                                                    </button>
                                                </Link>
                                                <button className="flex items-center justify-between w-full py-3 pl-3 pr-2 rounded-[4px] cursor-pointer hover:bg-[#ffffff1a]">
                                                    <span>{t('header.updatePremium')}</span>
                                                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                                </button>
                                                <button className="flex items-center justify-between w-full py-3 pl-3 pr-2 rounded-[4px] border-b-[1px] rounded-b-[1px] cursor-pointer hover:bg-[#ffffff1a]">
                                                    <span>{t('header.setting')}</span>
                                                </button>
                                                <Link to={config.routes.home}>
                                                    <button
                                                        className="flex items-center justify-between w-full py-3 pl-3 pr-2 rounded-[4px] cursor-pointer hover:bg-[#ffffff1a]"
                                                        onClick={handleLogout}
                                                    >
                                                        <span>{t('header.logout')}</span>
                                                    </button>
                                                </Link>
                                            </div>
                                        ) : (
                                            username
                                        )}
                                    </div>
                                )}
                            >
                                <button
                                    className="text-black bg-[#1f1f1f] w-12 h-12 rounded-full flex justify-center items-center"
                                    onMouseEnter={() => setHovering(true)}
                                    onMouseLeave={() => setHovering(false)}
                                    onClick={() => {
                                        setTargetUser(!targetUser);
                                        setHovering(false);
                                    }}
                                >
                                    <span className="w-8 h-8 bg-[#f573a0] leading-8 rounded-full font-bold text-[14px]">
                                        {username ? username.charAt(0).toUpperCase() : 'N'}
                                    </span>
                                </button>
                            </TippyHeadless>
                        </>
                    ) : (
                        <>
                            <Link to={config.routes.login}>
                                <button className="bg-black text-[#b3b3b3] font-bold px-4 py-1.5 rounded-2xl hidden md:block hover:scale-105 hover:text-white">
                                    {t('header.login')}
                                </button>
                            </Link>
                            <Link to={config.routes.signup}>
                                <button className="flex items-center bg-white text-black font-bold px-8 py-3 rounded-full cursor-pointer gap-2 hover:scale-105">
                                    {t('header.register')}
                                </button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Header;
