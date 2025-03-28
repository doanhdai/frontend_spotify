import apiClient from './api';


export const loginUser = async (data) => {
    const response = await apiClient.post('/users/login/', data);
    return response.data;
};

export const refreshToken = async (refreshToken) => {
    const response = await apiClient.post('/auth/token/refresh/', { refresh: refreshToken });
    return response.data;
};

export const createNewPlaylist = async () => apiClient.post('/songs/playlists/create/')
export const deletePlaylist = async (id) => apiClient.delete(`/songs/playlists/delete/${id}/`)


export const getAllArtist = async () => apiClient.get('/users/artist/getAll/');
export const getAllPlaylist = async () => apiClient.get('/songs/playlists/get-all/');
export const getAllSongs = async () => apiClient.get('/songs/all/');
export const getSongById = async (id) => apiClient.get(`/songs/detail/${id}/`);



export const getSongPlaylist = async (id) => apiClient.get(`/songs/playlists/${id}/songs/`);
export const addSongToPlaylist = async (data) => apiClient.post(`/songs/playlists/add-song/`, data)
export const removeSongFromPlaylist = async (data) => apiClient.delete(`/songs/playlists/remove-song/`, {data})

export const getArtistSong =  async (idArtist) => apiClient.get(`/songs/artist/${idArtist}/`)


export const getFavoriteSongs = async () => apiClient.get('songs/favorites/list/')
export const addLikeSong = async (data) => apiClient.post(`/songs/favorites/`, data)
export const removeLikeSong = async (idSong) => apiClient.delete(`/songs/favorites/${idSong}/`)
