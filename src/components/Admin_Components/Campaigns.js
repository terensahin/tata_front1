import React, { useEffect, useState } from 'react'
import {
  MDBCol,
  MDBBtn,
  MDBSpinner,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBInputGroup,
  MDBInput,
  MDBIcon,
  MDBTypography,
  MDBBadge
} from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import fetchAllCampaigns from '../Influencer_Components/Browse/fetchAllCampaign'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'universal-cookie'
import defaultImage from '../Advertiser_Components/default1.png'
import { bufferToBase64 } from '../../utils'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import DataTable from 'react-data-table-component'
import fetchAlss from './fetchAlss'

function Campaigns () {
  function renderStatusBadge (status) {
    let color
    switch (status) {
      case 'Active':
        color = 'success'
        break
      case 'Ended':
        color = 'danger'
        break
      case 'Disabled':
        color = 'dark'
        break
      case 'pending':
        color = 'warning'
        break
      case 'Ongoing':
        color = 'info'
        break
      default:
        color = 'light'
    }

    return (
      <MDBBadge pill color={color} light>
        {status}
      </MDBBadge>
    )
  }
  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const result = useQuery(['campaignAll12', token], fetchAlss)
  const [searchTerm, setSearchTerm] = useState('')

  if (result.isLoading) {
    return (
      <MDBCol md='7'>
        <MDBSpinner role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </MDBCol>
    )
  }

  const campaigns = result.data.campaign

  console.log(campaigns)

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.campaign_header.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const headers = {
    Authorization: `Bearer ${token}`
  }
  const pushStatus = async (id, status) => {
    var newData = {
      newStatus: status
    }
    axios
      .put(
        `https://tata-backend.onrender.com/api/updateCampaignStatus/${id}`,
        newData,
        {
          headers
        }
      )
      .then(response => {
        toast.success('Succesfully Updated', {
          position: toast.POSITION.TOP_LEFT
        })
      })
      .catch(error => {
        toast.warning('Succesfully ERROR', {
          position: toast.POSITION.TOP_LEFT
        })
      })
  }
  return (
    <MDBCol md='12'>
      <ToastContainer />
      <div className='d-flex justify-content-center mt-4'>
        <MDBInputGroup className='w-50'>
          <MDBInput
            label='Search'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <MDBBtn rippleColor='dark'>
            <MDBIcon icon='search' />
          </MDBBtn>
        </MDBInputGroup>
      </div>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Name</th>
            <th scope='col'>Description</th>
            <th scope='col'>Status</th>
            <th scope='col'>Action</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredCampaigns.length === 0 ? (
            <h1>No campaigns found</h1>
          ) : (
            filteredCampaigns.map(campaign => (
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <img
                      src={
                        campaign.campaign_image
                          ? `data:image/jpeg;base64,${bufferToBase64(
                            campaign.campaign_image.data
                            )}`
                          : defaultImage // Provide a placeholder image
                      }
                      alt='user_image'
                      style={{ width: '45px', height: '45px' }}
                      className='rounded-circle'
                    />
                    <div className='ms-3'>
                      <p className='fw-bold mb-1'>{campaign.campaign_header}</p>
                      {/* <p className="text-muted mb-0">{campaign.campaign_id}</p> */}
                    </div>
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='ms-3'>
                      <p className='fw-bold mb-1'>
                        {campaign.campaign_description}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{renderStatusBadge(campaign.status)}</td>

                <td>
                  <MDBBtn
                    color='primary'
                    rounded
                    size='sm'
                    onClick={() => {
                      pushStatus(campaign.campaign_id, 'Disabled')
                    }}
                  >
                    Disable 
                  </MDBBtn>
                </td>
              </tr>
            ))
          )}
        </MDBTableBody>
      </MDBTable>
    </MDBCol>
  )
}

export default Campaigns
