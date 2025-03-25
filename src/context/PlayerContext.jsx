import { createContext, useEffect, useRef, useState } from 'react';
import { getAllSongs } from '@/service/apiService';

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();
    const scrollHomeRef = useRef();
    const bgHomeHeader = useRef();
    const [songsData, setSongsData] = useState([]);
    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);
    const [volume, setVolume] = useState(1);
    const [time, setTime] = useState({
        currentTime: { second: 0, minute: 0 },
        totalTime: { second: 0, minute: 0 },
    });

    // Hàm lấy tất cả bài hát
    const fetchAllSongs = async () => {
        try {
            const response = await getAllSongs();
            setSongsData(response.data);
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu bài hát!', error);
        }
    };

    // Khởi tạo dữ liệu bài hát khi component mount
    useEffect(() => {
        fetchAllSongs();
    }, []);

    // Khôi phục trạng thái từ localStorage khi component mount
    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem('musicPlayerState'));
        if (savedState && savedState.track) {
            setTrack(savedState.track);
            if (audioRef.current) {
                audioRef.current.src = savedState.track.audio;
                audioRef.current.currentTime = savedState.currentTime || 0;
                if (seekBar.current && savedState.seekBarWidth) {
                    seekBar.current.style.width = savedState.seekBarWidth;
                }
            }
        } else if (songsData.length > 0) {
            setTrack(songsData[0]);
        }
    }, [songsData]);

    // Cập nhật audio khi track thay đổi
    useEffect(() => {
        if (track && audioRef.current) {
            audioRef.current.src = track.audio;
            audioRef.current.load();
            if (playStatus) {
                audioRef.current.play().catch((error) => console.error('Lỗi phát nhạc:', error));
            }
        }
    }, [track]);

    // Cập nhật thời gian và thanh seek
    useEffect(() => {
        const updateTime = () => {
            if (audioRef.current.readyState >= 2) {
                const currentTime = audioRef.current.currentTime;
                const duration = audioRef.current.duration;
                seekBar.current.style.width = Math.floor((currentTime / duration) * 100) + '%';
                setTime({
                    currentTime: {
                        second: Math.floor(currentTime % 60),
                        minute: Math.floor(currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(duration % 60),
                        minute: Math.floor(duration / 60),
                    },
                });
            }
        };

        if (audioRef.current) {
            audioRef.current.ontimeupdate = updateTime;
            audioRef.current.volume = volume;
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = null;
            }
        };
    }, [volume]);

    // Lưu trạng thái vào localStorage khi track, playStatus hoặc time thay đổi
    useEffect(() => {
        if (track && audioRef.current) {
            const currentState = {
                track,
                currentTime: audioRef.current.currentTime || 0,
                seekBarWidth: seekBar.current?.style.width || '0%',
            };
            localStorage.setItem('musicPlayerState', JSON.stringify(currentState));
        }
    }, [track, playStatus, time]);

    // Hàm phát nhạc
    const play = () => {
        if (audioRef.current) {
            audioRef.current
                .play()
                .then(() => setPlayStatus(true))
                .catch((error) => console.error('Lỗi khi phát nhạc:', error));
        }
    };

    // Hàm tạm dừng nhạc
    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    // Hàm phát bài hát theo ID
    const playWithId = (id) => {
        const song = songsData.find((item) => item.id === id); // Sửa ma_bai_hat thành id
        if (song) {
            setTrack(song);
            setPlayStatus(true);
        }
    };

    // Hàm tua bài hát
    const seekSong = (e) => {
        if (audioRef.current && seekBg.current) {
            const newCurrentTime = (e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration;
            audioRef.current.currentTime = newCurrentTime;
        }
    };

    // Hàm cập nhật âm lượng
    const updateVolume = (newVolume) => {
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    // Hàm tắt tiếng
    const muteVolume = () => {
        setVolume(0);
        if (audioRef.current) {
            audioRef.current.volume = 0;
        }
    };

    const contextValue = {
        audioRef,
        scrollHomeRef,
        bgHomeHeader,
        seekBg,
        seekBar,
        track,
        setTrack,
        playStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause,
        muteVolume,
        playWithId,
        seekSong,
        setVolume: updateVolume,
    };

    return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};

export default PlayerContextProvider;
