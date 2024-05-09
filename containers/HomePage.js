import { Link } from "react-router-dom";
import volcanoImage from '../images/volcano.jpg'

// Load the home page for the app
// The home page is stylised by homepage from App.css
// In home page display an image of a volcano and links to the login and register on the site
function HomePage() {
  return (
    <div className="homepage">
      <img src={volcanoImage} alt="Volcano"></img>
      <br/><br/>
      <h1>Find My Volcano</h1>
      <p>Interested in Volcanic activity? Looking for a place to explore? Your in the right place, Welcome to Find My Volcano! <br/>
        Browse and search for known volcano spots around the world. Find out when they erupt, there size, how far away they and more.<br/>
        <br/><Link to="/login">login</Link> or <Link to="/register">register</Link> to have acsess to the full data such as surrounding population density.
        <br/><br/><br/><br/><br/><br/>
      </p>
    </div>
  );
};

// Allow the function to be imported by other files
export default HomePage;