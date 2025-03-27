import React from 'react';
import { assets } from '@/assets/assets';
import { useEffect, useState } from 'react';
const SeachSongAlbumArt = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    const fakeData = {
        topResult: {
            title: 'Xe Đạp',
            artist: 'Thùy Chi',
            image: assets.img6,
        },
        songs: [
            { title: 'Xe Đạp', artist: 'Thùy Chi', duration: '4:45', image: assets.img6 },
            { title: 'Tiếng chuông', artist: 'Minh Vương M4U, Thùy Chi', duration: '4:46', image: assets.img7 },
            { title: 'Nơi này có anh', artist: 'Thùy Chi', duration: '4:44', image: assets.img6 },
            { title: 'Lạc Trôi', artist: 'Hoaprox, Đặng Minh, CONTREKZ', duration: '4:12', image: assets.img7 },
        ],
        artists: [
            { name: 'Baby Red aka Hung Xe Dap', image: assets.img6 },
            { name: 'RPT MCK', image: assets.img7 },
            { name: 'W/N', image: assets.img6 },
            { name: 'Da LAB', image: assets.img7 },
            { name: 'WEAN', image: assets.img13 },
        ],
        albums: [
            { title: 'Đánh Đổi', year: '2023', artist: 'Obito, Shiki', image: assets.img6 },
            { title: 'NGỰA Ô', year: '2024', artist: 'Dangrangto, TeuYungBoy, DONAL', image: assets.img7 },
            { title: 'Slatt ON', year: '2022', artist: 'Hustlang Robber', image: assets.img6 },
            { title: '99%', year: '2023', artist: 'RPT MCK', image: assets.img7 },
            { title: 'Đánh Đổi', year: '2025', artist: 'Toann', image: assets.img13 },
        ],
    };

    const categories = [
        'All',
        'Songs',
        'Playlists',
        'Artists',
        'Albums',
        'Podcasts & Shows',
        'Profiles',
        'Genres & Moods',
    ];

    useEffect(() => {
        document.title = 'Spotify - Tìm kiếm';
    }, []);
    return (
        <div>
            <div className="ml-6 mt-4 mb-12">
                {/* Thanh danh mục */}
                <div className="flex gap-3 mb-6">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 text-black rounded-full text-sm font-medium 
                    ${activeCategory === category ? 'bg-white text-black' : 'bg-gray-800 hover:bg-gray-700'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Top result */}
                <div className="ml-2 mt-10 mb-12">
                    <h1 className="text-white font-bold text-2xl ml-3 mb-2">Top result</h1>
                    <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
                        <img
                            src={fakeData.topResult.image}
                            alt={fakeData.topResult.title}
                            className="w-16 h-16 rounded-md"
                        />
                        <div>
                            <h2 className="text-white font-bold text-xl">{fakeData.topResult.title}</h2>
                            <p className="text-gray-400">{fakeData.topResult.artist}</p>
                        </div>
                    </div>

                    {/* Songs */}
                    <h2 className="text-white font-bold text-2xl ml-3 mt-6 mb-2">Songs</h2>
                    <div>
                        {fakeData.songs.map((song, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 bg-gray-800 p-2 rounded-lg mb-2 transition-all duration-300 hover:bg-gray-700 hover:scale-[1]"
                            >
                                <img src={song.image} alt={song.title} className="w-12 h-12 rounded-md" />
                                <div className="flex-grow">
                                    <h3 className="text-white">{song.title}</h3>
                                    <p className="text-gray-400 text-sm">{song.artist}</p>
                                </div>
                                <span className="text-gray-400 text-sm">{song.duration}</span>
                            </div>
                        ))}
                    </div>

                    {/* Artists */}
                    <h2 className="text-white font-bold text-2xl ml-3 mt-6 mb-2">Artists</h2>
                    <div className="flex gap-4">
                        {fakeData.artists.map((artist, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center transition-transform duration-300 hover:scale-110 hover:text-green-400"
                            >
                                <img
                                    src={artist.image}
                                    alt={artist.name}
                                    className="w-16 h-16 rounded-full transition-shadow duration-300 hover:shadow-lg hover:shadow-green-500/50"
                                />
                                <p className="text-white text-sm mt-2">{artist.name}</p>
                            </div>
                        ))}
                    </div>

                    {/* Albums */}
                    <h2 className="text-white font-bold text-2xl ml-3 mt-6 mb-2">Albums</h2>
                    <div className="flex gap-4 hover:overflow-x-auto cursor-pointer">
                        {fakeData.albums.map((album, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center w-36 transition-transform duration-300 hover:scale-105 hover:bg-gray-900 p-3 rounded-lg"
                            >
                                <img
                                    src={album.image}
                                    alt={album.title}
                                    className="w-36 h-36 rounded-md transition-shadow duration-300 hover:shadow-xl hover:shadow-gray-500/50"
                                />
                                <p className="text-white font-bold mt-2 text-center">{album.title}</p>
                                <p className="text-gray-400 text-sm text-center">
                                    {album.year} • {album.artist}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SeachSongAlbumArt;
