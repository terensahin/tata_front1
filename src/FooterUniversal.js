import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBFooter,
  MDBIcon
} from 'mdb-react-ui-kit'
import '../src/components/Home_Components/Home.css'
const FooterUniversal = () => {
  return (
    <div className='footer'>
      <MDBFooter
        bgColor='dark'
        className='text-center text-lg-start text-muted'
      >
        <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
          <div className='me-5 d-none d-lg-block'>
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon='facebook-f' />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon='twitter' />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon='google' />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon='instagram' />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon='linkedin' />
            </a>
            <a href='' className='me-4 text-reset'>
              <MDBIcon fab icon='github' />
            </a>
          </div>
        </section>

        <section className=''>
          <MDBContainer className='text-center text-md-start mt-5'>
            <MDBRow className='mt-3'>
              <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>
                  <MDBIcon icon='gem' className='me-3' />
                  tata
                </h6>
                <p>Best ın the world</p>
              </MDBCol>

              <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase /*  */fw-bold mb-4'>Products</h6>
                <p>
                  <a href='https://tata-front-end.onrender.com/' className='text-reset'>
                    Influencers
                  </a>
                </p>
                <p>
                  <a href='https://tata-front-end.onrender.com/' className='text-reset'>
                    Advertisers
                  </a>
                </p>
              </MDBCol>

              <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                <p>
                  <a  href='https://tata-front-end.onrender.com/' className='text-reset'>
                    Pricing
                  </a>
                </p>
                <p>
                  <a  href='https://tata-front-end.onrender.com/' className='text-reset'>
                    Settings
                  </a>
                </p>
                <p>
                  <a  href='https://tata-front-end.onrender.com/' className='text-reset'>
                    Orders
                  </a>
                </p>
                <p>
                  <a  href='https://tata-front-end.onrender.com/' className='text-reset'>
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                <p>
                  <MDBIcon icon='home' className='me-2' />
                  Istanbul, IS, 41100, TR
                </p>
                <p>
                  <MDBIcon icon='envelope' className='me-3' />
                  info@example.com
                </p>
                <p>
                  <MDBIcon icon='phone' className='me-3' /> + 90 531 854 08 02
                </p>
        
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className='text-center p-4'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
        >
          © 2023 Copyright:
          <a className='text-reset fw-bold' href='https://tata-front-end.onrender.com/'>
            tata.com
          </a>
        </div>
      </MDBFooter>
    </div>
  )
}

export default FooterUniversal
