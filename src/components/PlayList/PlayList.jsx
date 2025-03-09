import { Link } from 'react-router-dom';
import config from '@/configs';

function PlayList(props) {
    return (
        <div className="flex flex-col items-center w-40 h-52 p-2 sizing rounded cursor-pointer hover:bg-[#ffffff26]">
            <Link to={config.routes.playlist + `/${props.id}`}>
                <img className="rounded w-36" src={props.image} alt="" />
            </Link>
            <p className="text-[#b3b3b3] text-left text-sm font-medium mt-2 line-clamp-2">{props.desc}</p>
        </div>
    );
}

export default PlayList;
