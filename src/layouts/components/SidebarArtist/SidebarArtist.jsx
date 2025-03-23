import { useState } from "react";

const SidebarArtist = () => {
    const albums = [
        { id: 1, name: "Album 1", cover: "https://via.placeholder.com/150" },
        { id: 2, name: "Album 2", cover: "https://via.placeholder.com/150" },
    ];
    
    const songs = [
        { id: 1, name: "Bài hát 1" },
        { id: 2, name: "Bài hát 2" },
    ];

    return (
        <div className="w-[21%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
            <div className="bg-[#121212] h-full rounded-xl p-4 flex flex-col">
                <h2 className="text-lg font-semibold mb-2">Nghệ Sĩ</h2>
                <div className="flex-1 overflow-y-auto">
                    <div>
                        <h3 className="text-md font-semibold">📀 Albums</h3>
                        <div className="grid gap-2 mt-2">
                            {albums.map(album => (  
                                <div key={album.id} className="bg-[#1E1E1E] p-2 flex gap-2 items-center rounded">
                                    <img src={album.cover} alt={album.name} className="w-10 h-10 rounded" />
                                    <span>{album.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-md font-semibold">🎵 Bài Hát</h3>
                        <ul className="mt-2">
                            {songs.map(song => (
                                <li key={song.id} className="p-2 bg-[#1E1E1E] rounded mb-1">{song.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-4">
                        <h3 className="text-md font-semibold">📊 Thống kê</h3>
                        <p className="mt-2 text-sm">Tổng số lượt nghe: 10,000</p>
                        <p className="text-sm">Tổng số llượt thích: 2,500</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarArtist;
