import { store } from '@/redux/store';
import { addMessage } from '@/redux/Reducer/chatSlice';

class WebSocketService {
    constructor() {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 3000;
        this.isConnecting = false;
    }

    getTokenFromStore() {
        const state = store.getState();
        return state.auth.token; 
    }

    connect() {
        if (this.isConnecting || this.ws?.readyState === WebSocket.OPEN) return;
        
        this.isConnecting = true;
        const authToken = this.getTokenFromStore(); 
        if (!authToken) {
            console.error('No token available in Redux store for WebSocket connection');
            this.isConnecting = false;
            return;
        }

        const wsUrl = `ws://localhost:8000/ws/chat/?token=${authToken}`;
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
            console.log('WebSocket Connected');
            this.reconnectAttempts = 0;
            this.isConnecting = false;
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'message_read') {
                    // Xử lý sự kiện tin nhắn đã đọc
                    store.dispatch(updateMessageReadStatus({
                        messageId: data.message_id,
                        isRead: true
                    }));
                } else {
                    // Xử lý tin nhắn mới
                    store.dispatch(addMessage(data));
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        this.ws.onclose = () => {
            console.log('WebSocket Disconnected');
            this.isConnecting = false;
            this.handleReconnect();
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
            this.isConnecting = false;
        };
    }

    handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
            setTimeout(() => this.connect(), this.reconnectDelay);
        } else {
            console.error('Max reconnection attempts reached');
        }
    }

    sendMessage(content, conversationId, receiverId) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.log('WebSocket not connected, attempting to connect...');
            this.connect();
            // Retry sending after a short delay
            setTimeout(() => {
                if (this.ws?.readyState === WebSocket.OPEN) {
                    this._sendMessage(content, conversationId, receiverId);
                }
            }, 1000);
            return;
        }
        this._sendMessage(content, conversationId, receiverId);
    }

    _sendMessage(content, conversationId, receiverId) {
        const message = {
            message: content,
            conversation_id: conversationId,
            receiver_id: receiverId
        };
        this.ws.send(JSON.stringify(message));
    }
    // Thêm phương thức mới để đánh dấu tin nhắn đã đọc
    markMessageAsRead(messageId, conversationId) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.log('WebSocket not connected, attempting to connect...');
            this.connect();
            setTimeout(() => {
                if (this.ws?.readyState === WebSocket.OPEN) {
                    this._markMessageAsRead(messageId, conversationId);
                }
            }, 1000);
            return;
        }
        this._markMessageAsRead(messageId, conversationId);
    }

    _markMessageAsRead(messageId, conversationId) {
        const message = {
            type: 'mark_as_read',
            message_id: messageId,
            conversation_id: conversationId
        };
        this.ws.send(JSON.stringify(message));
    }
    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
            this.isConnecting = false;
        }
    }
}

export const wsService = new WebSocketService();