import { useEffect, useContext } from 'react';

import GenreItem from '@/components/GenreItem';
import Footer from '@/layouts/components/Footer';
import config from '@/configs';
import { assets } from '@/assets/assets';

function Search() {
    const genresData = [
        {
            _id: '1',
            name: 'Pop',
            bgColor: '#1DB954',
            image: assets.img6,
            isEvent: false,
        },
        {
            _id: '2',
            name: 'Rock',
            bgColor: '#E50914',
            image: assets.img7,
            isEvent: false,
        },
        {
            _id: '3',
            name: 'Hip-Hop',
            bgColor: '#FF9800',
            image: assets.img6,
            isEvent: false,
        },
        {
            _id: '4',
            name: 'EDM',
            bgColor: '#6200EA',
            image: assets.img7,
            isEvent: false,
        },
        {
            _id: '5',
            name: 'Classical',
            bgColor: '#FFC107',
            image: assets.img13,
            isEvent: false,
        },
        {
            _id: '6',
            name: 'Jazz',
            bgColor: '#795548',
            image: assets.img6,
            isEvent: false,
        },
        {
            _id: '7',
            name: 'Concerts',
            bgColor: '#4CAF50',
            image: assets.img7,
            isEvent: true,
        },
    ];
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
