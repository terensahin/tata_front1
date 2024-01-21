import React, { useEffect, useState } from 'react'
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCol,
  MDBSpinner,
  MDBInput,
  MDBInputGroup,
  MDBIcon
} from 'mdb-react-ui-kit'
import { Link, useNavigate } from 'react-router-dom'

import fetchAllAdvertiser from './fetchAllAdvertiser'
import { useQuery } from '@tanstack/react-query'
import Cookies from 'universal-cookie'
import { bufferToBase64 } from '../../utils'
import defaultImage from '../Influencer_Components/default.jpg'
import Users from './Users'

function Advertisers () {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  const cookies = new Cookies(null, { path: '/' })
  const token = cookies.get('token')
  const result = useQuery(['AdvertiserAll', token], fetchAllAdvertiser)
  console.log(result.data)

  if (result.isLoading) {
    return (
      <MDBCol md='7'>
        <MDBSpinner role='status'>
          <span className='visually-hidden'>Loading...</span>
        </MDBSpinner>
      </MDBCol>
    )
  }

  const advertisers = result.data.Advertiser

  const filteredAdvertisers = advertisers.filter(advertiser =>
    advertiser.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <MDBCol md='12'>
      <Users />

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
            <th scope='col'>Edit</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredAdvertisers.length === 0 ? (
            <h1>No users found</h1>
          ) : (
            filteredAdvertisers.map(influencer => (
              <tr>
                <td>
                  <div className='d-flex align-items-center'>
                    <img
                      src={
                        influencer.user_image
                          ? `data:image/jpeg;base64,${bufferToBase64(
                              influencer.user_image.data
                            )}`
                          : defaultImage // Provide a placeholder image
                      }
                      alt='user_image'
                      style={{ width: '45px', height: '45px' }}
                      className='rounded-circle'
                    />
                    <div className='ms-3'>
                      <p className='fw-bold mb-1'>{influencer.user_name}</p>
                      <p className='text-muted mb-0'>{influencer.email}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className='d-flex align-items-center'>
                    <div className='ms-3'>
                      <p className='fw-bold mb-1'>{influencer.description}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <MDBBtn
                    color='primary'
                    rounded
                    size='sm'
                    onClick={() => {
                      navigate(`/editUser/${influencer.user_id}`) // navi
                    }}
                  >
                    Edit
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

export default Advertisers
