import { useState, useRef } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { assets } from '@/assets/assets';
import config from '@/configs';

function Player() {
    const [user, setUser] = useState(true);

    // Fake dữ liệu cho track
    const [track, setTrack] = useState({
        name: 'Shape of You',
        artist: 'Ed Sheeran',
        image: assets.default_track_image, // giả sử có một ảnh mặc định
    });

    // Trạng thái phát nhạc
    const [playStatus, setPlayStatus] = useState(false);

    // Thời gian giả lập
    const [time, setTime] = useState({
        currentTime: { minute: '01', second: '25' },
        totalTime: { minute: '03', second: '45' },
    });

    // Refs cho thanh tiến trình
    const seekBg = useRef(null);
    const seekBar = useRef(null);

    // Hàm xử lý điều khiển nhạc (fake)
    const play = () => setPlayStatus(true);
    const pause = () => setPlayStatus(false);
    const previous = () => console.log('Previous track');
    const next = () => console.log('Next track');
    const seekSong = () => console.log('Seeking song...');

    return user ? (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            <div className="hidden lg:flex items-center gap-4 w-64">
                <img className="w-12" src={track.image} alt="Track Cover" />
                <div>
                    <p>{track.name}</p>
                    <p className="text-[12px] text-[#b3b3b3]">{track.artist}</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4">
                    <Tippy content="Bật tính năng Trộn bài">
                        <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="Shuffle" />
                    </Tippy>
                    <Tippy content="Trước">
                        <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="Previous" />
                    </Tippy>
                    {playStatus ? (
                        <Tippy content="Tạm dừng">
                            <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="Pause" />
                        </Tippy>
                    ) : (
                        <Tippy content="Phát">
                            <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="Play" />
                        </Tippy>
                    )}
                    <Tippy content="Tiếp">
                        <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="Next" />
                    </Tippy>
                    <Tippy content="Lặp lại">
                        <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="Loop" />
                    </Tippy>
                </div>
                <div className="flex items-center gap-5">
                    <p>
                        {time.currentTime.minute}:{time.currentTime.second}
                    </p>
                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
                    >
                        <hr ref={seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full" />
                    </div>
                    <p>
                        {time.totalTime.minute}:{time.totalTime.second}
                    </p>
                </div>
            </div>

            <div className="hidden lg:flex items-center gap-4 opacity-75">
                <Tippy content="Chế độ xem Đang phát">
                    <img className="w-4 cursor-pointer hover:scale-105" src={assets.plays_icon} alt="Playing View" />
                </Tippy>
                <Tippy content="Lời bài hát">
                    <img className="w-4 cursor-pointer hover:scale-105" src={assets.mic_icon} alt="Lyrics" />
                </Tippy>
                <Tippy content="Danh sách chờ">
                    <img className="w-4 cursor-pointer hover:scale-105" src={assets.queue_icon} alt="Queue" />
                </Tippy>
                <Tippy content="Kết nối với một thiết bị">
                    <img className="w-4 cursor-pointer hover:scale-105" src={assets.speaker_icon} alt="Speaker" />
                </Tippy>
                <Tippy content="Âm lượng">
                    <img className="w-4 cursor-pointer" src={assets.volume_icon} alt="Volume" />
                </Tippy>
                <div className="w-20 bg-slate-50 h-1 rounded"></div>
                <img className="w-4 cursor-pointer hover:scale-105" src={assets.zoom_icon} alt="Zoom" />
            </div>
        </div>
    ) : (
        <div className="h-[10%]">
            <Link to={config.routes.signup}>
                <div className="h-[90%] bg-gradient-custom-player flex justify-between items-center text-white px-4 mx-2">
                    <div>
                        <h1 className="text-[14px] font-bold">Xem trước Spotify</h1>
                        <p className="font-semibold">
                            Đăng ký để nghe không giới hạn các bài hát và podcast với quảng cáo không thường xuyên.
                            Không cần thẻ tín dụng.
                        </p>
                    </div>
                    <div>
                        <button className="mr-2 bg-white text-black px-7 py-3 rounded-full font-bold hover:scale-105 hover:bg-[#f0f0f0]">
                            Đăng ký miễn phí
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Player;
