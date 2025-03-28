const Dashboard = () => {
    return (
        <div className="p-4 w-full bg-gray-500">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                    <h3>Bài hát</h3>
                    <p className="text-2xl font-bold">12</p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                    <h3>Album</h3>
                    <p className="text-2xl font-bold">3</p>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                    <h3>Lượt yêu thích</h3>
                    <p className="text-2xl font-bold">300</p>
                </div>
                {/* Thêm 3 card tương tự */}
            </div>
            <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                <h2>Bài hát yêu thích nhất</h2>
            </div>
            <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                <h2>Biểu đồ thống kê</h2>
            </div>
        </div>
    )
}

export default Dashboard;