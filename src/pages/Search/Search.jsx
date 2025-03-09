import { useEffect, useContext } from 'react';
import { PlayerContext } from '@/context/PlayerContext';
import GenreItem from '@/components/GenreItem';
import Footer from '@/layouts/components/Footer';
import config from '@/configs';

function Search() {
    const { genresData } = useContext(PlayerContext);

    useEffect(() => {
        document.title = 'Spotify - Tìm kiếm';
    }, []);

    return (
        <div className="bg-[#121212] w-[79%] h-[97.4%] rounded-xl my-2 mr-2 py-4 pt-0 overflow-hidden overflow-y-auto">
            <div className="ml-2 mt-20 mb-12">
                <h1 className="text-white font-bold text-2xl ml-3 mb-2">Duyệt tìm tất cả</h1>
                <div className="grid grid-cols-4">
                    {genresData.map((item, index) => (
                        <GenreItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            bgColor={item.bgColor}
                            image={item.image}
                            link={item.isEvent ? config.routes.concerts : config.routes.genre + `/${item._id}`}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Search;
