import React, { useEffect, useState } from "react";
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
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import fetchAllCampaigns from "../Influencer_Components/Browse/fetchAllCampaign";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import defaultImage from "../Advertiser_Components/default1.png";
import { bufferToBase64 } from "../../utils";

function Campaigns() {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const result = useQuery(["campaignAll", token], fetchAllCampaigns);
  const [searchTerm, setSearchTerm] = useState("");

  if (result.isLoading) {
    return (
      <MDBCol md="7">
        <MDBSpinner role="status">
          <span className="visually-hidden">Loading...</span>
        </MDBSpinner>
      </MDBCol>
    );
  }

  const campaigns = result.data.campaign;

  console.log(campaigns);

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.campaign_header.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MDBCol md="12">
      <div className="d-flex justify-content-center mt-4">
        <MDBInputGroup className="w-50">
          <MDBInput
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MDBBtn rippleColor="dark">
            <MDBIcon icon="search" />
          </MDBBtn>
        </MDBInputGroup>
      </div>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {filteredCampaigns.length === 0 ? (
            <h1>No campaigns found</h1>
          ) : (
            filteredCampaigns.map((campaign) => (
              <tr>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        campaign.user_image
                          ? `data:image/jpeg;base64,${bufferToBase64(
                              campaign.user_image.data
                            )}`
                          : defaultImage // Provide a placeholder image
                      }
                      alt="user_image"
                      style={{ width: "45px", height: "45px" }}
                      className="rounded-circle"
                    />
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{campaign.campaign_header}</p>
                      {/* <p className="text-muted mb-0">{campaign.campaign_id}</p> */}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">
                        {campaign.campaign_description}
                      </p>
                    </div>
                  </div>
                </td>
                <td>
                  <MDBBtn color="link" rounded size="sm">
                    Edit
                  </MDBBtn>
                </td>
                <td>
                  <MDBBtn color="link" rounded size="sm">
                    Delete
                  </MDBBtn>
                </td>
              </tr>
            ))
          )}
        </MDBTableBody>
      </MDBTable>
    </MDBCol>
  );
}

export default Campaigns;
