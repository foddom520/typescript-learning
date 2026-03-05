import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Row, Col,  Button} from "react-bootstrap";
import Home from './Components/Home.tsx'
import Feltoltes from './Components/Feltoltes.tsx'
import Konyvek from './Components/Konyvek.tsx'

function App() {

  return (
    <div className='d-flex flex-column min-vh-100'>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container className="d-flex align-items-center justify-content-between py-2">
              <a className="navbar-brand d-flex align-items-center" href="#">
                <span className='brand-text'>
                     Magyar könyvtár
                </span>
              </a>
            <Navbar.Toggle aria-controls='main-navbar'/>
          </Container>

          <Navbar.Collapse id='main-navbar'>
            <Container>
              <Nav className='py-2 justify-content-center'>
                <Nav.Link href='/'>Főoldal</Nav.Link>
                <Nav.Link href='/feltoltes'>Feltöltés</Nav.Link>
                <Nav.Link href='/konyvek'>Könyvek és szerzők</Nav.Link>
              </Nav>
            </Container>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/feltoltes' element={<Feltoltes />} />
          <Route path='/konyvek' element={<Konyvek />} />
        </Routes>
      </BrowserRouter>

      <footer className='bg-dark-custom text-white py-4 mt-auto'>
        <Row>
          <Col md={6}>
            <h5>
              Magyar könyvtár
            </h5>
            <p>
              lorem
            </p>
          </Col>
          <Col md={6}>
            <h6>
              Platform
            </h6>
            <ul>
              <li><a className='text-light'>Könyvek</a></li>
            </ul>
          </Col>
        </Row>
      </footer>
    </div>
  )
}

export default App