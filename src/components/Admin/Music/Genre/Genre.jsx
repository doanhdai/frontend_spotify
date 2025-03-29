const Genre = () => {
    return (
      <div className="w-full p-6 bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Danh sách Genre</h2>
        <div className="bg-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-600">
              <tr>
                <th className="p-3 text-left">Mã Genre</th>
                <th className="p-3 text-left">Mã TK nghệ sĩ</th>
                <th className="p-3 text-left">Tên Genre</th>
                <th className="p-3 text-left">Ngày tạo</th>
                <th className="p-3 text-left">Số lượng bài hát</th>
                <th className="p-3 text-left">Hình ảnh</th>
                <th className="p-3 text-left">Trạng thái</th>
              </tr>
            </thead>
  
            <tbody>
              <tr>
                <td className="p-3 text-left">USR0001</td>
                <td className="p-3 text-left">ltgiai</td>
                <td className="p-3 text-left">tuangiai52@gmail.com</td>
                <td className="p-3 text-left">truigbeovnamep</td>
                <td className="p-3 text-left">User</td>
                <td className="p-3 text-left">https://ibenzsxdfcgvhbjnkml.com</td>
                <td className="p-3 text-left">Đang hoạt động</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  export default Genre;