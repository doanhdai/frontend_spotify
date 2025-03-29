import config from '@/configs';
import { Component } from 'react';

/**
 * Layouts routes
 */
import DefaultLayout from '@/layouts/DefaultLayout';
import NoLayout from '@/layouts/NoLayout/NoLayout';
import ArtistLayout from '@/layouts/ArtistLayout';
import AdminLayout from '@/layouts/AdminLayout';

/**
 * User routes
 */
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
import Dashboard from '@/pages/Admin/Dashboard'
import DisplayConcert from '@/components/DisplayConcert';
import DisplayLikeSong from '@/components/DisplayLikeSong';
import DisplayDetaiSong from '@/components/DisplayDetailSong';

/**
 * Admin routes
 */
import DisplayAdminUser from '@/pages/Admin/Account/User';
import DisplayAdminArtist from '@/pages/Admin/Account/Artist';
import DisplayAdminPlayList from '@/pages/Admin/Music/Playlist';
import DisplayAdminSong from '@/pages/Admin/Music/Song';
import DisplayAdminAlbum from '@/pages/Admin/Music/Album';
import DisplayAdminGenre from '@/pages/Admin/Music/Genre';
import DisplayAdminPremium from '@/pages/Admin/Premium';
import DisplayAdminPremiumRegister from '@/pages/Admin/PremiumRegister';

/**
 * Artist routes
 */
import DisplayArtistDashboard from '@/pages/ArtistManager/Dashboard';
import DisplayArtistFormCreate from '@/pages/ArtistManager/FormCreate';
import DisplayArtistSong from '@/pages/ArtistManager/MusicList/Song';
import DisplayArtistAlbum from '@/pages/ArtistManager/MusicList/Album';
import DisplayArtistPlaylist from '@/pages/ArtistManager/MusicList/Playlist';
import DisplayArtisListens from '@/pages/ArtistManager/Statistic/Listens';
import DisplayArtistTurnOver from '@/pages/ArtistManager/Statistic/Turnover';


const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.concerts, component: Concerts },
    { path: config.routes.album + '/:id', component: Album },
    { path: config.routes.artist + '/:id', component: Artist},
    { path: config.routes.genre + '/:id', component: Genre },
    { path: config.routes.signup, component: Signup, layout: NoLayout },
    { path: config.routes.login, component: Login, layout: NoLayout },
    { path: config.routes.likedSongs, component: DisplayLikeSong },
    { path: config.routes.podcast + '/:id', component: Podcast },
    { path: config.routes.playlist + '/:id', component: PlayList },
    { path: config.routes.concerts + '/:id', component: DisplayConcert },
    { path: config.routes.user + '/:id', component: Profile },
    { path: config.routes.detailSong + '/:id', component: DisplayDetaiSong},

    { path: config.routes.admin_dashboard, component: Dashboard, layout: AdminLayout},
    { path: config.routes.admin_user, component: DisplayAdminUser, layout: AdminLayout},
    { path: config.routes.admin_artist, component: DisplayAdminArtist, layout: AdminLayout},
    { path: config.routes.admin_album, component: DisplayAdminAlbum, layout: AdminLayout},
    { path: config.routes.admin_song, component: DisplayAdminSong, layout: AdminLayout},
    { path: config.routes.admin_playlist, component: DisplayAdminPlayList, layout: AdminLayout},
    { path: config.routes.admin_premium, component: DisplayAdminPremium, layout: AdminLayout},
    { path: config.routes.admin_premium_register, component: DisplayAdminPremiumRegister, layout: AdminLayout},
    { path: config.routes.admin_genre, component: DisplayAdminGenre, layout: AdminLayout},

    { path: config.routes.artist_dashboard, component: DisplayArtistDashboard, layout: ArtistLayout},
    { path: config.routes.artist_song, component: DisplayArtistSong, layout: ArtistLayout},
    { path: config.routes.artist_album, component: DisplayArtistAlbum, layout: ArtistLayout},
    { path: config.routes.artist_playlist, component: DisplayArtistPlaylist, layout: ArtistLayout},
    { path: config.routes.artist_createform, component: DisplayArtistFormCreate, layout: ArtistLayout},
    { path: config.routes.artist_listens, component: DisplayArtisListens, layout: ArtistLayout},
    { path: config.routes.artist_turnover, component: DisplayArtistTurnOver, layout: ArtistLayout},
];

const privateRoutes = [

];


export { publicRoutes, privateRoutes };