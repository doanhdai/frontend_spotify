import apiClient from '../api/axiosClient';
import axios from 'axios';

export const loginUser = async (data) => {
    const response = await apiClient.post('/users/login/', data);
    return response.data;
};

export const refreshToken = async (refreshToken) => {
    const response = await axios.post(`${import.meta.env.VITE_REACT_API}/auth/token/refresh/`, {
        refresh: refreshToken,
    });
    return response.data;
};

/**
 * Get requestrequest
 */
export const getAllUser = async () => apiClient.get('/users/getAll/'); // get all users

export const createNewPlaylist = async () => apiClient.post('/songs/playlists/create/');
export const deletePlaylist = async (id) => apiClient.delete(`/songs/playlists/delete/${id}/`);

export const getAllArtist = async () => apiClient.get('/users/artist/getAll/');
export const getAll = async () => apiClient.get('/users/artist/getAll/');
export const getAllPlaylist = async () => apiClient.get('/songs/playlists/get-all/');
export const getAllSongs = async () => apiClient.get('/songs/all/');
export const getSongById = async (id) => apiClient.get(`/songs/detail/${id}/`);

export const getSongPlaylist = async (id) => apiClient.get(`/songs/playlists/${id}/songs/`);

export const getFavoriteSongs = async () => apiClient.get('songs/favorites/list/');
export const getArtistSong = async (idArtist) => apiClient.get(`/songs/artist/${idArtist}/`);

export const searchSongsByName = async (query) => apiClient.get(`/songs/search/?keyword=${query}`);
export const getCategory = async () => apiClient.get('/songs/genres/list/');

export const addSongToPlaylist = async (data) => apiClient.post(`/songs/playlists/add-song/`, data);
export const removeSongFromPlaylist = async (data) => apiClient.delete(`/songs/playlists/remove-song/`, { data });

export const addLikeSong = async (data) => apiClient.post(`/songs/favorites/`, data);
export const removeLikeSong = async (idSong) => apiClient.delete(`/songs/favorites/${idSong}/`);

export const getAlbum = async () => apiClient.get('/songs/album/all/');
export const getAlbumById = async (idAlbum) => apiClient.get(`/songs/album/${idAlbum}/detail/`);

export const getGenres = async () => apiClient.get('/songs/genres/list/');

export const getAllPremium = async () => apiClient.get('/premium/list');

// chat
export const getChat = async (conversation_id) => apiClient.get(`/conversations/${conversation_id}/messages/`); // get all messages in a conversation
export const getAllConversation = async () => apiClient.get('/conversations/'); // get all conversations

export const createConversation = async (data) => apiClient.post('/conversations/', data); // create a new conversation

export const getChatAI = async (message) => apiClient.post('/chat/', { message }); // get chat ai

/**
 * Post request
 */
export const postArtistSong = async () => apiClient.post('/songs/create');
export const postArtistAlbum = async () => apiClient.post('/songs/album'); // post artist album
export const postArtistPlaylist = async () => apiClient.post('/playlist'); // post artist playlist
