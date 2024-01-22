import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBSpinner,
  MDBCardImage,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBCardHeader,
  MDBCardFooter,
  MDBCardText,
} from 'mdb-react-ui-kit'
import ProfileMain from './ProfileMain'
import ContactMainProfile from './ContactViewProfile'
import TopTags from './TopTags'
import CampaingTable from './CampaignTable'
import RatingComponent from './RatingComponent'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'universal-cookie'
import fetchUser from '../Fetch/fetchUser'
import fetchRatings from './fetchRatings'

const ViewProfile = () => {
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const { id } = useParams()
  const result = useQuery(['user', id, token], fetchUser)
  const result2 = useQuery(['rating', id, token], fetchRatings)
  if (result2.isLoading || result.isLoading) {
    return (
      <MDBSpinner role='status'>
        <span className='visually-hidden'>Loading...</span>
      </MDBSpinner>
    )
  }
  const user = result.data
  console.log("aeda",user.user.media_links)

  return (
    <div>
      <MDBRow
        style={{
          marginLeft: '2%',
          marginRight: '2%',
          marginTop: '5%'
        }}
      >
        <MDBCol md='8'>
          <MDBCard>
            <ProfileMain {...user}></ProfileMain>
          </MDBCard>
        </MDBCol>
        <MDBCol md='4'>
          <MDBCard alignment='left'>
            <MDBCardHeader style={{ fontSize: '25px' }}>Contact</MDBCardHeader>
            <ContactMainProfile {...user}></ContactMainProfile>
          </MDBCard>
          <MDBCard alignment='left' style={{ marginTop: '10px' }}>
            <MDBCardHeader style={{ fontSize: '25px' }}>Top Tags</MDBCardHeader>
            <TopTags></TopTags>
          </MDBCard>
          <MDBCard alignment='left' style={{ marginTop: '10px' }}>
            <MDBCardHeader style={{ fontSize: '25px' }}>
              Media Link
            </MDBCardHeader>
            <MDBCard className='mb-4 mb-lg-0'>
              <MDBCardBody className='p-0'>
                <MDBListGroup flush className='rounded-3'>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                    <a
                      href={`https://twitter.com/${user.user.media_links[0].twitter}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <MDBIcon
                        fab
                        icon='twitter fa-lg'
                        style={{ color: '#55acee' }}
                      />
                    </a>
                    <MDBCardText>
                      {user.user.media_links[0].twitter}
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                    <a
                      href={`https://www.instagram.com/${user.user.media_links[0].instagram}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <MDBIcon
                        fab
                        icon='instagram fa-lg'
                        style={{ color: '#ac2bac' }}
                      />
                    </a>
                    <MDBCardText>
                      {user.user.media_links[0].instagram}
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                    <a
                      href={`https://www.youtube.com/${user.user.media_links[0].youtube}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <MDBIcon
                        fab
                        icon='youtube fa-lg'
                        style={{ color: '#cd201f' }}
                      />
                    </a>
                    <MDBCardText>
                      {user.user.media_links[0].youtube}
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className='d-flex justify-content-between align-items-center p-3'>
                    <a
                      href={`https://www.tiktok.com/@${user.user.media_links[0].tiktok}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <MDBIcon
                        fab
                        icon='fa-brands fa-tiktok'
                        style={{ color: '#000000' }}
                      />
                    </a>
                    <MDBCardText>
                      {user.user.media_links[0].tiktok}
                    </MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <MDBRow
        style={{
          marginLeft: '2%',
          marginRight: '2%',
          marginTop: '1%',
          marginBottom: '5%'
        }}
      >
        <MDBCol md='8'>
          <MDBCard alignment='left' style={{ marginTop: '10px' }}>
            <MDBCardHeader style={{ fontSize: '28px' }}>
              Collaborations
            </MDBCardHeader>
            <MDBCardBody>
              <CampaingTable></CampaingTable>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md='8'>
          <MDBCard alignment='left' style={{ marginTop: '10px' }}>
            <MDBCardHeader style={{ fontSize: '28px' }}>
              Ratings & Reviews
            </MDBCardHeader>
            <MDBCardBody>
              <RatingComponent result={result2}></RatingComponent>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </div>
  )
}

export default ViewProfile
