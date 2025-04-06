import { store } from '@/redux/store';
import { addMessage } from '@/redux/Reducer/chatSlice';

class WebSocketService {
    constructor() {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 3000;
    }

    getTokenFromStore() {
        const state = store.getState();
        return state.auth.token; 
    }

    connect() {
        const authToken = this.getTokenFromStore(); 
        if (!authToken) {
            console.error('No token available in Redux store for WebSocket connection');
            return;
        }
        console.log('Connecting with token:', authToken);
        const wsUrl = `ws://localhost:8000/ws/chat/?token=${authToken}`;
        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
            console.log('WebSocket Connected');
            this.reconnectAttempts = 0;
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                store.dispatch(addMessage(data));
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        this.ws.onclose = () => {
            console.log('WebSocket Disconnected');
            this.handleReconnect();
        };

        this.ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };
    }

    handleReconnect() {
        const authToken = this.getTokenFromStore(); 
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
            setTimeout(() => this.connect(), this.reconnectDelay);
        } else {
            console.error('Max reconnection attempts reached');
        }
    }

    sendMessage(content, conversationId, receiverId) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            const message = {
                message: content,
                conversation_id: conversationId,
                receiver_id: receiverId
            };
            this.ws.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected');
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}

export const wsService = new WebSocketService();