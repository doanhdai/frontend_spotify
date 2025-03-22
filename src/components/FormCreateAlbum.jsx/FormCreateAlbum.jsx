import { useState } from "react";
// import DisplayArtist from "../DisplayArtist";
import { Trash, Plus } from "lucide-react";

const existingAlbums = ["Album 1", "Album 2"]; // Giả lập danh sách album đã có

const FormAlbum = () => {
    const [album, setAlbum] = useState({
        name: "",
        cover: "",
        songs: [],
    });
    const [albumExists, setAlbumExists] = useState(false);
    const [error, setError] = useState("");

    const handleAlbumChange = (e) => {
        const name = e.target.value;
        setAlbum({ ...album, name });

        if (existingAlbums.includes(name)) {
            setAlbumExists(true);
            setError("");
        } else {
            setAlbumExists(false);
        }
    };

    const handleAddSong = () => {
        setAlbum({
            ...album,
            songs: [...album.songs, { title: "", duration: "" }]
        });
    };

    const handleSongChange = (index, field, value) => {
        const updatedSongs = album.songs.map((song, i) =>
            i === index ? { ...song, [field]: value } : song
        );
        setAlbum({ ...album, songs: updatedSongs });
    };

    const handleRemoveSong = (index) => {
        const updatedSongs = album.songs.filter((_, i) => i !== index);
        setAlbum({ ...album, songs: updatedSongs });
    };

    const handleSaveAlbum = () => {
        if (!albumExists && album.name.trim() === "") {
            setError("Tên album không được để trống!");
            return;
        }

        if (albumExists && album.songs.length === 0) {
            setError("Album đã tồn tại, vui lòng thêm ít nhất một bài hát!");
            return;
        }

        console.log("Dữ liệu đã lưu:", album);
        setError(""); // Reset lỗi sau khi lưu thành công
    };

    return (
        <div className="w-full h-full p-2 flex bg-black">
            <div className="w-1/2 h-full bg-[#1212] shadow-lg p-4 rounded-lg">
                <h1 className="text-2xl font-bold text-white mb-4">
                    {albumExists ? "Thêm Bài Hát vào Album" : "Tạo Album Mới"}
                </h1>

                <input
                    className="w-full p-2 mb-3 bg-gray-800 text-white placeholder-gray-400 rounded"
                    placeholder="Tên album"
                    value={album.name}
                    onChange={handleAlbumChange}
                />

                {!albumExists && (
                    <input
                        className="w-full p-2 mb-3 bg-gray-800 text-white placeholder-gray-400 rounded"
                        type="file"
                        onChange={(e) => setAlbum({ ...album, cover: e.target.files[0] })}
                    />
                )}

                <>
                    <h2 className="text-white text-lg font-semibold mb-2">Danh sách bài hát</h2>

                    <div className="max-h-60 overflow-y-auto">
                        {album.songs.map((song, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <input
                                    className="flex-1 bg-gray-800 text-white placeholder-gray-400 p-2 rounded"
                                    placeholder="Tên bài hát"
                                    value={song.title}
                                    onChange={(e) => handleSongChange(index, "title", e.target.value)}
                                />
                                <input
                                    className="w-24 bg-gray-800 text-white placeholder-gray-400 p-2 rounded"
                                    placeholder="Thời lượng"
                                    value={song.duration}
                                    onChange={(e) => handleSongChange(index, "duration", e.target.value)}
                                /><input
                                    type="date"
                                    className="w-24 bg-gray-800 text-white placeholder-gray-400 p-2 rounded"
                                    placeholder="Ngày phát hành"
                                    value={song.date}
                                    onChange={(e) => handleSongChange(index, "date", e.target.value)}
                                />
                                <button onClick={() => handleRemoveSong(index)} className="text-red-500">
                                    <Trash size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button className="mt-2 w-full bg-gray-600 text-white p-2 rounded flex items-center justify-center gap-2"
                        onClick={handleAddSong}>
                        <Plus size={20} /> Thêm bài hát
                    </button>
                </>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <button
                    className="mt-4 w-full bg-[#1DB954] text-white font-bold py-2 rounded"
                    onClick={handleSaveAlbum}
                >
                    {albumExists ? "Lưu bài hát vào album" : "Tạo Album"}
                </button>
            </div>
            <div className="w-1/2 bg-black">
                <div className="bg-gray-900 text-white p-6 shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Hồ sơ nghệ sĩ</h2>

                    <div className="flex items-center gap-4">
                        <div className="w-24 h-24 bg-gray-700 rounded-full overflow-hidden">
                            <img src="/default-avatar.png" alt="Artist Avatar" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block text-gray-400">Tên nghệ sĩ</label>
                        <input type="text" placeholder="Nhập tên nghệ sĩ"
                            className="w-full bg-gray-800 text-white p-2 rounded mt-1" />

                        <label className="block text-gray-400 mt-3">Mô tả</label>
                        <textarea placeholder="Mô tả nghệ sĩ..." rows="3"
                            className="w-full bg-gray-800 text-white p-2 rounded mt-1"></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormAlbum;
