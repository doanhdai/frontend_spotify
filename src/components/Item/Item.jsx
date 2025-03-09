import { Link } from 'react-router-dom';
import config from '@/configs';

function Item(props) {
    return (
        <div className="flex flex-col justify-center w-40 h-54 p-2 sizing rounded cursor-pointer hover:bg-[#ffffff26]">
            <Link to={config.routes.album + `/${props.id}`}>
                <img className="rounded w-36" src={props.image} alt="" />
            </Link>
            <p className="text-white font-bold mt-2 hover:underline text-[15px]">{props.name}</p>
            <p className="text-[#b3b3b3] text-left text-sm font-medium line-clamp-2">{props.desc}</p>
        </div>
    );
}

export default Item;
