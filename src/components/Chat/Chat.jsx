import { useState, useEffect, useRef, useMemo } from 'react';
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
        if (isLoggedIn) {
            wsService.connect();
            fetchConversations();
        }
        return () => {
            wsService.disconnect();
        };
    }, [isLoggedIn]);

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
        messagesEndRef.current?.scrollIntoView();
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
        scrollToBottom();
    };

    useEffect(() => {
        const handleNewMessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message && message.conversation_id) {
                    // Update messages in current conversation
                    if (selectedConversation?.id === message.conversation_id) {
                        dispatch(addMessage(message));
                    }

                    // Update conversation list
                    const updatedConversations = conversations.map((conv) => {
                        if (conv.id === message.conversation_id) {
                            return {
                                ...conv,
                                last_message: {
                                    content: message.message,
                                    timestamp: new Date().toISOString(),
                                    is_read: false,
                                },
                            };
                        }
                        return conv;
                    });
                    dispatch(setConversations(updatedConversations));
                }
            } catch (error) {
                console.error('Error handling new message:', error);
            }
        };

        if (wsService.ws) {
            wsService.ws.onmessage = handleNewMessage;
        }

        return () => {
            if (wsService.ws) {
                wsService.ws.onmessage = null;
            }
        };
    }, [conversations, selectedConversation, dispatch]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() && selectedConversation) {
            const currentUserId = parseInt(id_user);
            const receiver = selectedConversation.participants.find(
                (participant) => parseInt(participant.id) !== currentUserId,
            );

            if (receiver) {
                // Create new message object
                const newMessageObj = {
                    id: Date.now(),
                    content: newMessage,
                    timestamp: new Date().toISOString(),
                    is_read: false,
                    sender: {
                        id: currentUserId,
                    },
                };

                // Send message via WebSocket
                wsService.sendMessage(newMessage, selectedConversation.id, receiver.id);

                // Update local state immediately
                dispatch(addMessage(newMessageObj));

                // Update conversation list
                const updatedConversation = {
                    ...selectedConversation,
                    last_message: newMessageObj,
                };

                const updatedConversations = conversations.map((conv) =>
                    conv.id === selectedConversation.id ? updatedConversation : conv,
                );
                dispatch(setConversations(updatedConversations));

                setNewMessage('');
            }
        }

        if (selectedConversation.id === 'meta_ai') {
            if (!newMessage.trim() || loading) return;

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
    const normalizedMessages = useMemo(() => {
        return messages.map((message) => {
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
    }, [messages]);

    // Loại bỏ tin nhắn trùng lặp dựa trên content và timestamp
    const uniqueMessages = useMemo(() => {
        return normalizedMessages.filter(
            (message, index, self) =>
                index === self.findIndex((m) => m.content === message.content && m.timestamp === message.timestamp),
        );
    }, [normalizedMessages]);

    // Lọc conversations dựa trên tên người dùng và sắp xếp theo thời gian tin nhắn cuối cùng
    const filteredConversations = useMemo(() => {
        return conversations
            .filter((conv) => {
                const otherParticipant = conv.participants.find(
                    (participant) => parseInt(participant.id) !== parseInt(id_user),
                );
                return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase());
            })
            .sort((a, b) => {
                // Nếu không có last_message, đưa xuống cuối
                if (!a.last_message && !b.last_message) return 0;
                if (!a.last_message) return 1;
                if (!b.last_message) return -1;

                // So sánh thời gian của last_message
                return new Date(b.last_message.timestamp) - new Date(a.last_message.timestamp);
            });
    }, [conversations, searchQuery, id_user]);

    // console.log(filteredConversations);
    const formatTimestamp = (dateString) => {
        const postDate = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.abs(now - postDate) / 36e5;

        if (diffInHours < 24) {
            // Nếu trong vòng 24 giờ, hiển thị giờ
            const hours = Math.floor(diffInHours);
            if (hours === 0) {
                const minutes = Math.floor(diffInHours * 60);
                return `${minutes} phút trước`;
            }
            return `${hours} giờ trước`;
        } else {
            // Nếu quá 24 giờ, hiển thị ngày
            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            };
            return postDate.toLocaleDateString('vi-VN', options);
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
                        console.log(conversation)
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
                                        src={assets.avt}
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
                                            conversation.unread_count > 0 ? 'text-white font-bold' : 'text-[#b3b3b3]'
                                        }`}
                                    >
                                        {lastMessage ? lastMessage.content : 'Chưa có tin nhắn'}
                                    </p>
                                </div>
                                {/* {conversation.unread_count > 0 && (
                                    <div className="ml-4 bg-[#1ed760] text-black w-6 h-6 rounded-full flex items-center justify-center text-sm">
                                        {conversation.unread_count}
                                    </div>
                                )} */}
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
                        <div className="p-3.5 border-b border-[#404040] flex items-center">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4">
                                <img
                                    src={assets.avt}
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
                        <div className="flex-1 overflow-y-auto p-4 space-y-1">
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
                                              {/* <p className="text-xs mt-1 opacity-70">
                                                  {formatTimestamp(message.timestamp)}
                                              </p> */}
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
