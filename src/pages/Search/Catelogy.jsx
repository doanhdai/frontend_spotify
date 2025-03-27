import React from 'react';

const categories = [
    { name: 'Music', color: 'bg-pink-600', image: 'https://via.placeholder.com/100' },
    { name: 'Podcasts', color: 'bg-green-700', image: 'https://via.placeholder.com/100' },
    { name: 'Live Events', color: 'bg-purple-700', image: 'https://via.placeholder.com/100' },
    { name: 'Made For You', color: 'bg-blue-900', image: 'https://via.placeholder.com/100' },
    { name: 'New Releases', color: 'bg-green-600', image: 'https://via.placeholder.com/100' },
    { name: 'Vietnamese Music', color: 'bg-blue-500', image: 'https://via.placeholder.com/100' },
    { name: 'Pop', color: 'bg-blue-400', image: 'https://via.placeholder.com/100' },
    { name: 'K-pop', color: 'bg-red-600', image: 'https://via.placeholder.com/100' },
    { name: 'Hip-Hop', color: 'bg-orange-600', image: 'https://via.placeholder.com/100' },
    { name: 'Podcast Charts', color: 'bg-blue-600', image: 'https://via.placeholder.com/100' },
    { name: 'Educational', color: 'bg-blue-500', image: 'https://via.placeholder.com/100' },
    { name: 'Documentary', color: 'bg-gray-700', image: 'https://via.placeholder.com/100' },
    { name: 'Comedy', color: 'bg-purple-500', image: 'https://via.placeholder.com/100' },
    { name: 'Charts', color: 'bg-purple-400', image: 'https://via.placeholder.com/100' },
    { name: 'Fresh Finds', color: 'bg-pink-500', image: 'https://via.placeholder.com/100' },
    { name: 'EQUAL', color: 'bg-green-700', image: 'https://via.placeholder.com/100' },
];

const Category = () => {
    return (
        <div className="bg-black p-6 min-h-screen">
            <h1 className="text-white text-2xl font-bold mb-6">Browse all</h1>
            <div className="grid grid-cols-4 gap-4">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`relative p-4 rounded-lg ${category.color} h-32 flex items-center justify-start cursor-pointer hover:scale-105 transition-transform duration-200`}
                    >
                        <h2 className="text-white text-lg font-semibold z-10">{category.name}</h2>
                        <img
                            src={category.image}
                            alt={category.name}
                            className="absolute right-3 top-3 w-16 h-16 rotate-12 rounded-md shadow-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
