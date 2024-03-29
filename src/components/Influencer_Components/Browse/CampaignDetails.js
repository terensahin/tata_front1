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
  MDBInput,
} from "mdb-react-ui-kit";
import "./rating.css"; // Import your CSS file
import { useNavigate, useParams } from "react-router-dom";
import fetchCampaign from "./fetchCampaign";
import { useQuery } from "@tanstack/react-query";
import Cookies from "universal-cookie";
import { bufferToBase64, formatDateAndHour } from "../../../utils";
import defaultImage from "../default1.png";
import defaultImage1 from "../default.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faThumbsUp,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import fetchComments from "./fetchComments";
export default function CampaignDetails() {
  const [isClicked, setIsClicked] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const user_id = cookies.get("user_id");

  const { id } = useParams();
  const [selectedRating, setSelectedRating] = useState(0);
  const handleStarClick = (index) => {
    setSelectedRating(index);
  };
  console.log("id", id);
  console.log("user_id", user_id);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const [isHovered, setIsHovered] = useState(false);

  var provide = {
    user_id: user_id,
    toUser_id: id,
  };
  const result = useQuery(["abcd", id, token], fetchCampaign);
  const result2 = useQuery(["abcd", id, token, provide], fetchComments);

  if (result.isLoading || result2.isLoading) {
    return (
      <MDBSpinner role="status">
        <span className="visually-hidden">Loading...</span>
      </MDBSpinner>
    );
  }

  console.log("camp", result);
  var rating_sum = 0;
  var rating_average = 0;
  var counter = 0;
  var review_counter = result.data.campaign[0].user.rating.length;
  if (result.data.campaign[0].user.rating != undefined) {
    for (var i = 0; i < result.data.campaign[0].user.rating.length; i++) {
      rating_sum += result.data.campaign[0].user.rating[i].rating;
      if (result.data.campaign[0].user.rating[i].rating === 5) {
        counter++;
      }
    }
    rating_average = rating_sum / result.data.campaign[0].user.rating.length;
  }

  var campaign = result.data.campaign[0];
  const createRating = () => {
    var data = {
      rating: selectedRating,
      rating_text: message,
      user_id: user_id,
      toUser_id: campaign.user.user_id,
      campaign_id: campaign.campaign_id,
    };
    axios
      .post(`https://tata-backend.onrender.com/api/postRating`, data, {
        headers,
      })
      .then((response) => {
        toast.success("Success", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });
      })
      .catch((error) => {
        toast.error(`Already applied`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 4000,
        });
      });
      setIsClicked(true);
  };
  return (
    <section style={{ backgroundColor: "" }}>
      <MDBContainer className="py-5" key={campaign}>
        <ToastContainer></ToastContainer>
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
                          : defaultImage // Provide a placeholder image
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
                    <MDBBadge
                      color={campaign.status === "Ended" ? "danger" : "success"}
                      pill
                    >
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
                <hr />
                <MDBRow className="justify-content-end">
                  <MDBCol className="d-flex justify-content-center" sm="3">
                    {campaign.status !== "Ended" && (
                      <MDBBtn
                        color="success"
                        size="sm"
                        onClick={() =>
                          navigate(`/CreateProposal/${campaign.campaign_id}`)
                        }
                      >
                        Propose
                      </MDBBtn>
                    )}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
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
                      : defaultImage1 // Provide a placeholder image
                  }
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p
                  className="mb-1 mt-2 fw-bold"
                  style={{
                    color: isHovered ? "blue" : "black", // Change color on hover
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/ShowProfile/${campaign.user_id}`)}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {campaign.user.name}
                </p>

                <p className="text-muted mb-4">@{campaign.user.user_name}</p>
                <p className="text-muted mb-4">
                  <MDBIcon>
                    <div className="d-flex">
                      {(() => {
                        const stars = [];
                        for (var i = 0; i < Math.floor(rating_average); i++) {
                          stars.push(
                            <MDBCol
                              md="1"
                              key={i}
                              style={{ marginRight: "10px" }}
                            >
                              {" "}
                              {/* Add margin to create space */}
                              <FontAwesomeIcon icon={faStar} />
                            </MDBCol>
                          );
                        }

                        // Check if there's a half star to add
                        if (rating_average % 1 >= 0.5) {
                          stars.push(
                            <MDBCol
                              md="1"
                              key={"half"}
                              style={{ marginRight: "10px" }}
                            >
                              {" "}
                              {/* Add margin to create space */}
                              <FontAwesomeIcon icon={faStarHalfAlt} />
                            </MDBCol>
                          );
                        }

                        return stars;
                      })()}
                    </div>
                  </MDBIcon>
                  {""}({rating_average.toFixed(1)}) {review_counter} Reviews
                </p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn
                    outline
                    className="ms-1"
                    onClick={() => navigate("/ShowAllMessages")}
                  >
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

        <MDBRow
          style={{ marginTop: "10px", marginLeft: "0px", marginRight: "0px" }}
        >
          {campaign.status === "Ended" && result2.data.exists === 0 && (
            <MDBRow
              style={{
                marginTop: "0px",
                marginLeft: "0px",
                marginRight: "0px",
              }}
            >
              <MDBCol>
                <MDBRow style={{width: "740px", marginLeft: "-25px"}}>
                          <div className="rating-box bg-secondary p-2 text-dark bg-opacity-10 pb-5
              " style={{ backgroundColor: "#54B4D3", }}>
                  <header style={{ color: '#6677ea' }}>How was your experience?</header>
                  <div className="stars" style={{ display: 'flex', justifyContent: 'center' }}>
                    {[1, 2, 3, 4, 5].map((index) => (
                      <i
                        key={index}
                        className={`fa-solid fa-star${
                          index <= selectedRating ? " active" : ""
                        }`}
                        onClick={() => handleStarClick(index)}
                      ></i>
                    ))}
                  </div>
                  <MDBInput
                    style={{ marginTop: "25px" }}
                    label="Comments (Min 50 characters)"
                    id="typeText"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                </MDBRow>
                
              </MDBCol>
              <MDBRow style={{ marginTop: "20px", margin: "50px", marginLeft : "600px"}}>
                <MDBCol>
                <MDBBtn 
      disabled={isClicked || message.length < 50} 
      onClick={createRating}
    >
      Apply
    </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBRow>
          )}
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
