import { assets } from '@/assets/assets';
import { getSongById } from '@/service/apiService';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { BsPlusLg } from 'react-icons/bs';
import { useLocation, useParams } from 'react-router-dom';
import { FaHeart, FaPlay, FaRegHeart } from 'react-icons/fa';
import { formatDate } from '@/Utils';
import { IoMdMore, IoMdPause } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch và useSelector
import { fetchSongDetails, playWithId, setPlayStatus } from '@/redux/Reducer/playerSlice'; // Import actions từ playerSlice

const DisplayDetaiSong = () => {
    const dispatch = useDispatch(); // Khởi tạo dispatch để gửi action
    const { playStatus, track } = useSelector((state) => state.player); // Lấy playStatus và track từ Redux store

    const [songData, setSongData] = useState([]);
    const [openPlaylist, setOpenPlaylist] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        getDetailSong();
    }, [id]); // Thêm id vào dependency để gọi lại API khi id thay đổi

    const getDetailSong = async () => {
        try {
            const response = await getSongById(id);
            setSongData(response.data);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết bài hát:', error);
        }
    };

    const displaySongRef = useRef();
    const bgColor = '#009933';
    const location = useLocation();
    const isSong = location.pathname.includes('song');

    useEffect(() => {
        if (isSong && displaySongRef.current) {
            displaySongRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
        } else if (displaySongRef.current) {
            displaySongRef.current.style.background = `#121212`;
        }
    }, [isSong, bgColor]);

    const handleOpenPlaylist = (e) => {
        e.stopPropagation();
        setOpenPlaylist(!openPlaylist);
    };

    // Hàm xử lý khi nhấn nút Play
    const handlePlay = async () => {
        if (songData?.id) {
            await dispatch(fetchSongDetails(songData.id)); 
            dispatch(playWithId(songData.id));
        }
    };

    const handlePause = () => {
        dispatch(setPlayStatus(false));
    };
    return (
        <>
            <div
                ref={displaySongRef}
                className="bg-[#121212] w-[79%] h-[97.4%] rounded-xl my-2 mr-2 overflow-hidden overflow-y-auto"
            >
                <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8 px-6">
                    <img className="w-48 h-48 rounded" src={songData.hinh_anh}></img>
                    <div className="flex flex-col justify-center">
                        <p className="text-[#ffffff]">Bài hát</p>
                        <h2 className="text-4xl text-[#ffffff] font-bold mb-4 md:text-7xl">{songData.ten_bai_hat}</h2>
                        <p className="mt-1 flex items-center">
                            <img className="w-5" src={assets.spotify_logo}></img>
                            <span className="pl-2 font-bold">{songData.ma_user?.name} -</span>
                            <span className="pl-2">{songData.like_count} yêu thích - </span>
                            <span className="pl-2">{songData.luot_nghe} lượt nghe - </span>
                            <span className="pl-2">{formatDate(songData.ngay_phat_hanh)}</span>
                        </p>
                        <p className="mt-4 flex items-center">{songData.ten_bai_hat}</p>
                    </div>
                </div>
                <div className="px-6">
                    <div className="mt-10">
                        <div className="flex gap-10 items-center ">
                            <button className="w-[60px] h-[60px] rounded-full bg-[#1ed760] flex justify-center items-center">
                                {playStatus && track?.id === songData.id ? (
                                    <IoMdPause onClick={handlePause} size={20} />
                                ) : (
                                    <FaPlay onClick={handlePlay} size={20} />
                                )}
                            </button>

                            {/* <button onClick={handleLike}>
                                {!hasLiked ? <FaRegHeart size={30} /> : <FaHeart color="red" size={30} />}
                            </button> */}
                            <div className="text-[15px] flex justify-center relative">
                                <IoAddCircleOutline onClick={handleOpenPlaylist} color="#00FF00" size={30} />
                                {openPlaylist && (
                                    <div
                                        className="absolute bottom-[40px] left-0 bg-gray-800 text-white p-2 rounded shadow-lg w-[250px] z-50"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div
                                            className="hover:bg-black p-2 cursor-pointer flex items-center gap-2"
                                            onClick={() => {
                                                // createNewPlaylist();
                                                setOpenPlaylist(false);
                                            }}
                                        >
                                            <BsPlusLg size={27} />
                                            Thêm và tạo mới playlist
                                        </div>
                                        <hr />
                                        {/* {playlistsData.map((playlist, index) => (
                                            <div
                                                key={index}
                                                className="hover:bg-black p-2 cursor-pointer flex items-center gap-2"
                                                onClick={() => {
                                                    addSongToPlaylist(playlist.ma_playlist);
                                                    setOpenPlaylist(false);
                                                }}
                                            >
                                                <img className="h-10" src={playlist.hinh_anh} alt="P" />
                                                <span>{playlist.ten_playlist}</span>
                                            </div>
                                        ))} */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10 flex flex-col gap-5 px-6">
                    <div className="flex items-center">
                        <img className="rounded-full h-[60px] text-[#fff]" src={songData.hinh_anh}></img>
                        <div className="ml-5 flex flex-col">
                            <h6 className="text-white">Nghệ sĩ</h6>
                            <b href="/artist" className="uppercase text-[#ffffff]">
                                {songData.ma_user?.name}
                            </b>
                        </div>
                    </div>
                </div>

                {/* <div className="mt-10 rounded-xl mb-5">
                    <div className="mx-4 py-4">
                        <h2 className="font-bold text-xl">Bình luận {comments.length}</h2>
                        {comments.length > 0 ? (
                            comments.map((comment) => {
                                const user = usersData.find((user) => user.ma_tk === comment.ma_tk);

                                return (
                                    <div key={comment.ma_binh_luan} className="flex items-center my-4 justify-between">
                                        <div className="flex items-center">
                                            <img
                                                className="rounded-full w-9 h-9"
                                                src={user?.anh_dai_dien}
                                                alt={user?.ten_user}
                                            />
                                            <div className="ml-4 flex flex-col">
                                                <div className="flex items-center">
                                                    <b className="text-[#E0066F]">{user?.ten_user || 'Ẩn danh'}</b>
                                                    <span className="ml-4 text-xs text-[#bbbbbb]">
                                                        {formatDate(comment.ngay_tao)}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-[#bbbbbb]">{comment.noi_dung}</p>
                                            </div>
                                        </div>
                                        {comment.ma_tk === `${currentAccount}` && (
                                            <div className="text-[15px] flex justify-center relative">
                                                <IoMdMore
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleMenu(comment.ma_binh_luan);
                                                    }}
                                                />
                                                {menuSongId === comment.ma_binh_luan && (
                                                    <div className="absolute bottom-8 right-0 bg-gray-800 text-white p-2 rounded shadow-lg !z-50 w-[80px]">
                                                        <div
                                                            onClick={() => handleDeleteComment(comment.ma_binh_luan)}
                                                            className="cursor-pointer flex items-center gap-2"
                                                        >
                                                            <AiOutlineDelete size={18} />
                                                            Xóa
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <p className=" text-[#bbbbbb] flex justify-center my-10 text-sm">Chưa có bình luận</p>
                        )}
                    </div>

                    <div className="flex flex-col pb-3 mx-4 relative">
                        <label htmlFor="comment">Viết bình luận</label>
                        <div className="relative">
                            <textarea
                                id="comment"
                                className="bg-black text-white p-2 rounded-lg h-10 border-pink-400 w-full pr-10"
                                value={commentContent}
                                onChange={(e) => setCommentContent(e.target.value)}
                                placeholder="Nhập bình luận..."
                            ></textarea>
                            <MdSend
                                onClick={handlePostComment}
                                className="absolute right-2 bottom-3.5 text-pink-500 cursor-pointer hover:text-pink-700"
                                size={20}
                            />
                        </div>
                    </div>
                </div> */}

                {/* <div className="mb-4 pt-6">
                    <div className="flex justify-between">
                        <h1 className="my-4 font-bold text-2xl">Bài hát đề xuất</h1>
                        <Link to="/artist" className="text-slate-200 font-bold mr-3 cursor-pointer hover:text-white">
                            {' '}
                            Xem tất cả
                        </Link>
                    </div>
                    <div className="flex overflow-auto">
                        {songs.map((item, index) => (
                            <SongItems
                                key={index}
                                name={item.ten_bai_hat}
                                desc={item.ten_bai_hat}
                                id={item.ma_bai_hat}
                                img={item.hinh_anh}
                            />
                        ))}
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default DisplayDetaiSong;
