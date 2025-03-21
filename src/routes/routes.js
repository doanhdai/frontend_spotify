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
import Premium from '@/pages/Premium';
import PremiumRegister from '@/pages/PremiumRegister';
import Settings from '@/pages/Settings';
import DisplayConcert from '@/components/DisplayConcert';
import DisplayLikeSong from '@/components/DisplayLikeSong';

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.concerts, component: Concerts },
    { path: config.routes.album + '/:id', component: Album },
    { path: config.routes.artist + '/:id', component: Artist },
    { path: config.routes.genre + '/:id', component: Genre },
    { path: config.routes.signup, component: Signup, layout: NoLayout },
    { path: config.routes.login, component: Login, layout: NoLayout },
];

const privateRoutes = [
    { path: config.routes.likedSongs, component: DisplayLikeSong },
    { path: config.routes.podcast + '/:id', component: Podcast },
    { path: config.routes.playlist + '/:id', component: PlayList },
    { path: config.routes.concerts + '/:id', component: DisplayConcert },
    { path: config.routes.user + '/:id', component: Profile },
    { path: config.routes.settings, component: Settings},
    { path: config.routes.premium, component: Premium},
    { path: config.routes.premium_register + '/:id', component: PremiumRegister},
];


export { publicRoutes, privateRoutes };
