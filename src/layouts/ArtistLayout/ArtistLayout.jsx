import HeaderArtist from '@/layouts/components/HeaderArtist';
import SidebarArtist from '@/layouts/components/SidebarArtist';


const ArtistLayout = ({ children }) => {
    return (
        <div className="h-screen bg-gray-800">
            <HeaderArtist />
            <div className="flex h-[82%]">
                <SidebarArtist />
                {children}
            </div>
        </div>
    )
}

export default ArtistLayout;