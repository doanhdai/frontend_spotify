import { useContext, useEffect, useRef, useState } from 'react';
import PlayList from '@/components/PlayList';
import Artist from '@/components/Artist';
import Item from '@/components/Item';
import { PlayerContext } from '@/context/PlayerContext';
import { assets } from '@/assets/assets';
import Footer from '@/layouts/components/Footer';

function Home() {
    const { artistsData, playlistsData, albumsData, scrollHomeRef, bgHomeHeader, user } = useContext(PlayerContext);

    const topRef = useRef();

    const [all, setAll] = useState(true);
    const [music, setMusic] = useState(false);
    const [podcasts, setPodcasts] = useState(false);

    const handlerScroll = () => {
        if (scrollHomeRef.current.scrollTop > 0) {
            bgHomeHeader.current.style.background = '#21115f';
        } else {
            bgHomeHeader.current.style.background = 'transparent';
        }
    };

    useEffect(() => {
        document.title = 'Spotify - Web Player: Music for everyone';
        console.log(topRef);
    }, []);

    return (
        <>
            <div
                ref={scrollHomeRef}
                onScroll={handlerScroll}
                className={`${
                    user ? 'bg-gradient-custom-home' : 'bg-[#121212]'
                } w-[79%] h-[97.4%] rounded-xl my-2 mr-2 py-4 pt-0 overflow-hidden overflow-y-auto`}
            >
                <div ref={topRef}></div>
                {user ? (
                    <div
                        ref={bgHomeHeader}
                        className="flex items-center w-full gap-2 px-6 py-4 rounded-t-xl font-medium bg-transparent sticky top-0 z-10"
                    >
                        <p
                            className={` ${
                                all ? 'bg-white text-black' : 'bg-[#382a6c] text-white hover:bg-[#3f3371]'
                            }  px-4 py-1 rounded-2xl cursor-pointer`}
                            onClick={() => {
                                setAll(true);
                                setMusic(false);
                                setPodcasts(false);
                                topRef.current.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Tất cả
                        </p>
                        <p
                            className={`${
                                music
                                    ? 'bg-white text-black hover:bg-none'
                                    : 'bg-[#382a6c] text-white hover:bg-[#3f3371]'
                            } px-4 py-1 rounded-2xl  transition-colors duration-200 cursor-pointer`}
                            onClick={() => {
                                setMusic(true);
                                setAll(false);
                                setPodcasts(false);
                                topRef.current.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Âm nhạc
                        </p>
                        <p
                            className={`${
                                podcasts
                                    ? 'bg-white text-black hover:bg-none'
                                    : 'bg-[#382a6c] text-white hover:bg-[#3f3371]'
                            } px-4 py-1 rounded-2xl  transition-colors duration-200 cursor-pointer`}
                            onClick={() => {
                                setPodcasts(true);
                                setAll(false);
                                setMusic(false);
                                topRef.current.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Podcasts
                        </p>
                    </div>
                ) : null}

                {user ? (
                    <div className="flex px-6 py-4 mb-12">
                        <div className="flex items-center w-96  cursor-pointer">
                            <img className="w-16 rounded-tl-[4px] rounded-bl-[4px]" src={assets.liked_songs} alt="" />
                            <div className="bg-[#33295c] px-4 py-5 w-full rounded-tr-[4px] rounded-br-[4px] -hover:bg-[#fff3] transition-colors duration-300">
                                <h4 className="text-white font-semibold">Bài hát đã thích</h4>
                            </div>
                        </div>
                        <div className="flex items-center w-96 ml-6  cursor-pointer">
                            <img
                                className="w-16 rounded-tl-[4px] rounded-bl-[4px]"
                                src={assets.NgayEmDepNhatRadio}
                                alt=""
                            />
                            <div className="bg-[#33295c] px-4 py-5 w-full rounded-tr-[4px] rounded-br-[4px] -hover:bg-[#fff3] transition-colors duration-300">
                                <h4 className="text-white font-semibold">Ngày Em Đẹp Nhất Radio</h4>
                            </div>
                        </div>
                    </div>
                ) : null}

                {user ? (
                    <div className="px-6 mb-4 mt-8">
                        <div className="flex items-center justify-between text-white mb-2">
                            <h1 className=" font-bold text-2xl hover:underline cursor-pointer">
                                Dành cho {localStorage.getItem('username')}
                            </h1>
                            <p className="text-[14px] font-bold hover:underline cursor-pointer mr-7">Hiện tất cả</p>
                        </div>
                        <div className="flex overflow-auto space-x-2 ml-[-6px]">
                            {playlistsData.slice(0, 7).map((item, index) => (
                                <PlayList
                                    key={index}
                                    id={item._id}
                                    image={item.image}
                                    name={item.name}
                                    desc={item.desc}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}

                {user ? (
                    <div className="px-6 mb-4 mt-8">
                        <div className="flex items-center justify-between text-white mb-2">
                            <h1 className=" font-bold text-2xl hover:underline cursor-pointer">
                                Tuyển tập hàng đầu của bạn
                            </h1>
                            <p className="text-[14px] font-bold hover:underline cursor-pointer mr-7">Hiện tất cả</p>
                        </div>
                        <div className="flex overflow-auto space-x-2 ml-[-6px]">
                            {playlistsData.slice(14, 21).map((item, index) => (
                                <PlayList
                                    key={index}
                                    id={item._id}
                                    image={item.image}
                                    name={item.name}
                                    desc={item.desc}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}

                <div className="px-6 mb-4 mt-8">
                    <div className="flex items-center justify-between text-white mb-2">
                        <h1 className=" font-bold text-2xl hover:underline cursor-pointer">
                            {user ? 'Nghệ sĩ yêu thích của bạn' : 'Nghệ sĩ phổ biến'}
                        </h1>
                        <p className="text-[14px] font-bold hover:underline cursor-pointer mr-7">Hiện tất cả</p>
                    </div>
                    <div className="flex overflow-auto space-x-2 ml-[-6px]">
                        {user
                            ? artistsData
                                  .slice(0, 7)
                                  .map((item, index) => (
                                      <Artist
                                          key={index}
                                          id={item._id}
                                          image={item.image}
                                          name={item.name}
                                          desc={item.desc}
                                      />
                                  ))
                            : artistsData
                                  .slice(7, 14)
                                  .map((item, index) => (
                                      <Artist
                                          key={index}
                                          id={item._id}
                                          image={item.image}
                                          name={item.name}
                                          desc={item.desc}
                                      />
                                  ))}
                    </div>
                </div>

                {user ? (
                    <div className="px-6 mb-4 mt-8">
                        <div className="flex items-center justify-between text-white mb-2">
                            <h1 className=" font-bold text-2xl hover:underline cursor-pointer">Đài phát Gợi ý</h1>
                            <p className="text-[14px] font-bold hover:underline cursor-pointer mr-7">Hiện tất cả</p>
                        </div>
                        <div className="flex overflow-auto space-x-2 ml-[-6px]">
                            {playlistsData.slice(7, 14).map((item, index) => (
                                <PlayList
                                    key={index}
                                    id={item._id}
                                    image={item.image}
                                    name={item.name}
                                    desc={item.desc}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="px-6 mb-4 mt-8">
                        <div className="flex items-center justify-between text-white mb-2">
                            <h1 className=" font-bold text-2xl hover:underline cursor-pointer">Album phổ biến</h1>
                            <p className="text-[14px] font-bold hover:underline cursor-pointer mr-7">Hiện tất cả</p>
                        </div>
                        <div className="flex overflow-auto space-x-2 ml-[-6px]">
                            {albumsData.map((item, index) => (
                                <Item key={index} id={item._id} image={item.image} name={item.name} desc={item.desc} />
                            ))}
                        </div>
                    </div>
                )}

                {user ? null : (
                    <div className="px-6 mb-4 mt-8">
                        <div className="flex items-center justify-between text-white mb-2">
                            <h1 className=" font-bold text-2xl hover:underline cursor-pointer">Radio phổ biến</h1>
                            <p className="text-[14px] font-bold hover:underline cursor-pointer mr-7">Hiện tất cả</p>
                        </div>
                        <div className="flex overflow-auto space-x-2 ml-[-6px]">
                            {playlistsData.slice(7, 14).map((item, index) => (
                                <PlayList
                                    key={index}
                                    id={item._id}
                                    image={item.image}
                                    name={item.name}
                                    desc={item.desc}
                                />
                            ))}
                        </div>
                    </div>
                )}
                <Footer />
            </div>
        </>
    );
}

export default Home;
// TASK: Làm podcast ở trang home *
// TASK: Thêm tính năng lưu vào thư viện, hiện đúng thư viện - CHƯA XONG
