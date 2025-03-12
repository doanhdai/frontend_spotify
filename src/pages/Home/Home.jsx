import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayList from '@/components/PlayList';
import Artist from '@/components/Artist';
import Item from '@/components/Item';
import { PlayerContext } from '@/context/PlayerContext';
import { assets } from '@/assets/assets';
import Footer from '@/layouts/components/Footer';

function Home() {
    // const { artistsData, playlistsData, albumsData, scrollHomeRef, bgHomeHeader, user } = useContext(PlayerContext);
    const { albumsData, scrollHomeRef, bgHomeHeader } = useContext(PlayerContext);
    const topRef = useRef();
    const navigate = useNavigate();
    const [all, setAll] = useState(true);
    const [music, setMusic] = useState(false);
    const [podcasts, setPodcasts] = useState(false);
    const [user, setUser] = useState(true);
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
    const playlistsData = [
        {
            _id: '1',
            image: 'https://source.unsplash.com/200x200/?music,playlist',
            name: 'Chill Vibes',
            desc: 'Thư giãn với những giai điệu nhẹ nhàng.',
        },
        {
            _id: '2',
            image: 'https://source.unsplash.com/200x200/?pop,music',
            name: 'Top Hits',
            desc: 'Những bài hát hot nhất hiện nay.',
        },
        {
            _id: '3',
            image: 'https://source.unsplash.com/200x200/?rock,concert',
            name: 'Rock Legends',
            desc: 'Những bản rock bất hủ theo năm tháng.',
        },
        {
            _id: '4',
            image: 'https://source.unsplash.com/200x200/?jazz,music',
            name: 'Jazz & Blues',
            desc: 'Hòa mình vào giai điệu Jazz và Blues.',
        },
        {
            _id: '5',
            image: 'https://source.unsplash.com/200x200/?edm,dj',
            name: 'EDM Party',
            desc: 'Nhạc EDM sôi động cho bữa tiệc của bạn.',
        },
        {
            _id: '6',
            image: 'https://source.unsplash.com/200x200/?relax,music',
            name: 'Lo-Fi Chill',
            desc: 'Nhạc Lo-Fi giúp bạn tập trung và thư giãn.',
        },
        {
            _id: '7',
            image: 'https://source.unsplash.com/200x200/?hiphop,rap',
            name: 'Hip-Hop Bangers',
            desc: 'Những bản rap đình đám nhất hiện nay.',
        },
        {
            _id: '8',
            image: 'https://source.unsplash.com/200x200/?acoustic,guitar',
            name: 'Acoustic Love',
            desc: 'Giai điệu nhẹ nhàng từ guitar acoustic.',
        },
    ];
    const artistsData = [
        {
            _id: '1',
            image: 'https://source.unsplash.com/200x200/?singer',
            name: 'Taylor Swift',
            desc: 'Nữ ca sĩ, nhạc sĩ nổi tiếng với những bản hit pop.',
        },
        {
            _id: '2',
            image: 'https://source.unsplash.com/200x200/?rapper',
            name: 'Drake',
            desc: 'Rapper hàng đầu với nhiều bản hit trên bảng xếp hạng.',
        },
        {
            _id: '3',
            image: 'https://source.unsplash.com/200x200/?dj',
            name: 'Marshmello',
            desc: 'DJ nổi tiếng với phong cách EDM sôi động.',
        },
        {
            _id: '4',
            image: 'https://source.unsplash.com/200x200/?guitarist',
            name: 'John Mayer',
            desc: 'Nghệ sĩ guitar tài năng với chất nhạc trữ tình.',
        },
        {
            _id: '5',
            image: 'https://source.unsplash.com/200x200/?rockstar',
            name: 'Freddie Mercury',
            desc: 'Huyền thoại nhạc rock của ban nhạc Queen.',
        },
        {
            _id: '6',
            image: 'https://source.unsplash.com/200x200/?hiphop',
            name: 'Kendrick Lamar',
            desc: 'Một trong những rapper xuất sắc nhất hiện nay.',
        },
        {
            _id: '7',
            image: 'https://source.unsplash.com/200x200/?jazzsinger',
            name: 'Norah Jones',
            desc: 'Giọng ca jazz mượt mà và đầy cảm xúc.',
        },
        {
            _id: '8',
            image: 'https://source.unsplash.com/200x200/?popstar',
            name: 'Ariana Grande',
            desc: 'Ngôi sao nhạc pop với chất giọng ấn tượng.',
        },
    ];

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
                    <div className="flex px-6 py-4">
                        <div className="flex items-center w-96  cursor-pointer" onClick={() => navigate('/likedSongs')}>
                            <img className="w-14 rounded-tl-[4px] rounded-bl-[4px]" src={assets.liked_songs} alt="" />
                            <div className="bg-[#33295c] px-4 py-4 w-full rounded-tr-[4px] rounded-br-[4px] -hover:bg-[#fff3] transition-colors duration-300">
                                <h4 className="text-white font-semibold">Bài hát đã thích</h4>
                            </div>
                        </div>
                        <div className="flex items-center w-96 ml-6  cursor-pointer">
                            <img
                                className="w-14 rounded-tl-[4px] rounded-bl-[4px]"
                                src={assets.NgayEmDepNhatRadio}
                                alt=""
                            />
                            <div className="bg-[#33295c] px-4 py-4 w-full rounded-tr-[4px] rounded-br-[4px] -hover:bg-[#fff3] transition-colors duration-300">
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
                                    image={assets.img5}
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
                            {playlistsData.slice(0, 5).map((item, index) => (
                                <PlayList
                                    key={index}
                                    id={item._id}
                                    image={assets.img6}
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
                                          image={assets.img6}
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
                            {playlistsData.slice(0, 6).map((item, index) => (
                                <PlayList
                                    key={index}
                                    id={item._id}
                                    image={assets.img6}
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
