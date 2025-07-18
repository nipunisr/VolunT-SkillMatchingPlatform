import { Outlet } from 'react-router-dom';
import OrganizerNavbar from '../components/OrganizerNavbar';
import Footer from '../components/Footer';


const OrganizerLayout = () => (
  <div>
    <OrganizerNavbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default OrganizerLayout;
