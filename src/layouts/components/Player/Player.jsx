import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useContext, useState } from 'react';
import { PlayerContext } from '@/context/PlayerContext';
import { assets } from '@/assets/assets';
import { Link } from 'react-router-dom';
import config from '@/configs';

function Player() {
    const { track, time, seekBg, seekBar, playStatus, play, pause, previous, next, seekSong } =
        useContext(PlayerContext);

    const [user, setUser] = useState(true);

    return user ? (
        <div className="h-[10%] bg-black flex justify-between items-center text-white px-4">
            <div className="hidden lg:flex items-center gap-4 w-64">
                <img className="w-12" src={track ? track.image : null} alt="" />
                <div>
                    <p>{track ? track.name : null}</p>
                    <p className="text-[12px] text-[#b3b3b3]">{track ? track.artist : null}</p>
                </div>
            </div>

            <div className="flex flex-col items-center gap-1 m-auto">
                <div className="flex gap-4">
                    {track ? (
                        <Tippy content="Bật tính năng Trộn bài cho Bài hát đã thích">
                            <img className="w-4 cursor-pointer" src={assets.shuffle_icon} alt="" />
                        </Tippy>
                    ) : (
                        <img
                            className="w-4 cursor-not-allowed"
                            src={assets.shuffle_icon}
                            alt=""
                            style={{ filter: 'grayscale(100%) brightness(50%)' }}
                        />
                    )}

                    {track ? (
                        <Tippy content="Trước">
                            <img onClick={previous} className="w-4 cursor-pointer" src={assets.prev_icon} alt="" />
                        </Tippy>
                    ) : (
                        <img
                            className="w-4 cursor-not-allowed"
                            src={assets.prev_icon}
                            alt=""
                            style={{ filter: 'grayscale(100%) brightness(50%)' }}
                        />
                    )}

                    {playStatus ? (
                        track ? (
                            <Tippy content="Tạm dừng">
                                <img onClick={pause} className="w-4 cursor-pointer" src={assets.pause_icon} alt="" />
                            </Tippy>
                        ) : (
                            <img
                                className="w-4 cursor-not-allowed"
                                src={assets.pause_icon}
                                alt=""
                                style={{ filter: 'grayscale(100%) brightness(50%)' }}
                            />
                        )
                    ) : track ? (
                        <Tippy content="Phát">
                            <img onClick={play} className="w-4 cursor-pointer" src={assets.play_icon} alt="" />
                        </Tippy>
                    ) : (
                        <img
                            className="w-4 cursor-not-allowed"
                            src={assets.play_icon}
                            alt=""
                            style={{ filter: 'grayscale(100%) brightness(50%)' }}
                        />
                    )}

                    {track ? (
                        <Tippy content="Tiếp">
                            <img onClick={next} className="w-4 cursor-pointer" src={assets.next_icon} alt="" />
                        </Tippy>
                    ) : (
                        <img
                            className="w-4 cursor-not-allowed"
                            src={assets.next_icon}
                            alt=""
                            style={{ filter: 'grayscale(100%) brightness(50%)' }}
                        />
                    )}

                    {track ? (
                        <Tippy content="Kích hoạt chế độ lặp lại">
                            <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
                        </Tippy>
                    ) : (
                        <img
                            className="w-4 cursor-not-allowed"
                            src={assets.loop_icon}
                            alt=""
                            style={{ filter: 'grayscale(100%) brightness(50%)' }}
                        />
                    )}
                </div>
                <div className="flex items-center gap-5">
                    <p
                        style={{
                            filter: track ? 'none' : 'grayscale(100%) brightness(50%)',
                        }}
                    >
                        {time.currentTime.minute}:{time.currentTime.second}
                    </p>
                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-auto"
                        style={{
                            filter: track ? 'none' : 'grayscale(100%) brightness(50%)',
                        }}
                    >
                        <hr ref={seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full" />
                    </div>
                    <p
                        style={{
                            filter: track ? 'none' : 'grayscale(100%) brightness(50%)',
                        }}
                    >
                        {time.totalTime.minute}:{time.totalTime.second}
                    </p>
                </div>
            </div>

            <div className="hidden lg:flex items-center gap-4 opacity-75">
                {track ? (
                    <Tippy content="Chế độ xem Đang phát">
                        <img className="w-4 cursor-pointer hover:scale-105" src={assets.plays_icon} alt="" />
                    </Tippy>
                ) : (
                    <img
                        className="w-4 cursor-not-allowed"
                        src={assets.plays_icon}
                        alt=""
                        style={{ filter: 'grayscale(100%) brightness(50%)' }}
                    />
                )}
                {track ? (
                    <Tippy content="Lời bài hát">
                        <img className="w-4 cursor-pointer hover:scale-105" src={assets.mic_icon} alt="" />
                    </Tippy>
                ) : (
                    <img
                        className="w-4 cursor-not-allowed"
                        src={assets.mic_icon}
                        alt=""
                        style={{ filter: 'grayscale(100%) brightness(50%)' }}
                    />
                )}
                <Tippy content="Danh sách chờ">
                    <img className="w-4 cursor-pointer hover:scale-105" src={assets.queue_icon} alt="" />
                </Tippy>
                <Tippy content="Kết nối với một thiết bị">
                    <img className="w-4 cursor-pointer hover:scale-105" src={assets.speaker_icon} alt="" />
                </Tippy>
                {track ? (
                    <Tippy content="Tắt tiếng">
                        <img className="w-4 cursor-pointer" src={assets.volume_icon} alt="" />
                    </Tippy>
                ) : (
                    <img
                        className="w-4 cursor-not-allowed"
                        src={assets.volume_icon}
                        alt=""
                        style={{ filter: 'grayscale(100%) brightness(50%)' }}
                    />
                )}
                <div
                    className="w-20 bg-slate-50 h-1 rounded"
                    style={{
                        filter: track ? 'none' : 'grayscale(100%) brightness(50%)',
                    }}
                ></div>
                <img
                    className={`w-4 ${
                        track ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed hover:opacity-45'
                    }`}
                    src={assets.zoom_icon}
                    alt=""
                    style={{
                        filter: track ? 'none' : 'grayscale(100%) brightness(50%)',
                    }}
                />
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
