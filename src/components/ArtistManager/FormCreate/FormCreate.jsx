import { useState } from "react";
import { Trash, Plus } from "lucide-react";

const existingAlbums = ["Album 1", "Album 2"]; // Giả lập danh sách album đã có

const FormCreate = () => {
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
        setAlbumExists(existingAlbums.includes(name));
    };

    const handleAddSong = () => {
        setAlbum({
            ...album,
            songs: [...album.songs, { title: "", duration: "", audio: "" }]
        });
    };

    const handleSongChange = (index, field, value) => {
        const updatedSongs = album.songs.map((song, i) =>
            i === index ? { ...song, [field]: value } : song
        );
        setAlbum({ ...album, songs: updatedSongs });
    };

    const handleRemoveSong = (index) => {
        setAlbum({
            ...album,
            songs: album.songs.filter((_, i) => i !== index)
        });
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
        setError("");
    };

    return (
        <div className="w-full px-4 flex bg-white h-full">
            <div className="w-2/3 bg-white shadow-lg p-6">
                <h1 className="text-2xl font-bold text-black mb-4">
                    {albumExists ? "Thêm Bài Hát vào Album" : "Tạo Album Mới"}
                </h1>

                <input
                    className="w-full p-3 mb-3 bg-gray-100 text-black placeholder-gray-400 rounded"
                    placeholder="Tên album"
                    value={album.name}
                    onChange={handleAlbumChange}
                />

                {!albumExists && (
                    <input
                        className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                        type="file"
                        onChange={(e) => setAlbum({ ...album, cover: e.target.files[0] })}
                    />
                )}

                <h2 className="text-white text-lg font-semibold mb-2">Danh sách bài hát</h2>

                <div className="max-h-64 overflow-y-auto">
                    {album.songs.map((song, index) => (
                        <div key={index} className="flex justify-between items-center gap-3 mb-2 bg-gray-200 p-3 rounded-lg">
                            <input
                                className="w-1/5 bg-gray-100 text-black placeholder-gray-400 p-2 rounded"
                                placeholder="Tên bài hát"
                                value={song.title}
                                onChange={(e) => handleSongChange(index, "title", e.target.value)}
                            />
                            <input
                                className="w-1/5 bg-gray-100 text-black placeholder-gray-400 p-2 rounded"
                                placeholder="Thời lượng"
                                value={song.duration}
                                onChange={(e) => handleSongChange(index, "duration", e.target.value)}
                            />
                            <input
                                className="w-1/5 bg-gray-100 text-black placeholder-gray-400 p-2 rounded"
                                placeholder="Ngày phát hành"
                                value={song.duration}
                                onChange={(e) => handleSongChange(index, "duration", e.target.value)}
                            />
                            <input
                                type="file"
                                accept="audio/*"
                                className="w-1/5 bg-gray-100 text-black p-2 rounded"
                                onChange={(e) => handleSongChange(index, "audio", e.target.files[0])}
                            />
                            <button onClick={() => handleRemoveSong(index)} className="text-red-500">
                                <Trash size={20} />
                            </button>
                        </div>
                    ))}
                </div>

                <button
                    className="mt-2 w-full bg-green-600 text-white p-3 rounded flex items-center justify-center gap-2 hover:bg-green-500"
                    onClick={handleAddSong}
                >
                    <Plus size={20} /> Thêm bài hát
                </button>

                {error && <p className="text-red-500 mt-2">{error}</p>}

                <button
                    className="mt-4 w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-500"
                    onClick={handleSaveAlbum}
                >
                    {albumExists ? "Lưu bài hát vào album" : "Tạo Album"}
                </button>
            </div>

            {/* <div className="w-1/3 bg-green-100 p-6 shadow-lg text-white rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Hồ sơ nghệ sĩ</h2>
                <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-gray-700 rounded-full overflow-hidden">
                        <img src="/default-avatar.png" alt="Artist Avatar" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="block text-gray-400">Tên nghệ sĩ</label>
                    <input type="text" placeholder="Nhập tên nghệ sĩ"
                        className="w-full bg-gray-700 text-white p-3 rounded mt-1" />
                    <label className="block text-gray-400 mt-3">Mô tả</label>
                    <textarea placeholder="Mô tả nghệ sĩ..." rows="3"
                        className="w-full bg-gray-700 text-white p-3 rounded mt-1"></textarea>
                </div>
            </div> */}
        </div>
    );
}

export default FormCreate;
