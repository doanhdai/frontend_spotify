const Song = () => {
    return (
        <div className="p-2 w-full text-black bg-white">
            <h2 className="text-2xl font-bold mb-4 ml-3">Danh sách bài hát</h2>
            <div className="bg-white overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Tên người dùng</th>
                            <th className="p-3 text-left">Nghệ danh</th>
                            <th className="p-3 text-left">Ảnh đại diện</th>
                            <th className="p-3 text-left">Trạng thái</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td className="p-3 text-left">USR0001</td>
                            <td className="p-3 text-left">ltgiai</td>
                            <td className="p-3 text-left">tuangiai52@gmail.com</td>
                            <td className="p-3 text-left">truigbeovnamep</td>
                            <td className="p-3 text-left">Đang hoạt động</td>
                        </tr>
                        <tr>
                            <td className="p-3 text-left">USR0001</td>
                            <td className="p-3 text-left">ltgiai</td>
                            <td className="p-3 text-left">tuangiai52@gmail.com</td>
                            <td className="p-3 text-left">truigbeovnamep</td>
                            <td className="p-3 text-left">Đang hoạt động</td>
                        </tr>
                        <tr>
                            <td className="p-3 text-left">USR0001</td>
                            <td className="p-3 text-left">ltgiai</td>
                            <td className="p-3 text-left">tuangiai52@gmail.com</td>
                            <td className="p-3 text-left">truigbeovnamep</td>
                            <td className="p-3 text-left">Đang hoạt động</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Song;