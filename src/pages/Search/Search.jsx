import Footer from '@/layouts/components/Footer';
import SeachSongAlbumArt from './SeachSongAlbumArt';
import Category from './Catelogy';

function Search() {
    return (
        <div className="bg-[#121212] w-[79%] h-[97.4%] rounded-xl my-2 mr-2 py-4 pt-0 overflow-hidden overflow-y-auto">
            {/* <Category /> */}
            <SeachSongAlbumArt />
            <Footer />
        </div>
    );
}

export default Search;
