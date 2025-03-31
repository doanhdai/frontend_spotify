import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '@/configs';

function Chat() {
    const [users, setUsers] = useState([
        { id: 1, name: 'User 1', lastMessage: 'Xin chào!', time: '10:00', unread: 2 },
        { id: 2, name: 'User 2', lastMessage: 'Bạn khỏe không?', time: '09:30', unread: 0 },
        { id: 3, name: 'User 3', lastMessage: 'Tạm biệt!', time: 'Hôm qua', unread: 1 },
    ]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef(null);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(config.routes.login);
        }
    }, [isLoggedIn, navigate]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() && selectedUser) {
            const message = {
                id: messages.length + 1,
                text: newMessage,
                sender: 'me',
                time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages([...messages, message]);
            setNewMessage('');

            // Update last message in users list
            setUsers(
                users.map((user) =>
                    user.id === selectedUser.id
                        ? {
                              ...user,
                              lastMessage: newMessage,
                              time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
                          }
                        : user,
                ),
            );
        }
    };

    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="bg-[#121212] w-[79%] h-[97.4%] rounded-xl my-2 mr-2 py-4 flex">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-[#404040] flex flex-col">
                {/* Search */}
                <div className="p-4 border-b border-[#404040]">
                    <div className="relative">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b3b3b3]"
                        />
                        <input
                            type="text"
                            placeholder="Tìm kiếm người dùng..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#282828] text-white rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ed760]"
                        />
                    </div>
                </div>

                {/* Users List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            className={`flex items-center p-4 cursor-pointer hover:bg-[#282828] ${
                                selectedUser?.id === user.id ? 'bg-[#282828]' : ''
                            }`}
                        >
                            <div className="w-12 h-12 rounded-full bg-[#1ed760] flex items-center justify-center mr-4">
                                <FontAwesomeIcon icon={faUser} className="text-black" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-white font-semibold">{user.name}</h3>
                                    <span className="text-[#b3b3b3] text-sm">{user.time}</span>
                                </div>
                                <p className="text-[#b3b3b3] text-sm truncate">{user.lastMessage}</p>
                            </div>
                            {user.unread > 0 && (
                                <div className="ml-4 bg-[#1ed760] text-black w-6 h-6 rounded-full flex items-center justify-center text-sm">
                                    {user.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {selectedUser ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-[#404040] flex items-center">
                            <div className="w-10 h-10 rounded-full bg-[#1ed760] flex items-center justify-center mr-4">
                                <FontAwesomeIcon icon={faUser} className="text-black" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">{selectedUser.name}</h3>
                                <p className="text-[#b3b3b3] text-sm">online</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                            message.sender === 'me'
                                                ? 'bg-[#1ed760] text-black'
                                                : 'bg-[#404040] text-white'
                                        }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                        <p className="text-xs mt-1 opacity-70">{message.time}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-[#404040]">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Nhập tin nhắn..."
                                    className="flex-1 bg-[#404040] text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ed760]"
                                />
                                <button
                                    type="submit"
                                    className="bg-[#1ed760] text-black w-10 h-10 rounded-full flex items-center justify-center hover:scale-105"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-full bg-[#282828] flex items-center justify-center mx-auto mb-4">
                                <FontAwesomeIcon icon={faUser} className="text-[#b3b3b3] text-3xl" />
                            </div>
                            <h3 className="text-white text-xl font-semibold mb-2">Chọn người dùng để bắt đầu chat</h3>
                            <p className="text-[#b3b3b3]">Tìm kiếm người dùng từ danh sách bên trái</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chat;
