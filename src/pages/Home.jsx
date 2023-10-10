import RestaurantsMap from "../components/RestaurantsMap";
import Container from 'react-bootstrap/Container';

const Home = () => {
    return ( 
        <div>
            <Container>
            <h1>Välkomen till The Pizza Map, här hittar du skånes bästa och skönaste pizza ställen!</h1>
            <RestaurantsMap/>
            </Container>

        </div>
     );
}
 
export default Home;