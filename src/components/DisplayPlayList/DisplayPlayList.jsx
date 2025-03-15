import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { useEffect, useRef, useContext, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowUpFromBracket,
    faArrowUpRightFromSquare,
    faBars,
    faCheck,
    faCircleExclamation,
    faCirclePlus,
    faCircleXmark,
    faEllipsis,
    faFolder,
    faList,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';

import { assets } from '@/assets/assets';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

function DisplayPlayList() {
    const songsData = [
        {
            id: '1',
            title: 'Blinding Lights',
            artist: 'The Weeknd',
            album: 'After Hours',
            duration: '3:22',
            cover: 'https://i.scdn.co/image/ab67616d00001e02c6c7bdbf89b1d6dd60f06c6d',
        },
        {
            id: '2',
            title: 'Save Your Tears',
            artist: 'The Weeknd',
            album: 'After Hours',
            duration: '3:35',
            cover: 'https://i.scdn.co/image/ab67616d00001e02c6c7bdbf89b1d6dd60f06c6d',
        },
        {
            id: '3',
            title: 'Peaches',
            artist: 'Justin Bieber ft. Daniel Caesar, Giveon',
            album: 'Justice',
            duration: '3:18',
            cover: 'https://i.scdn.co/image/ab67616d00001e02b1a7dc5311b62a3953802933',
        },
        {
            id: '4',
            title: 'Levitating',
            artist: 'Dua Lipa ft. DaBaby',
            album: 'Future Nostalgia',
            duration: '3:24',
            cover: 'https://i.scdn.co/image/ab67616d00001e02e08c49f0b49583663a3cf3a3',
        },
        {
            id: '5',
            title: 'Shape of You',
            artist: 'Ed Sheeran',
            album: 'Divide',
            duration: '3:53',
            cover: 'https://i.scdn.co/image/ab67616d00001e026d3e6c7a2b21e766f49b6b19',
        },
    ];
    const playlistsData = [
        {
            _id: '1',
            name: 'Top Hits 2025',
            desc: 'Những bài hát hot nhất năm 2025!',
            bgColor: '#ff5733',
            image: 'https://i.scdn.co/image/ab67616d00001e02ff12abf02387665490c5d1d5',
            songs: ['1', '2', '3'],
        },
        {
            _id: '2',
            name: 'Chill Vibes',
            desc: 'Những giai điệu nhẹ nhàng thư giãn.',
            bgColor: '#3498db',
            image: 'https://i.scdn.co/image/ab67616d00001e02d2921b24fd21c46a12a74d5f',
            songs: ['4', '5'],
        },
    ];

    const { id } = useParams();

    const [playlistData, setPlaylistData] = useState('');
    const [shortType, setShortType] = useState(false);
    const [target, setTarget] = useState(false);
    const [hovering, setHovering] = useState(false);

    const displayPlaylistRef = useRef();
    const location = useLocation();
    const isPlaylist = location.pathname.includes('playlist');
    const bgColor = playlistData ? playlistData.bgColor : '';

    useEffect(() => {
        const playlist = playlistsData.find((item) => item._id === id);
        if (playlist) {
            setPlaylistData(playlist);
        }
    }, [id, playlistsData]);

    useEffect(() => {
        if (isPlaylist && displayPlaylistRef.current) {
            displayPlaylistRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
        } else if (displayPlaylistRef.current) {
            displayPlaylistRef.current.style.background = `#121212`;
        }
    }, [isPlaylist, bgColor]);

    useEffect(() => {
        if (playlistData) {
            document.title = `${playlistData.name} | Spotify Playlist`;
        }
    });

    useEffect(() => {});

    return playlistData ? (
        <div
            ref={displayPlaylistRef}
            className={`bg-[#121212] w-[79%] h-[97.4%] rounded-xl my-2 mr-2 py-4 ${
                target ? 'overflow-hidden' : 'overflow-y-auto'
            }`}
        >
            <div className="px-6 mt-4 mb-9 flex flex-col md:flex-row md:items-end gap-8">
                <img className="w-48 rounded" src={assets.img13} alt="" />
                <div>
                    <p className="text-white mb-2">Playlist</p>
                    <h2 className="text-white text-5xl font-extrabold mb-4 md:text-6xl tracking-tight">
                        {playlistData.name}
                    </h2>
                    <h4 className="text-[#b3b3b3] font-medium">{playlistData.desc}</h4>
                    <p className="text-[#b3b3b3] mt-1 font-medium text-[14px]">
                        <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
                        <b className="text-white text-[14px]"> Spotify </b>• 50 bài hát , khoảng 3 giờ 30 phút
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-center px-6">
                <div className="flex gap-8">
                    <button className="flex justify-center items-center w-14 h-14 bg-[#1ed760] rounded-[50%] hover:bg-[#3be477] hover:scale-105">
                        <FontAwesomeIcon icon={faPlay} />
                    </button>
                    <Tippy content="Lưu vào thư viện">
                        <button className="text-[#b3b3b3] hover:text-white hover:scale-105">
                            <FontAwesomeIcon icon={faCirclePlus} className="w-8 h-8" />
                        </button>
                    </Tippy>

                    <TippyHeadless
                        interactive
                        visible={hovering || target}
                        placement="top-start"
                        render={(attrs) => (
                            <div
                                className="text-white text-[14px] font-semibold bg-[#282828] px-1 py-1 pb-2 mr-1 rounded-md shadow-xl"
                                tabIndex="-1"
                                {...attrs}
                            >
                                {target ? (
                                    <div className="min-w-[296px] h-[310px]">
                                        <button className="flex items-center gap-4 w-full text-[#b3b3b3] py-3 pl-3 pr-2 rounded-[4px] cursor-pointer hover:text-white hover:bg-[#ffffff1a]">
                                            <FontAwesomeIcon icon={faCirclePlus} />
                                            <span>Thêm vào thư viện</span>
                                        </button>
                                        <button className="flex items-center justify-between gap-4 w-full text-[#b3b3b3] py-3 pl-3 pr-2 rounded-[4px] cursor-pointer hover:text-white hover:bg-[#ffffff1a]">
                                            <div className="flex items-center gap-4">
                                                <FontAwesomeIcon icon={faCircleExclamation} />
                                                <span>Báo cáo</span>
                                            </div>
                                            <div>
                                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                                            </div>
                                        </button>
                                        <button className="flex items-center gap-4 w-full text-[#b3b3b3] py-3 pl-3 pr-2 rounded-[4px] cursor-pointer hover:text-white hover:bg-[#ffffff1a]">
                                            <FontAwesomeIcon icon={faCircleXmark} />
                                            <span>Loại bỏ khỏi hồ sơ sở thích của bạn</span>
                                        </button>
                                        <button className="flex items-center gap-4 w-full text-[#b3b3b3] py-3 pl-3 pr-2 rounded-[4px] cursor-pointer hover:text-white hover:bg-[#ffffff1a]">
                                            <FontAwesomeIcon icon={faFolder} />
                                            <span>Thêm vào thư mục</span>
                                        </button>
                                        <button className="flex items-center gap-4 w-full text-[#b3b3b3] py-3 pl-3 pr-2 rounded-[4px] cursor-pointer hover:text-white hover:bg-[#ffffff1a]">
                                            <FontAwesomeIcon icon={faArrowUpFromBracket} />
                                            <span>Chia sẻ</span>
                                        </button>
                                        <button className="flex items-center gap-4 w-full text-[#b3b3b3] py-3 pl-3 pr-2 rounded-[4px] cursor-pointer hover:text-white hover:bg-[#ffffff1a]">
                                            <FontAwesomeIcon icon={faArrowUpFromBracket} />
                                            <span>Giới thiệu về nội dung đề xuất</span>
                                        </button>
                                        <button className="flex items-center gap-4 w-full text-[#b3b3b3] py-3 pl-3 pr-2 rounded-[4px] cursor-pointer hover:text-white hover:bg-[#ffffff1a]">
                                            <FontAwesomeIcon icon={faSpotify} />
                                            <span>Mở trong ứng dụng dành cho máy tính</span>
                                        </button>
                                    </div>
                                ) : (
                                    <span>Các tùy chọn khác cho {playlistData.name}</span>
                                )}
                            </div>
                        )}
                    >
                        <button
                            onMouseEnter={() => setHovering(true)}
                            onMouseLeave={() => setHovering(false)}
                            onClick={() => {
                                setTarget(!target);
                                setHovering(false);
                            }}
                        >
                            <FontAwesomeIcon icon={faEllipsis} className="w-6 h-6 text-[#b3b3b3]" />
                        </button>
                    </TippyHeadless>
                </div>
                <div>
                    <TippyHeadless
                        interactive
                        placement="bottom-end"
                        trigger="click"
                        render={(attrs) => (
                            <div
                                className="bg-[#282828] w-40 h-32 p-1 rounded shadow-[0_16px_24px_0_rgba(0,0,0,0.3)]"
                                tabIndex="-1"
                                {...attrs}
                            >
                                <ul>
                                    <li>
                                        <span className="p-3 text-[#b3b3b3] text-[11px] font-bold">Xem dưới dạng</span>
                                    </li>
                                    <li>
                                        <button
                                            className="w-full text-white text-left p-3 pr-2 hover:bg-[#3e3e3e]"
                                            onClick={() => {
                                                setShortType(true);
                                            }}
                                        >
                                            {shortType ? (
                                                <>
                                                    <FontAwesomeIcon icon={faBars} className="mr-3 text-[#1fcc5d]" />
                                                    <span className="text-[14px] text-[#1fcc5d]">Rút gọn</span>
                                                    <FontAwesomeIcon icon={faCheck} className="ml-10 text-[#1fcc5d]" />
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faBars} className="mr-3" />
                                                    <span className="text-[14px]">Rút gọn</span>
                                                </>
                                            )}
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className="w-full text-white text-left p-3 pr-2 hover:bg-[#3e3e3e]"
                                            onClick={() => {
                                                setShortType(false);
                                            }}
                                        >
                                            {shortType ? (
                                                <>
                                                    <FontAwesomeIcon icon={faList} className="mr-3" />
                                                    <span className="text-[14px]">Danh sách</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon icon={faList} className="mr-3 text-[#1fcc5d]" />
                                                    <span className="text-[14px] text-[#1fcc5d]">Danh sách</span>
                                                    <FontAwesomeIcon icon={faCheck} className="ml-5 text-[#1fcc5d]" />
                                                </>
                                            )}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    >
                        <div className="flex justify-center items-center gap-3 text-[#b3b3b3] text-[14px] hover:text-white cursor-pointer">
                            <p>Danh sách</p>
                            <FontAwesomeIcon icon={faList} />
                        </div>
                    </TippyHeadless>
                </div>
            </div>
            {shortType ? (
                <div className="grid grid-cols-2 sm:grid-cols-[1.5fr_1fr_1fr_0.3fr] px-6 mt-10 mb-4 text-[#a7a7a7]">
                    <p className="font-semibold">
                        <b className="mr-4">#</b>Tiêu đề
                    </p>
                    <p className="font-semibold">Nghệ sĩ</p>
                    <p className="font-semibold">Album</p>
                    <img className="m-auto w-4" src={assets.clock_icon} alt="" />
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-[1.7fr_1fr_0.3fr] px-6 mt-10 mb-4 text-[#a7a7a7]">
                    <p className="font-semibold">
                        <b className="mr-4">#</b>Tiêu đề
                    </p>
                    <p className="font-semibold">Album</p>
                    <img className="m-auto w-4" src={assets.clock_icon} alt="" />
                </div>
            )}
            <hr className="mt-[-8px] mb-4 mx-6" />
            {songsData
                .filter(
                    (item) =>
                        Array.isArray(item.playlists) &&
                        item.playlists.some((playlist) => playlist.includes(playlistData?.name)),
                )
                .map((item, index) =>
                    shortType ? (
                        <div
                            key={index}
                            onClick={() => playWithId(item._id)}
                            className="grid grid-cols-2 sm:grid-cols-[1.5fr_1fr_1fr_0.3fr] gap-2 p-2 px-6 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                        >
                            <div className="flex items-center">
                                <b className="mr-4">{index + 1}</b>
                                <div>
                                    <p className="text-white font-semibold">{item.name}</p>
                                </div>
                            </div>
                            <div className="text-[15px] font-semibold">
                                <p>{item.artist}</p>
                            </div>
                            <div className="text-[15px] font-semibold">
                                <p>{item.albums}</p>
                            </div>
                            <div className="text-center">
                                <p>{item.duration}</p>
                            </div>
                        </div>
                    ) : (
                        <div
                            key={index}
                            onClick={() => playWithId(item._id)}
                            className="grid grid-cols-2 sm:grid-cols-[1.7fr_1fr_0.3fr] gap-2 p-2 px-6 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                        >
                            <div className="flex items-center">
                                <b className="mr-4">{index + 1}</b>
                                <img className="inline w-10 mr-5" src={item.image} alt="" />
                                <div>
                                    <p className="text-white font-semibold">{item.name}</p>
                                    <p className="text-[14px] font-semibold">{item.artist}</p>
                                </div>
                            </div>
                            <div className="text-[15px] font-semibold">
                                <p>{item.albums}</p>
                            </div>
                            <div className="text-center">
                                <p>{item.duration}</p>
                            </div>
                        </div>
                    ),
                )}
        </div>
    ) : null;
}

export default DisplayPlayList;

{
    /* task: click vào thì hiện tippy như web gốc */
    /* task: thêm tính năng lưu vào thư viện, hiện đúng thư viện  */
}
