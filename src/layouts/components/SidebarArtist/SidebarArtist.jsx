import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import config from '@/configs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMusic, faList, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllPlaylist } from '@/service/apiService';

const SidebarArtist = () => {

    return (
        <div className="w-[17.5%] h-[100%] rounded-xl bg-black p-4 text-white hidden lg:flex flex-col">
            <ul className="space-y-2">
                <li className="group">
                    <button className="flex items-center justify-between w-full p-3 rounded-lg bg-[#1f1f1f] hover:bg-[#333]">
                        <span className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faUsers} /> Danh sách âm nhạc
                        </span>
                        <FontAwesomeIcon icon={faChevronDown} className="group-hover:rotate-180 transition-transform" />
                    </button>
                    <ul className="hidden group-hover:block pl-5 space-y-1 mt-2">
                        <li><Link to={config.routes.artist_song} className="block p-2 hover:bg-[#2a2a2a] rounded">Bài hát</Link></li>
                        <li><Link to={config.routes.artist_album} className="block p-2 hover:bg-[#2a2a2a] rounded">Album</Link></li>
                        <li><Link to={config.routes.artist_playlist} className="block p-2 hover:bg-[#2a2a2a] rounded">Playlist</Link></li>
                    </ul>
                </li>
                <li className="">
                    <Link to={config.routes.artist_createform} className="flex items-center justify-between w-full p-3 rounded-lg bg-[#1f1f1f] hover:bg-[#333]">
                        <span className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faMusic} /> Tạo danh sách phát
                        </span>
                    </Link>
                </li>
                <li className='group'>
                    <button className="flex items-center justify-between w-full p-3 rounded-lg bg-[#1f1f1f] hover:bg-[#333]">
                        <span className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faMusic} /> Thống kê
                        </span>
                        <FontAwesomeIcon icon={faChevronDown} className="group-hover:rotate-180 transition-transform" />
                    </button>
                    <ul className="hidden group-hover:block pl-5 space-y-1 mt-2">
                        <li><Link to={config.routes.artist_listens} className="block p-2 hover:bg-[#2a2a2a] rounded">Lượt nghe</Link></li>
                        <li><Link to={config.routes.artist_turnover} className="block p-2 hover:bg-[#2a2a2a] rounded">Doanh thu</Link></li>
                    </ul>    
                </li>
            </ul>
        </div>
    );
};

export default SidebarArtist;
