import config from '@/configs';
import NoLayout from '@/layouts/NoLayout/NoLayout';

import Home from '@/pages/Home';
import PlayList from '@/pages/Playlist';
import Album from '@/pages/Album';
import Artist from '@/pages/Artist';
import Podcast from '@/pages/Podcast';
import Search from '@/pages/Search';
import Genre from '@/pages/Genre';
import Concerts from '@/pages/Concerts';
import Signup from '@/pages/Signup';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import DisplayConcert from '@/components/DisplayConcert';
import DisplayLikeSong from '@/components/DisplayLikeSong';
import DisplayDetaiSong from '@/components/DisplayDetailSong';
import DefaultLayout from '@/layouts/DefaultLayout';
import ChatPage from '@/pages/Chat';
import Category from '@/pages/Search/Catelogy';
import SeachSongAlbumArt from '@/pages/Search/SeachSongAlbumArt';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: SeachSongAlbumArt },
    { path: config.routes.chat, component: ChatPage },
    { path: config.routes.category, component: Category },
    { path: config.routes.concerts, component: Concerts },
    { path: config.routes.album + '/:id', component: Album },
    { path: config.routes.artist + '/:id', component: Artist },
    { path: config.routes.genre + '/:id', component: Genre },
    { path: config.routes.signup, component: Signup, layout: NoLayout },
    { path: config.routes.login, component: Login, layout: NoLayout },
    { path: config.routes.likedSongs, component: DisplayLikeSong },
    { path: config.routes.podcast + '/:id', component: Podcast },
    { path: config.routes.playlist + '/:id', component: PlayList },
    { path: config.routes.concerts + '/:id', component: DisplayConcert },
    { path: config.routes.user + '/:id', component: Profile },
    { path: config.routes.detailSong + '/:id', component: DisplayDetaiSong },
    // { path: config.routes.searchSongAlbumArt, component: SearchSongAlbumArt },
];

const privateRoutes = [
    //...
];

export { publicRoutes, privateRoutes };
