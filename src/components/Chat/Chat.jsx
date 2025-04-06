import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import config from '@/configs';
import { wsService } from '@/api/websocket';
import { getAllConversation, getChat, getAllUser, createConversation, getChatAI } from '@/service/apiService';
import { setConversations, setCurrentConversation, setMessages, addMessage } from '@/redux/Reducer/chatSlice';
import { assets } from '@/assets/assets';
import meta from '../../assets/images/albums/meta-ai.png';
import MetaChat from './MetaChat/MetaChat';
import axios from 'axios';

function Chat() {
    const dispatch = useDispatch();
    const { conversations, currentConversation, messages } = useSelector((state) => state.chat);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const messagesEndRef = useRef(null);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const id_user = localStorage.getItem('id_user');

    const [messagesAI, setMessagesAI] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const metaAIConversation = {
        id: 'meta_ai',
        name: 'Meta AI',
        participants: [
            { id: 1, name: 'Meta AI', email: 'metaai@ai.com', avatar: null }, // You can set avatar if available
        ],
        created_at: '2025-04-03T06:30:27.868463Z',
        updated_at: '2025-04-03T06:30:27.868463Z',
        last_message: null,
        unread_count: 0,
    };

    useEffect(() => {
        wsService.connect();
        fetchConversations();
        return () => {
            wsService.disconnect();
        };
    }, [isLoggedIn, navigate]);

    const fetchConversations = async () => {
        try {
            const response = await getAllConversation();
            dispatch(setConversations(response.data));
        } catch (error) {
            console.error('Error fetching conversations:', error);
        }
    };

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.trim()) {
            try {
                const response = await getAllUser();
                console.log(response.data);
                const filteredUsers = response.data.filter(
                    (user) =>
                        user.name.toLowerCase().includes(query.toLowerCase()) &&
                        parseInt(user.id) !== parseInt(id_user),
                );
                setSearchResults(filteredUsers);
                setShowSearchResults(true);
            } catch (error) {
                console.error('Error searching users:', error);
            }
        } else {
            setSearchResults([]);
            setShowSearchResults(false);
        }
    };

    const handleUserSelect = async (user) => {
        try {
            // Kiểm tra xem đã có conversation với user này chưa
            const existingConversation = conversations.find((conv) =>
                conv.participants.some((p) => parseInt(p.id) === parseInt(user.id)),
            );

            if (existingConversation) {
                handleConversationSelect(existingConversation);
            } else {
                // Tạo conversation mới
                const response = await createConversation({
                    user_id: parseInt(user.id),
                });

                const newConversation = response.data;
                dispatch(setConversations([...conversations, newConversation]));
                handleConversationSelect(newConversation);
            }
            setShowSearchResults(false);
            setSearchQuery('');
            setSearchResults([]);
        } catch (error) {
            console.error('Error creating conversation:', error);
        }
    };

    const fetchMessages = async (conversationId) => {
        try {
            const response = await getChat(conversationId);
            dispatch(setMessages(response.data));
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleConversationSelect = (conversation) => {
        if (conversation.id === 'meta_ai') {
            setSelectedConversation(metaAIConversation);
        } else {
            setSelectedConversation(conversation);
        }
        dispatch(setCurrentConversation(conversation));
        fetchMessages(conversation.id);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() && selectedConversation) {
            const currentUserId = parseInt(id_user);
            const receiver = selectedConversation.participants.find(
                (participant) => parseInt(participant.id) !== currentUserId,
            );

            if (receiver) {
                // Tạo đối tượng tin nhắn mới với format chuẩn
                const newMessageObj = {
                    id: Date.now(), // Tạo id tạm thời
                    content: newMessage,
                    timestamp: new Date().toISOString(),
                    is_read: false,
                    sender: {
                        id: currentUserId,
                    },
                };

                // Gửi tin nhắn qua WebSocket trước
                wsService.sendMessage(newMessage, selectedConversation.id, receiver.id);

                // Sau đó cập nhật state local
                dispatch(addMessage(newMessageObj));
                setNewMessage('');
            }
        }

        if (selectedConversation.id === 'meta_ai') {
            if (!newMessage.trim() || loading) return; // Ngăn gửi khi đang chờ phản hồi

            const userMessage = { role: 'user', content: newMessage };
            setMessagesAI((prev) => [...prev, userMessage]);
            setNewMessage('');
            setLoading(true);

            try {
                const response = await getChatAI(newMessage);

                console.log('Phản hồi từ API:', response.data);
                const botMessage = {
                    role: 'bot',
                    content: response.data.bot_response || 'Lỗi phản hồi!',
                };

                setMessagesAI((prev) => {
                    // Kiểm tra nếu botMessage đã tồn tại thì không thêm lại
                    if (prev.some((msg) => msg.content === botMessage.content && msg.role === 'bot')) {
                        return prev;
                    }
                    return [...prev, botMessage];
                });
            } catch (error) {
                setMessagesAI((prev) => [...prev, { role: 'bot', content: 'Lỗi khi gửi tin nhắn!' }]);
            } finally {
                setLoading(false);
            }
        }
    };

    // Lọc và chuẩn hóa tin nhắn trước khi hiển thị
    const normalizedMessages = messages.map((message) => {
        if (message.message) {
            return {
                id: Date.now() + Math.random(),
                content: message.message,
                timestamp: new Date().toISOString(),
                is_read: false,
                sender: {
                    id: message.sender_id,
                },
            };
        }
        return message;
    });

    // Loại bỏ tin nhắn trùng lặp dựa trên content và timestamp
    const uniqueMessages = normalizedMessages.filter(
        (message, index, self) =>
            index === self.findIndex((m) => m.content === message.content && m.timestamp === message.timestamp),
    );

    // Lọc conversations dựa trên tên người dùng
    const filteredConversations = conversations.filter((conv) => {
        const otherParticipant = conv.participants.find(
            (participant) => parseInt(participant.id) !== parseInt(id_user),
        );
        return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return '';
        try {
            return new Date(timestamp).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch (error) {
            return '';
        }
    };

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
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full bg-[#282828] text-white rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1ed760]"
                        />
                    </div>

                    {/* Search Results */}
                    {showSearchResults && searchResults.length > 0 && (
                        <div className="absolute z-10 w-96 mt-2 bg-[#282828] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {searchResults.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => handleUserSelect(user)}
                                    className="flex items-center p-3 hover:bg-[#404040] cursor-pointer"
                                >
                                    <div className="w-10 h-10 rounded-full bg-[#404040] flex items-center justify-center mr-3">
                                        <FontAwesomeIcon icon={faUser} className="text-[#b3b3b3]" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-medium">{user.name}</h3>
                                        {/* <p className="text-[#b3b3b3] text-sm">{user.email}</p> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div
                    className="flex items-center p-4 cursor-pointer hover:bg-[#282828] py-2 "
                    onClick={() => handleConversationSelect({ id: 'meta_ai', name: 'Meta AI' })}
                >
                    <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
                        <img src={meta} className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="flex-1 items-center">
                        <div className="flex justify-between items-center">
                            <h3 className="text-white text-base font-semibold">Meta AI</h3>
                        </div>
                    </div>
                </div>
                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto">
                    {filteredConversations.map((conversation) => {
                        const otherParticipant = conversation.participants.find(
                            (participant) => parseInt(participant.id) !== parseInt(id_user),
                        );
                        // Lấy tin nhắn cuối cùng từ uniqueMessages cho conversation hiện tại
                        const lastMessage =
                            selectedConversation?.id === conversation.id
                                ? uniqueMessages[uniqueMessages.length - 1]
                                : conversation.last_message;

                        return (
                            <div
                                key={`conversation-${conversation.id}`}
                                onClick={() => handleConversationSelect(conversation)}
                                className={`flex items-center p-4 cursor-pointer hover:bg-[#282828] ${
                                    selectedConversation?.id === conversation.id ? 'bg-[#282828]' : ''
                                }`}
                            >
                                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
                                    <img
                                        src="data:image/jpeg;base64,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"
                                        alt={`Avatar-${otherParticipant?.id}`}
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                </div>
                                <div className="flex-1 items-center">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-white text-base font-semibold">{otherParticipant?.name}</h3>
                                        <span className="text-[#b3b3b3] text-sm">
                                            {lastMessage ? formatTimestamp(lastMessage.timestamp) : ''}
                                        </span>
                                    </div>
                                    <p
                                        className={`text-sm truncate ${
                                            lastMessage && !lastMessage.is_read
                                                ? 'text-white font-bold'
                                                : 'text-[#b3b3b3]'
                                        }`}
                                    >
                                        {lastMessage ? lastMessage.content : 'Chưa có tin nhắn'}
                                    </p>
                                </div>
                                {conversation.unread_count > 0 && (
                                    <div className="ml-4 bg-[#1ed760] text-black w-6 h-6 rounded-full flex items-center justify-center text-sm">
                                        {conversation.unread_count}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* chỗ nhắn tin  */}
            <div className="flex-1 flex flex-col">
                {selectedConversation ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-[#404040] flex items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4">
                                <img
                                    src={assets.like_icon}
                                    alt={`Avatar-${
                                        selectedConversation.participants.find(
                                            (participant) => participant.id !== id_user,
                                        )?.id
                                    }`}
                                    className="w-full h-full object-cover rounded-full"
                                />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">
                                    {
                                        selectedConversation.participants.find(
                                            (participant) => participant.id !== id_user,
                                        )?.name
                                    }
                                </h3>
                                <p className="text-[#b3b3b3] text-sm">online</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {selectedConversation.id === 'meta_ai'
                                ? messagesAI.map((message, index) => (
                                      <div
                                          key={`message-${message.role}-${index}`}
                                          className={`flex ${
                                              message.role === 'user' ? 'justify-end' : 'justify-start'
                                          }`}
                                      >
                                          <div
                                              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                                  message.role === 'user'
                                                      ? 'bg-[#1ed760] text-black'
                                                      : 'bg-[#404040] text-white'
                                              }`}
                                          >
                                              <p className="text-sm">{message.content}</p>
                                          </div>
                                      </div>
                                  ))
                                : uniqueMessages.map((message, index) => (
                                      <div
                                          key={`message-${message.id}-${index}`}
                                          className={`flex ${
                                              message.sender?.id === parseInt(id_user) ? 'justify-end' : 'justify-start'
                                          }`}
                                      >
                                          <div
                                              className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                                                  message.sender?.id === parseInt(id_user)
                                                      ? 'bg-[#1ed760] text-black'
                                                      : 'bg-[#404040] text-white'
                                              }`}
                                          >
                                              <p className="text-sm">{message.content}</p>
                                              <p className="text-xs mt-1 opacity-70">
                                                  {formatTimestamp(message.timestamp)}
                                              </p>
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
