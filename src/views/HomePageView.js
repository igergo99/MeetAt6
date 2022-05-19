/* Components */
import PictureSlider from '../components/HomePage/PictureSlider';
import EventSlider from '../components/HomePage/EventSlider';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import EventContainer from '../components/HomePage/EventContainer';

const HomePageView = () => {
  return (
    <div>
      <PictureSlider />

      <EventSlider 
        containerName={'Legfrissebb események'}
        searchKey={'paymentType'}
        searchValue={'free'}
      />

      <EventSlider 
        containerName={'Kiemelt események'}
        searchKey={'paymentType'}
        searchValue={'ticket'}
      />
    </div>
  );
}

export default HomePageView;
