import { useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';
import {
  Drawer,
  Swiper,
  App,
  Center,
  Input,
  Button,
  Col,
  AppBar,
  Container,
  Row,
  Switch,
  List,
  Text,
  Segment,
  Chip,
  Badge,
  Card,
  Divider,
  Upload,
  Textarea,
  Toast,
  Slider,
  Navigation,
  Overlay,
  Image,
} from '../src';
const Main = () => {
  const ref = useRef();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [v, setV] = useState('0.3');
  const [on, setOn] = useState(false);
  const [item, setItem] = useState([1, 4, 4, 5]);
  const [currentIndex, setCurrentIndex] = useState(2);
  return (
    <App>
      <AppBar></AppBar>
      <Container pa='1em'>
        <Row>
          <Col>
            <Slider value={v} onChange={v => setV(v)} />
          </Col>
        </Row>
      </Container>
      <Container pa='1em'>
        <Row>
          <Col>
            <Input
              label='UserName'
              labelStyle={{
                color: 'red',
              }}
              message='username valid error'
              verify={v => {
                if (v.length > 6) {
                  return false;
                }
                return true;
              }}
              placeholder='Name'
              icon={<div>icon</div>}
              extra={<div>icon</div>}
            />
          </Col>
        </Row>
      </Container>

      <Container pa='1em'>
        <Row>
          <Col>
            <Text> text</Text>
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
            <Button disabled>disabled</Button>
          </Col>
          <Col>
            <Button
              rounded
              onClick={() => {
                setDrawerOpen(v => !v);
              }}>
              drawer
            </Button>
          </Col>
        </Row>
      </Container>
      <Container pa='1em'>
        <Row>
          <Col>
            <Badge>
              <Button
                onClick={() => {
                  Toast.show({
                    title: '1313',
                  });
                }}>
                toasts
              </Button>
            </Badge>
          </Col>{' '}
          <Col>
            <Button outlined>outline</Button>
          </Col>{' '}
        </Row>
      </Container>
      <Container pa='1em'>
        <Row>
          <Col>
            <Chip outline color={' #F067B4'}>
              chip
            </Chip>
          </Col>
          <Col>
            <Chip color={'linear-gradient(to right, #da4453, #89216b)'}>chip</Chip>
          </Col>
          <Col>
            <Chip r={99}>chip</Chip>
          </Col>
        </Row>
      </Container>
      <Container pa='1em'>
        <Row gap='1em'>
          <Col>
            <Card title='t1' extra='133' color={t => t.color.grey} co={{ borderRadius: '4px' }}>
              c1
            </Card>
          </Col>{' '}
          <Col>
            <Card title='t2' extra='133' color={'red'} co={{ borderRadius: '4px' }}>
              c2
            </Card>
          </Col>{' '}
        </Row>
      </Container>
      <Container pa='1em'>
        <Swiper
          items={[
            {
              content: (
                <Image
                  width='7em'
                  backdropFilter='blur(5px)'
                  src='https://cdn4.buysellads.net/uu/1/72681/1600362731-MC_Carbon_Logo_260x200.png'
                  mask={<div style={{ color: 'white' }}>loading</div>}
                />
              ),
              index: 0,
            },
            {
              content: (
                <Image
                  width='7em'
                  backdropFilter='blur(5px)'
                  src='https://cdn4.buysellads.net/uu/1/72681/1600362731-MC_Carbon_Logo_260x200.png'
                  mask={<div style={{ color: 'white' }}>loading</div>}
                />
              ),
              index: 1,
            },
            {
              content: (
                <Image
                  width='7em'
                  backdropFilter='blur(5px)'
                  src='https://cdn4.buysellads.net/uu/1/72681/1600362731-MC_Carbon_Logo_260x200.png'
                  mask={<div style={{ color: 'white' }}>loading</div>}
                />
              ),
              index: 2,
            },
            {
              content: (
                <Image
                  width='7em'
                  backdropFilter='blur(5px)'
                  src='https://cdn4.buysellads.net/uu/1/72681/1600362731-MC_Carbon_Logo_260x200.png'
                  mask={<div style={{ color: 'white' }}>loading</div>}
                />
              ),
              index: 3,
            },
          ]}
        />
      </Container>
      <Container>
        <Image
          width='7em'
          backdropFilter='blur(5px)'
          src='https://cdn4.buysellads.net/uu/1/72681/1600362731-MC_Carbon_Logo_260x200.png'
          mask={<div style={{ color: 'white' }}>loading</div>}
          errorImg={<div>error img</div>}
        />
      </Container>
      <Container py='.2em'>
        <Divider color='red' size={3} />
      </Container>
      <Container py='.2em'>
        <Divider color='green' size={2} />{' '}
      </Container>
      <Container py='.2em'>
        <Divider color='red' size={3} dashed />{' '}
      </Container>
      <Container pa='1em'>
        <Row gap='1em'>
          <Col>
            <Upload
              onFileChange={file => {
                console.log(file);
              }}>
              <Card co={{ border: '1px solid #3B2667', borderRadius: '4px' }}>Upload</Card>
            </Upload>
          </Col>
          <Col>
            <Textarea
              showCount
              onChange={(v, e) => {
                console.log(v);
                console.log(e);
              }}
            />
          </Col>
        </Row>
      </Container>
      <Container pa='1em'>
        <Segment>
          {item.map((v, i) => (
            <Segment.Item key={i}>{v}</Segment.Item>
          ))}
        </Segment>
      </Container>
      <Container pa='1em'>
        <List
          gap='1em'
          data={[
            { id: '1', title: '3', extra: <Button color='red'>3333</Button> },
            { id: '2', title: '2' },
          ]}
        />
      </Container>
      <Navigation
        currentIndex={currentIndex}
        onTap={i => {
          console.log(i);

          setCurrentIndex(i);
        }}
        selectedLabelStyle={{
          color: 'red',
        }}>
        {item.map((v, i) => (
          <Navigation.Item key={i} label={v + ''} icon={'1212'}>
            {i == 3 && (
              <div
                style={{
                  color: currentIndex == i ? 'red' : 'green',
                }}>
                sdsd
              </div>
            )}
          </Navigation.Item>
        ))}
      </Navigation>
      <Drawer open={drawerOpen} position='bottom' onClose={() => setDrawerOpen(v => !v)} co={t => ({})}>
        <Card>Main Content</Card>
      </Drawer>
    </App>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
