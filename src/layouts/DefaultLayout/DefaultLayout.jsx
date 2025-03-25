import { useRef } from 'react';
import { useSelector } from 'react-redux';

import Header from '@/layouts/components/Header';
import Sidebar from '@/layouts/components/Sidebar';
import Player from '@/layouts/components/Player';
import Footer from '../components/Footer';

function DefaultLayout({ children }) {
    const track = useSelector((state) => state.player.track);
    const audioRef = useRef();

    console.log('Audio URL:', track?.audio);

    return (
        <div className="h-screen bg-black">
            <Header />
            <div className="flex h-[82%]">
                <Sidebar />
                {children}
            </div>
            {/* <Footer /> */}
            <Player />
            {/* <audio ref={audioRef} preload="auto" onError={(e) => console.error('Lỗi tải audio:', e)}></audio> */}
        </div>
    );
}

export default DefaultLayout;
