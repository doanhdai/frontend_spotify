import axios from "axios"; // thêm dòng này
import { useState } from "react";

const FormCreateSong = () => {
    const [song, setSong] = useState({
        name: "",
        cover: null,
        file: null,
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSong((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setSong((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };

    const handleSubmit = async () => {
        if (!song.name) {
            setError("Vui lòng nhập đầy đủ thông tin bài hát.");
            return;
        }

        const formData = new FormData();
        formData.append("name", song.name);
        formData.append("cover", song.cover);
        formData.append("file", song.file);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_REACT_API}/songs/create`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Bài hát đã được tạo:", response.data);

            // Reset form
            // setSong({ name: "", cover: null, file: null });
            // setError("");
        } catch (err) {
            console.error("Lỗi khi tạo bài hát:", err);
            setError("Có lỗi xảy ra khi gửi bài hát.");
        }
    };

    return (
        <div className="flex justify-center w-full px-4 bg-white h-full">
            <div className="w-2/3 bg-white shadow-lg p-5">
                <h1 className="text-2xl font-bold text-black mb-4">Thêm Bài Hát Mới</h1>

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <input
                    name="name"
                    className="w-full p-3 mb-3 bg-gray-100 text-black placeholder-gray-400 rounded"
                    placeholder="Tên bài hát"
                    value={song.name}
                    onChange={handleChange}
                />

                <label className="block text-black mb-1">Ảnh bìa</label>
                <input
                    name="cover"
                    className="w-full p-3 mb-3 bg-gray-100 text-black rounded"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <label className="block text-black mb-1">File nhạc</label>
                <input
                    name="file"
                    className="w-full p-3 mb-4 bg-gray-100 text-black rounded"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                />

                <button
                    className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-500 cursor-pointer"
                    onClick={handleSubmit}
                >
                    Thêm Bài Hát
                </button>
            </div>
        </div>
    );
};

export default FormCreateSong;
