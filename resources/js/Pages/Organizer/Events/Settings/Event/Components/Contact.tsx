import { Button, Card, CardBody, CardHeader, CardText, CardTitle } from 'react-bootstrap';

export default function Contact() {
  return (
    <Card>
        <CardHeader className="d-flex justify-content-between align-items-center gap-2">
          <div>
            <CardTitle>Contact information</CardTitle>
            <CardText>This information is visible to attendees on the apps and event homepage.</CardText>
          </div>
          <div>
            <Button>Save</Button>
          </div>
        </CardHeader>
        <CardBody>
            
        </CardBody>
    </Card>
  )
}
