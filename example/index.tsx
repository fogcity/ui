import { useState } from 'react'
import * as ReactDOM from 'react-dom'
import { App, Container, Switch, Button, Card, Carousel } from '../src'
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const Main = () => {
  const [show, setShow] = useState(false)
  return (
    <App>
      <Container fullScreen>
        <Carousel onChange={(i) => console.log(i)}>
          {data.map((v) => (
            <div>{v}</div>
          ))}
        </Carousel>
      </Container>
    </App>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
