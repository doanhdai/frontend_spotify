import config from '@/configs';
import React from 'react';
import { Link } from 'react-router-dom';

const Album = ( props ) => {
    return (
        <div className="flex flex-col  w-40 h-52 p-2 sizing rounded cursor-pointer hover:bg-[#ffffff26]">
            <Link to={config.routes.album + `/${props.id}`}>
                <img className="rounded w-36" src={props.image} alt="" />
            </Link>
            <p className="text-white text-sm font-medium mt-2 line-clamp-2 uppercase">{props.name}</p>
            <p className="text-[#b3b3b3] text-sm font-medium mt-2 line-clamp-2"> {props.artist}</p>
        </div>
    );
};

export default Album;
