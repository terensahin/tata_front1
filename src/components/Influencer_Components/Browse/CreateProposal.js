import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBBadge,
  MDBSpinner,
} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import fetchCampaign from "./fetchCampaign";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { bufferToBase64 } from "../../../utils";
import io from "socket.io-client";
import defaultImage from "../default.jpg";
import defaultImage1 from "../default1.png";
var socket = io.connect("https://tata-mesagginn.onrender.com/");
function formatDateAndHour(dateStr) {
  let date = new Date(dateStr);
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  let day = String(date.getDate()).padStart(2, "0");
  let hour = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minutes}`;
}

export default function CampaignDetails() {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const user_id = cookies.get("user_id");
  const user_name = cookies.get("user_name");
  const { id } = useParams();
  const result = useQuery(["abcd", id, token], fetchCampaign);
  const campaign_id = useParams();
  //console.log(campaign_id)
  var id1 = campaign_id.id;
  const [proposal, setProposal] = useState();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const setProposals = (e) => {
    setProposal(e.target.value);
  };
  const join_camp = async (data) => {
    await socket.emit("join_camp", {
      user: user_id,
      user_name: user_name,
      notification: data,
    });
  };

  //console.log(proposal);
  const userid = cookies.get("user_id");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const postProposal = async () => {
    setIsButtonClicked(true);
    var data = {
      user_id: userid,
      campaign_id: id1,
      proposal_status: "pending",
      proposal_body: proposal,
    };

    axios
      .post(`https://tata-backend.onrender.com/api/postProposal`, data, {
        headers,
      })
      .then((response) => {
        toast.success("Successfully created proposal", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });
      })
      .catch((error) => {
        toast.error(`Already applied ${error}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });
      });
    join_camp(id1);
    const notification = {
      user: user_id,
      proposed_user_id: campaign_id,
      campaign_id: id1,
      user_name: user_name,
    };
    await socket.emit("send_camp", notification);
  };
  if (result.isLoading) {
    return (
      <MDBSpinner role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  var campaign = result.data.campaign[0];
  // console.log(result);
  // console.log(result.data.campaign[0].campaign_header);

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5" key={campaign}>
        <ToastContainer />
        <MDBRow>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol className="d-flex justify-content-between">
                    <MDBCardText className="d-inline fw-bold fs-4">
                      {campaign.campaign_header}
                    </MDBCardText>
                    <MDBCardText className="d-inline fw-bold fs-8 text-end">
                      {formatDateAndHour(campaign.createdAt)}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="fw-semibold fs-6">
                      Description
                    </MDBCardText>
                    <MDBCardImage
                      src={
                        campaign.campaign_image
                          ? `data:image/jpeg;base64,${bufferToBase64(
                              campaign.campaign_image.data
                            )}`
                          : defaultImage1 // Provide a placeholder image
                      }
                      fluid
                      className="w-100"
                    />
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {campaign.campaign_description}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="fw-semibold fs-6">
                      Status
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBBadge color="success" pill>
                      {campaign.status}
                    </MDBBadge>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText className="fw-semibold fs-6">
                      Start & End Date
                    </MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {formatDateAndHour(campaign.startedAt)} -{" "}
                      {formatDateAndHour(campaign.endedAt)}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol>
                    <MDBCardText className="fw-semibold fs-6">
                      Collaboration Preferences
                    </MDBCardText>
                  </MDBCol>
                  <MDBRow>
                    <MDBCol sm="9" className="ms-5">
                      <MDBCardText className="fs-8 d-inline fw-semibold">
                        • Target Audience :
                      </MDBCardText>
                      <MDBCardText className="fs-8 d-inline">
                        {campaign.collaboration_preferences[0].target_audience}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm="9" className="ms-5">
                      <MDBCardText className="fs-8 d-inline fw-semibold">
                        • Age Interval :
                      </MDBCardText>
                      <MDBCardText className="fs-8 d-inline">
                        {" "}
                        {campaign.collaboration_preferences[0].age_interval}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm="9" className="ms-5">
                      <MDBCardText className="fs-8 d-inline fw-semibold">
                        • Gender :
                      </MDBCardText>
                      <MDBCardText className="fs-8 d-inline">
                        {
                          campaign.collaboration_preferences[0]
                            .gender_information
                        }
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm="9" className="ms-5">
                      <MDBCardText className="fs-8 d-inline fw-semibold">
                        • Subscription Interval :
                      </MDBCardText>
                      <MDBCardText className="fs-8 d-inline">
                        {" "}
                        {
                          campaign.collaboration_preferences[0]
                            .statistical_interval
                        }
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm="9" className="ms-5">
                      <MDBCardText className="fs-8 d-inline fw-semibold">
                        • Preffered Platforms :
                      </MDBCardText>
                      <MDBCardText className="fs-8 d-inline">
                        {
                          campaign.collaboration_preferences[0]
                            .preffered_platforms[0].platform
                        }
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol d-flex sm="12" className="ms-5">
                      <MDBCardText className="fs-8 d-inline fw-semibold">
                        • Campaign Tags :
                      </MDBCardText>
                      <MDBCardText className="fs-8 d-inline">
                        <MDBRow>
                          <MDBCol sm="2" style={{ marginRight: "1px" }}>
                            <MDBBadge pill light>
                              {campaign.campaing_tags[0].tag1}
                            </MDBBadge>
                          </MDBCol>
                          <MDBCol sm="2">
                            <MDBBadge pill light>
                              {campaign.campaing_tags[0].tag2}
                            </MDBBadge>
                          </MDBCol>
                          <MDBCol sm="2">
                            <MDBBadge pill light>
                              {campaign.campaing_tags[0].tag3}
                            </MDBBadge>
                          </MDBCol>
                          <MDBCol sm="2">
                            <MDBBadge pill light>
                              {campaign.campaing_tags[0].tag4}
                            </MDBBadge>
                          </MDBCol>
                          <MDBCol sm="2">
                            <MDBBadge pill light>
                              {campaign.campaing_tags[0].tag5}
                            </MDBBadge>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBRow>
              </MDBCardBody>
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBCardText className=" fw-semibold fs-8">
                    Why we choose you ?
                  </MDBCardText>{" "}
                  <div className="mb-0">
                    <textarea
                      onChange={setProposals}
                      className="form-control"
                      id="additionalInfo"
                      rows={4}
                      placeholder="Enter additional information"
                    ></textarea>
                  </div>
                </MDBCardBody>
              </MDBCard>

              <MDBCard className="mb-0">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol className="d-flex justify-content-end">
                      <MDBRow className="justify-content-end">
                        {campaign.status !== "Ended" && (
                          <MDBBtn
                            color="success"
                            size="sm"
                            onClick={postProposal}
                            disabled={isButtonClicked}
                          >
                            Propose
                          </MDBBtn>
                        )}
                      </MDBRow>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center d-flex flex-column align-items-center">
                <MDBCardImage
                  src={
                    campaign.user.user_image
                      ? `data:image/jpeg;base64,${bufferToBase64(
                          campaign.user.user_image.data
                        )}`
                      : defaultImage // Provide a placeholder image
                  }
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="mb-1 mt-2 fw-bold">{campaign.user.name}</p>
                <p className="text-muted mb-4">@{campaign.user.user_name}</p>
                <p className="text-muted mb-4">
                  <MDBIcon>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-stroke"></i>
                  </MDBIcon>{" "}
                  333 Reviews
                </p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn outline className="ms-1">
                    Message
                  </MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <a
                      href={`https://twitter.com/${campaign.user.media_links[0].twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MDBIcon
                        fab
                        icon="twitter fa-lg"
                        style={{ color: "#55acee" }}
                      />
                    </a>
                    <MDBCardText>
                      {campaign.user.media_links[0].twitter}
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <a
                      href={`https://www.instagram.com/${campaign.user.media_links[0].instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MDBIcon
                        fab
                        icon="instagram fa-lg"
                        style={{ color: "#ac2bac" }}
                      />
                    </a>
                    <MDBCardText>
                      {campaign.user.media_links[0].instagram}
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <a
                      href={`https://www.youtube.com/${campaign.user.media_links[0].youtube}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MDBIcon
                        fab
                        icon="youtube fa-lg"
                        style={{ color: "#cd201f" }}
                      />
                    </a>
                    <MDBCardText>
                      {campaign.user.media_links[0].youtube}
                    </MDBCardText>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <a
                      href={`https://www.tiktok.com/@${campaign.user.media_links[0].tiktok}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MDBIcon
                        fab
                        icon="fa-brands fa-tiktok"
                        style={{ color: "#000000" }}
                      />
                    </a>
                    <MDBCardText>
                      {campaign.user.media_links[0].tiktok}
                    </MDBCardText>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
