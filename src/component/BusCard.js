import Card from 'react-bootstrap/Card';

function BusCard({ busId, right }) {
  return (
    <div className="BusCard">
        <Card style={{ width: '321.6px', margin: '1em', padding: '2em 5em', float: right ? 'right' : 'left' }}>
            <Card.Body>
                <Card.Title style={{textAlign: 'center', backgroundColor: '#1d59b3', color: 'white', fontSize: '3.7em', borderRadius: '15px', padding: '8px' }}>{busId}</Card.Title>
                <Card.Text>
                    ehhh we're workin on it
                </Card.Text>
            </Card.Body>
        </Card>
    </div>
  );
}

export default BusCard;