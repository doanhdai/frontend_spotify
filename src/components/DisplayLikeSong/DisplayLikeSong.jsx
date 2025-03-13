import { useEffect, useRef, useContext, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { PlayerContext } from '@/context/PlayerContext';
import { assets } from '@/assets/assets';

function DisplayLikeSong() {
    const { playWithId, songsData, artistsData } = useContext(PlayerContext);

    const likedSongsData = [
        {
            _id: '1',
            name: 'Shape of You',
            desc: 'Hit song by Ed Sheeran',
            album: 'Divide',
            duration: '3:53',
            image: assets.img1,
            bgColor: '#FF5733',
        },
        {
            _id: '2',
            name: 'Blinding Lights',
            desc: 'Chart-topping single by The Weeknd',
            album: 'After Hours',
            duration: '3:20',
            image: assets.img2,
            bgColor: '#FFC300',
        },
        {
            _id: '3',
            name: 'Levitating',
            desc: 'Popular track by Dua Lipa',
            album: 'Future Nostalgia',
            duration: '3:23',
            image: assets.img3,
            bgColor: '#DAF7A6',
        },
        {
            _id: '4',
            name: 'Save Your Tears',
            desc: 'Emotional song by The Weeknd',
            album: 'After Hours',
            duration: '3:36',
            image: assets.img4,
            bgColor: '#C70039',
        },
        {
            _id: '5',
            name: 'Someone Like You',
            desc: 'Classic ballad by Adele',
            album: '21',
            duration: '4:45',
            image: assets.img5,
            bgColor: '#900C3F',
        },
        {
            _id: '6',
            name: 'Stay',
            desc: 'Collaboration between The Kid LAROI and Justin Bieber',
            album: 'F*CK LOVE 3: OVER YOU',
            duration: '2:21',
            image: assets.img6,
            bgColor: '#581845',
        },
        {
            _id: '7',
            name: 'Bad Guy',
            desc: 'Iconic hit by Billie Eilish',
            album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
            duration: '3:14',
            image: assets.img7,
            bgColor: '#1DB954',
        },
        {
            _id: '8',
            name: 'Senorita',
            desc: 'Hit duet by Shawn Mendes & Camila Cabello',
            album: 'Romance',
            duration: '3:10',
            image: assets.img8,
            bgColor: '#E50914',
        },
    ];

    const [songLikesData, setSongLikesData] = useState('');

    const displaySongLikeRef = useRef();
    const location = useLocation();
    const isSongLike = location.pathname.includes('likedSongs');
    // const bgColor = songLikesData ? songLikesData.bgColor : '';
    const bgColor = '#21115f';

 

    useEffect(() => {
        if (isSongLike && displaySongLikeRef.current) {
            displaySongLikeRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
        } else if (displaySongLikeRef.current) {
            displaySongLikeRef.current.style.background = `#121212`;
        }
    }, [isSongLike, bgColor]);

    useEffect(() => {
        if (songLikesData) {
            document.title = `${songLikesData.name} | Spotify`;
        }
    });

    return isSongLike ? (
        <div
            ref={displaySongLikeRef}
            className="bg-[#121212] w-[79%] h-[97.4%] rounded-xl my-2 mr-2 py-4 overflow-hidden overflow-y-auto"
        >
            <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8 px-6">
                <img className="w-48 rounded" src={assets.liked_songs} alt="" />
                <div>
                    <p className="text-white mb-2">Playlist</p>
                    <h2 className="text-white text-5xl font-bold mb-2 md:text-7xl">Bài hát bạn đã thích.</h2>
                    {/* <h4 className="text-white mb-12">{songLikesData.desc}</h4> */}
                    <p className="text-white mt-1">
                        <img className="inline-block w-5" src={assets.spotify_logo} alt="" />
                        <b> Spotify </b>• 1,323,154 likes • <b>50 songs </b>
                        about 2 hr 30 min
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 px-6 text-[#a7a7a7]">
                <p>
                    <b className="mr-4">#</b>Tiêu đề
                </p>
                <img className="m-auto w-4" src={assets.clock_icon} alt="" />
            </div>
            <hr className="mt-[-8px] mb-4 mx-6" />
            {likedSongsData.map((item, index) => (
                <div
                    key={index}
                    onClick={() => playWithId(item._id)}
                    className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 px-6 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                >
                    <p>
                        <b className="mr-4">{index + 1}</b>
                        {item.name}
                    </p>
                    <p className="text-center">{item.duration}</p>
                </div>
            ))}
        </div>
    ) : null;
}

export default DisplayLikeSong;
