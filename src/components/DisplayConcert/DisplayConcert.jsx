import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useContext, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { PlayerContext } from '@/context/PlayerContext';
import {
    faArrowUpFromBracket,
    faCheck,
    faCircleInfo,
    faEllipsis,
    faLocationDot,
    faPlus,
    faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { assets } from '@/assets/assets';
import Footer from '@/layouts/components/Footer';

function DisplayConcert() {
    const { concertsData } = useContext(PlayerContext);

    const { id } = useParams();

    const [concertData, setConcertData] = useState('');
    const [isCare, setIsCare] = useState(false);

    const displayConcertRef = useRef();
    const location = useLocation();
    const isConcert = location.pathname.includes('concert');
    const bgColor = concertData ? concertData.bgColor : '';

    useEffect(() => {
        if (concertData) {
            const date = new Date(concertData.date).toLocaleDateString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            const time = new Date(concertData.date).toLocaleTimeString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });
            document.title = `Vé xem ${concertData.name} tại ${concertData.address} vào lúc ${time} ngày ${date} | Spotify Playlist`;
        }
    });

    useEffect(() => {
        const concert = concertsData.find((item) => item._id === id);
        if (concert) {
            setConcertData(concert);
        }
    }, [id, concertsData]);

    useEffect(() => {
        if (isConcert && displayConcertRef.current) {
            displayConcertRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
        } else if (displayConcertRef.current) {
            displayConcertRef.current.style.background = `#121212`;
        }
    }, [isConcert, bgColor]);

    const handlerChangeCare = () => {
        const nextIsCare = !isCare;
        setIsCare(nextIsCare);

        if (nextIsCare) {
            toast.success('Đã thêm vào các sự kiện bạn quan tâm.');
        } else {
            toast.success('Đã xóa khỏi các sự kiện bạn quan tâm.');
        }
    };

    return concertData ? (
        <>
            <div
                ref={displayConcertRef}
                className="bg-[#121212] w-[79%] h-[97.4%] rounded-xl my-2 mr-2 py-4 pt-0 overflow-hidden overflow-y-auto"
            >
                <div className="px-6 mt-16">
                    <div
                        className="flex justify-center items-center text-white text-2xl font-bold w-36 h-14 rounded-xl"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.65)' }}
                    >
                        <h1>
                            <time>
                                {new Date(concertData.date).toLocaleDateString('vi-VN', {
                                    timeZone: 'Asia/Ho_Chi_Minh',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </time>
                        </h1>
                    </div>
                    <div className="mt-8">
                        <h1 className="text-white text-8xl font-bold">{concertData.name}</h1>
                    </div>
                </div>
                <div className="px-6 mt-16">
                    <h2 className="text-white text-2xl font-bold hover:underline cursor-pointer">
                        {concertData.address}
                    </h2>
                    <p className="text-[#b3b3b3] text-[14px] font-semibold">
                        {new Date(concertData.date).toLocaleDateString('vi-VN', {
                            timeZone: 'Asia/Ho_Chi_Minh',
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}{' '}
                        •{' '}
                        {new Date(concertData.date).toLocaleTimeString('vi-VN', {
                            timeZone: 'Asia/Ho_Chi_Minh',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: false,
                        })}
                    </p>
                </div>
                <div className="px-6 my-[38px] flex items-center gap-6 h-14">
                    <Tippy content="Bạn muốn lưu sự kiện cho sau này? Hãy nhấn vào đây">
                        {isCare ? (
                            <button
                                className="flex justify-center items-center bg-[#1ed760] text-black rounded-full border-[1px] border-black   px-4 py-1 font-bold text-[14px] hover:scale-105"
                                onClick={handlerChangeCare}
                            >
                                <FontAwesomeIcon icon={faCheck} className="mr-1" />
                                Quan tâm
                            </button>
                        ) : (
                            <button
                                className="flex justify-center items-center text-white rounded-full border-[1px] px-4 py-1 font-bold text-[14px] hover:scale-105"
                                onClick={handlerChangeCare}
                            >
                                <FontAwesomeIcon icon={faPlus} className="mr-1" />
                                Quan tâm
                            </button>
                        )}
                    </Tippy>
                    <Tippy content="Chia sẻ sự kiện này với bạn bè">
                        <button className="text-[#b3b3b3] text-xl p-3 ml-2 hover:scale-105 hover:text-white">
                            <FontAwesomeIcon icon={faArrowUpFromBracket} />
                        </button>
                    </Tippy>
                    <Tippy content="Chi tiết">
                        <button className="text-[#b3b3b3] text-xl p-3 hover:scale-105 hover:text-white">
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                    </Tippy>
                </div>
                <div className="px-6">
                    <h2 className="text-white font-bold text-2xl">Vé có bán tại</h2>
                    <div className="mt-6 group">
                        <a className="flex items-center" href="">
                            <div>
                                <img className="w-20 h-20 rounded-tl-md rounded-bl-md" src={assets.ticket} alt="" />
                            </div>
                            <div className="flex justify-between items-center bg-[#282828] py-[17.5px] gap-8 w-80 rounded-tr-md rounded-br-md">
                                <div className="ml-4">
                                    <h3 className="text-white font-bold text-[14px] group-hover:underline group-hover:text-white">
                                        Mở bán
                                    </h3>
                                    <p className="text-[#b3b3b3] font-semibold group-hover:underline ">Bandsintown</p>
                                </div>
                                <div className="mx-4 bg-[#1ed760] px-3 py-1 rounded-full hover:bg-[#3be477] hover:scale-105">
                                    <button className="flex items-center gap-2">
                                        <span className="text-[14px] font-bold group-hover:underline ">Tìm vé</span>
                                        <FontAwesomeIcon icon={faUpRightFromSquare} />
                                    </button>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="text-[12px] text-[#b3b3b3] mt-4">
                        <p>Spotify sẽ tính phí hoa hồng từ hoạt động bán vé trên nền tảng của chúng tôi.</p>
                        <p>Tất cả thời gian đều theo múi giờ địa phương của địa điểm.</p>
                    </div>
                </div>
                <div className="px-6 mt-16 mb-12">
                    <h2 className="text-white font-bold text-2xl">Venue</h2>
                    <div className="flex flex-col gap-4 mt-6">
                        <div className="flex items-center gap-3">
                            <div>
                                <FontAwesomeIcon icon={faLocationDot} className="text-white text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-white font-bold">{concertData.address.split(',')[0]}</h2>
                                <p className="text-[#1ed05e]">
                                    {concertData.address.split(',').slice(1).join(',').trim()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div>
                                <FontAwesomeIcon icon={faCircleInfo} className="text-white text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-white font-bold">
                                    Show at{' '}
                                    {new Date(concertData.date).toLocaleTimeString('vi-VN', {
                                        timeZone: 'Asia/Ho_Chi_Minh',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    ) : null;
}

export default DisplayConcert;
