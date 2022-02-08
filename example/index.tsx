import { useState } from 'react';
import * as ReactDOM from 'react-dom';
import {
  App,
  Center,
  Button,
  Col,
  Container,
  Row,
  Switch,
  Text,
  Chip,
  Badge,
  Card,
  Divider,
  Upload,
  Textarea,
  Toast,
} from './build';
const Main = () => {
  const [on, setOn] = useState(false);
  return (
    <App>
      <Container pa='1em'>
        <Row>
          <Col>
            <Text>this is ui</Text>
          </Col>{' '}
          <Col>
            <Center>
              <Switch
                on={on}
                onChange={() => setOn(v => !v)}
                co={{
                  margin: '0 auto',
                }}
              />
            </Center>
          </Col>
        </Row>
      </Container>
      <Container pa='1em'>
        <Row>
          <Col>
            <Button outlined>this is ui</Button>
          </Col>
          <Col>
            <Button rounded>this is ui</Button>
          </Col>
        </Row>
      </Container>
      <Container pa='1em'>
        <Row>
          <Col>
            <Badge>
              <Button
                onClick={() => {
                  Toast.show('1');
                }}>
                this is Toasts
              </Button>
            </Badge>
          </Col>{' '}
          <Col>
            <Chip>this is chip</Chip>
          </Col>{' '}
        </Row>
      </Container>

      <Container pa='1em'>
        <Row gap='1em'>
          <Col>
            <Card title='this is card1' extra='133' color={t => t.color.grey} co={{ borderRadius: '4px' }}>
              this is content1
            </Card>
          </Col>{' '}
          <Col>
            <Card title='this is card2' extra='133' color={'red'} co={{ borderRadius: '4px' }}>
              this is content2
            </Card>
          </Col>{' '}
        </Row>
      </Container>
      <Divider width={6} />
      <Container pa='1em'>
        <Row gap='1em'>
          <Col>
            <Upload
              onFileChange={file => {
                console.log(file);
              }}
            />
          </Col>{' '}
          <Col>
            <Textarea
              showCount
              onChange={(v, e) => {
                console.log(v);
                console.log(e);
              }}
            />
          </Col>{' '}
        </Row>
      </Container>
    </App>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
