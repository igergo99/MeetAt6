import './App.css';
import { Routes, Route } from 'react-router-dom';

/* Components */
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import ChosenEvents from './components/profile/ChosenEvents';
import AddEvent from './components/profile/AddEvent';
import MyEvents from './components/profile/MyEvents';
import SearchEvent from './components/profile/SearchEvent';
import Settings from './components/profile/Settings';
import LogOut from './components/profile/LogOut';

/* Views */
import AboutView from './views/AboutView';
import EventsView from './views/EventsView';
import ProfileView from './views/ProfileView';
import HomePageView from './views/HomePageView';
import SigninView from './views/SigninView';
import PrivacyView from './views/PrivacyView';

/* Layouts */
import MainPageLayout from './layouts/MainPageLayout';
import UserMainPageLayout from './layouts/UserMainPageLayout';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route element={<MainPageLayout />}>
          <Route path='/' element={<HomePageView />} />
          <Route path='/home' element={<HomePageView />} />
          <Route path='/about' element={<AboutView />} />
          <Route path='/privacy' element={<PrivacyView />} />
          <Route path='/events' element={<EventsView />} />
          <Route path='/login' element={<SigninView />} />
        </Route>

        <Route element={<UserMainPageLayout />}>
          <Route path='/profile' element={<ProfileView />} />
          <Route path='/profile/chosenevents' element={<ChosenEvents />} />
          <Route path='/profile/addevent' element={<AddEvent />} />
          <Route path='/profile/myevents' element={<MyEvents />} />
          <Route path='/profile/searchevent' element={<SearchEvent />} />
          <Route path='/profile/settings' element={<Settings />} />
          <Route path='/signout' element={<LogOut />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
