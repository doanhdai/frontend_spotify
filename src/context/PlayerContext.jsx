// import { createContext, useEffect, useRef, useState } from 'react';
// import axios from 'axios';

// export const PlayerContext = createContext();

// const PlayerContextProvider = ({ children }) => {
//     const audioRef = useRef();
//     const seekBg = useRef();
//     const seekBar = useRef();
//     const scrollHomeRef = useRef();
//     const bgHomeHeader = useRef();

//     const url = 'http://localhost:4000';

//     const [user, setUser] = useState(false);
//     const [usersData, setUsersData] = useState([]);
//     const [songsData, setSongsData] = useState([]);
//     const [albumsData, setAlbumsData] = useState([]);
//     const [playlistsData, setPlaylistsData] = useState([]);
//     const [artistsData, setArtistsData] = useState([]);
//     const [genresData, setGenresData] = useState([]);
//     const [concertsData, setConcertsData] = useState([]);
//     const [track, setTrack] = useState(songsData[0]);
//     const [playStatus, setPlayStatus] = useState(false);
//     const [time, setTime] = useState({
//         currentTime: {
//             second: 0,
//             minute: 0,
//         },
//         totalTime: {
//             second: 0,
//             minute: 0,
//         },
//     });

//     const play = () => {
//         audioRef.current.play();
//         setPlayStatus(true);
//     };

//     const pause = () => {
//         audioRef.current.pause();
//         setPlayStatus(false);
//     };

//     const playWithId = async (id) => {
//         await songsData.map((item) => {
//             if (id === item._id) {
//                 setTrack(item);
//                 console.log(item);
//             }
//         });
//         await audioRef.current.play();
//         setPlayStatus(true);
//     };

//     const currentPlaylist = songsData?.filter((song) => song.playlist === track?.playlist) || [];

//     const previous = async () => {
//         if (track && currentPlaylist.length > 0) {
//             const currentIndex = currentPlaylist.findIndex((song) => song._id === track._id);
//             if (currentIndex > 0) {
//                 await setTrack(currentPlaylist[currentIndex - 1]);
//                 await audioRef.current.play();
//                 setPlayStatus(true);
//             }
//         }
//     };

//     const next = async () => {
//         if (track && currentPlaylist.length > 0) {
//             const currentIndex = currentPlaylist.findIndex((song) => song._id === track._id);
//             if (currentIndex < currentPlaylist.length - 1) {
//                 await setTrack(currentPlaylist[currentIndex + 1]);
//                 await audioRef.current.play();
//                 setPlayStatus(true);
//             }
//         }
//     };

//     const seekSong = async (e) => {
//         audioRef.current.currentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
//     };

//     const getUsersData = async () => {
//         try {
//             const response = await axios.get(`${url}/api/v1/client/user`);
//             setUsersData(response.data.users);
//             console.log(response.data.users);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getSongsData = async () => {
//         try {
//             const response = await axios.get(`${url}/api/v1/client/song`);
//             setSongsData(response.data.songs);
//             console.log(response.data.songs);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getAlbumsData = async () => {
//         try {
//             const response = await axios.get(`${url}/api/v1/client/album`);
//             setAlbumsData(response.data.albums);
//             console.log(response.data.albums);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getPlaylistsData = async () => {
//         try {
//             const response = await axios.get(`${url}/api/v1/client/playlist`);
//             setPlaylistsData(response.data.playlists);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getArtistData = async () => {
//         try {
//             const response = await axios.get(`${url}/api/v1/client/artist`);
//             setArtistsData(response.data.artists);
//             console.log(response.data.artists);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getGenresData = async () => {
//         try {
//             const response = await axios.get(`${url}/api/v1/client/genre`);
//             setGenresData(response.data.genres);
//             console.log(response.data.genres);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getConcertsData = async () => {
//         try {
//             const response = await axios.get(`${url}/api/v1/client/concert`);
//             setConcertsData(response.data.concerts);
//             console.log(response.data.concerts);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         setTimeout(() => {
//             audioRef.current.ontimeupdate = () => {
//                 seekBar.current.style.width =
//                     Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100) + '%';
//                 setTime({
//                     currentTime: {
//                         second: Math.floor(audioRef.current.currentTime % 60),
//                         minute: Math.floor(audioRef.current.currentTime / 60),
//                     },
//                     totalTime: {
//                         second: Math.floor(audioRef.current.duration % 60),
//                         minute: Math.floor(audioRef.current.duration / 60),
//                     },
//                 });
//             };
//         }, 1000);
//     }, [audioRef]);

//     useEffect(() => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             setUser(true);
//         } else {
//             setUser(false);
//         }
//     });

//     useEffect(() => {
//         getUsersData();
//         getSongsData();
//         getAlbumsData();
//         getPlaylistsData();
//         getArtistData();
//         getGenresData();
//         getConcertsData();
//     }, []);

//     const contextValue = {
//         user,
//         setUser,
//         audioRef,
//         scrollHomeRef,
//         bgHomeHeader,
//         seekBg,
//         seekBar,
//         track,
//         setTrack,
//         playStatus,
//         setPlayStatus,
//         time,
//         setTime,
//         play,
//         pause,
//         playWithId,
//         previous,
//         next,
//         seekSong,
//         usersData,
//         songsData,
//         albumsData,
//         playlistsData,
//         artistsData,
//         genresData,
//         concertsData,
//     };

//     return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
// };

// export default PlayerContextProvider;
