import { useContext } from 'react';

import Header from '@/layouts/components/Header';
import Sidebar from '@/layouts/components/Sidebar';
import Player from '@/layouts/components/Player';

function DefaultLayout({ children }) {
    return (
        <>
            <div className="h-screen bg-black">
                <Header />
                <div className="flex h-[82%]">
                    <Sidebar />
                    {children}
                </div>
                <Player />
                {/* <audio ref={audioRef} src={track ? track.file : ''} preload="auto"></audio> */}
            </div>
        </>
    );
}

export default DefaultLayout;
