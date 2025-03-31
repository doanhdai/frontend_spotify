import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import Footer from '@/layouts/components/Footer';
import config from '@/configs';
import { useTranslation } from 'react-i18next';

function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const { t } = useTranslation();

    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const query = searchParams.get('keyword') || '';
        setSearchTerm(query);
    }, [location.search]);

    useEffect(() => {
        if (searchTerm.trim() === '') return;

        const delaySearch = setTimeout(() => {
            navigate(`/search?keyword=${encodeURIComponent(searchTerm.trim())}`);
        }, 50);

        return () => clearTimeout(delaySearch);
    }, [searchTerm, navigate]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <>
            <Tippy content="Tìm kiếm">
                <div className="flex">
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        className="w-6 h-6 px-3 hover:text-white transition-colors duration-200"
                        onClick={handleFocus}
                    />
                </div>
            </Tippy>
            <input
                ref={inputRef}
                className="bg-transparent w-full h-full focus:outline-none"
                type="text"
                placeholder={t('header.inputsearch')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <div className="absolute right-[60px] h-[24px] w-[1px] bg-gray-500"></div>
            <Link to={config.routes.category}>
                <Tippy content={t('header.browse')}>
                    <div className="px-5 text-[#b3b3b3] relative hover:text-white hover:scale-110">
                        <FontAwesomeIcon icon={faFolderOpen} onClick={() => handleCalogry()} />
                    </div>
                </Tippy>
            </Link>
        </>
    );
}

export default Search;
