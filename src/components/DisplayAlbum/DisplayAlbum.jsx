import { useEffect, useRef, useContext, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { assets } from '@/assets/assets';

function DisplayAlbum() {
    const { id } = useParams();

    const [albumData, setAlbumData] = useState('');

    const displayAlbumRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes('album');
    const bgColor = albumData ? albumData.bgColor : '';

    useEffect(() => {
        if (albumsData) {
            document.title = `${albumData.name} - Album by ${albumData.desc} | Spotify Playlist`;
        }
    });

    useEffect(() => {
        const album = albumsData.find((item) => item._id === id);
        if (album) {
            setAlbumData(album);
        }
    }, [id, albumsData]);

    useEffect(() => {
        if (isAlbum && displayAlbumRef.current) {
            displayAlbumRef.current.style.background = `linear-gradient(${bgColor}, #121212)`;
        } else if (displayAlbumRef.current) {
            displayAlbumRef.current.style.background = `#121212`;
        }
    }, [isAlbum, bgColor]);

    return albumData ? (
        <div
            ref={displayAlbumRef}
            className="bg-[#121212] w-[79%] h-[97.4%] rounded-xl my-2 mr-2 py-4 overflow-hidden overflow-y-auto"
        >
            <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8 px-6">
                <img className="w-48 rounded" src={albumData.image} alt="" />
                <div>
                    <p className="text-white">Playlist</p>
                    <h2 className="text-white text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
                    <h4 className="text-white">{albumData.desc}</h4>
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
            {songsData
                .filter((item) => item.album === albumData.name)
                .map((item, index) => (
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

export default DisplayAlbum;
