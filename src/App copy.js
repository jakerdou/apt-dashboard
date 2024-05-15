import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SubwayCard from "./component/SubwayCard";
import BusCard from "./component/BusCard";
import WeatherCard from "./component/WeatherCard";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <SubwayCard 
            imgUrl={"https://transitgifts.com/cdn/shop/products/28249_1024x1024@2x.jpg?v=1559005970"}
            train_id={"E"}
          />
        </Col>
        <Col>
          <SubwayCard 
            imgUrl={"https://transitgifts.com/cdn/shop/products/28269_1024x1024@2x.jpg?v=1559005989"}
            train_id={"F"}
            right={true}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SubwayCard 
            imgUrl={"https://transitgifts.com/cdn/shop/products/28261_1024x1024@2x.jpg?v=1559005981"}
            train_id={"6"}
          />
        </Col>
        <Col>
          <BusCard 
            busId={'M15'}
            right={true}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <WeatherCard />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
