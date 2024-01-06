import {
  MDBRow,
  MDBCol,
  MDBCardBody,
  MDBCardHeader,
  MDBCardText,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
function formatDateAndHour(dateStr) {
  let date = new Date(dateStr);
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  let day = String(date.getDate()).padStart(2, "0");
  let hour = date.getHours();
  let minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hour}:${minutes}`;
}

const subDate = (date1) => {
  const dateSub = new Date(date1);
  const dateToday = new Date();
  const result = dateToday - dateSub;
  const differenceInDays = 1 + Math.floor(result / (1000 * 60 * 60 * 24));
  return differenceInDays;
};
const RatingComponent = ({ rating }) => {
  const cookies = new Cookies(null, { path: "/" });
  const token = cookies.get("token");
  const user_id = cookies.get("user_id");
  return (
    <div>
      Showing 1 - {rating.data.rating.length} out of {rating.data.rating.length}{" "}
      reviews
      {!rating.data.rating.length ? (
        <h1>No Review or Rating Yet.</h1>
      ) : (
        rating.data.rating.map((rating) => (
          <MDBCardBody className="square border border-3">
            <MDBRow>
              <MDBCardHeader style={{ fontSize: "15px" }}>
                📊 About the Campaign
                <span
                  style={{
                    fontWeight: "bold",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                >
                  {rating.belongToCampaign.campaign_header}
                </span>
                #{formatDateAndHour(rating.createdAt)}
                <span
                  style={{
                    fontWeight: "bold",
                    marginRight: "10px",
                    marginLeft: "10px",
                  }}
                ></span>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBCardText style={{ marginTop: "10px", fontStyle: "italic" }}>
                  {" "}
                  {rating.rating_text}
                </MDBCardText>

                <MDBCardText style={{ marginTop: "10px" }}>
                  Tags: #{rating.belongToCampaign.campaing_tags[0].tag1} #
                  {rating.belongToCampaign.campaing_tags[0].tag2} #
                  {rating.belongToCampaign.campaing_tags[0].tag3} #
                  {rating.belongToCampaign.campaing_tags[0].tag4} #
                  {rating.belongToCampaign.campaing_tags[0].tag5}
                </MDBCardText>
                <MDBCardText style={{ marginTop: "10px" }}>
                  <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                    {rating.belongToUser.name}
                  </span>
                  <span style={{ fontWeight: "bold" }}>
                    @{rating.belongToUser.user_name}
                  </span>{" "}
                  {subDate(rating.createdAt)} days ago
                </MDBCardText>
                <MDBCardText style={{ marginTop: "10px" }}>
                  <MDBRow>
                    {(() => {
                      const stars = [];
                      for (var i = 0; i < rating.rating; i++) {
                        stars.push(
                          <MDBCol md="1" key={i}>
                            <FontAwesomeIcon icon={faStar} />
                          </MDBCol>
                        );
                      }
                      return stars;
                    })()}
                  </MDBRow>
                </MDBCardText>
              </MDBCardBody>
              <MDBRow
                style={{
                  fontSize: "15px",
                }}
              ></MDBRow>
            </MDBRow>
          </MDBCardBody>
        ))
      )}
    </div>
  );
};

export default RatingComponent;
