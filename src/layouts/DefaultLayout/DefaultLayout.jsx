import { useContext, useState } from 'react';
import Header from '@/layouts/components/Header';
import Sidebar from '@/layouts/components/Sidebar';
import Player from '@/layouts/components/Player';
import SidebarArtist from '@/layouts/components/SidebarArtist';
import { useLocation } from 'react-router-dom';

function DefaultLayout({ children }) {
    const location = useLocation()

    return (
        <>
            <div className="h-screen bg-black">
                <Header />
                <div className="flex h-[82%]">
                    {location.pathname === "/create-album" ? <SidebarArtist /> : <Sidebar />}
                    {children}
                </div>
                {/* <Player /> */}
                {/* <audio ref={audioRef} src={track ? track.file : ''} preload="auto"></audio> */}
            </div>
        </>
    );
}

export default DefaultLayout;
