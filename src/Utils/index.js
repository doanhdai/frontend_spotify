export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

export const GetSongDuration = ({ audioUrl, setDuration }) => {
    useEffect(() => {
        const audio = new Audio(audioUrl);
        audio.addEventListener("loadedmetadata", () => {
            setDuration(audio.duration); // Lấy thời gian khi metadata load xong
        });

        return () => {
            audio.removeEventListener("loadedmetadata", () => {});
        };
    }, [audioUrl]);

    return null; 
};