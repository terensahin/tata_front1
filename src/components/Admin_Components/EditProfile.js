import { MDBRow } from "mdb-react-ui-kit";
import EditUserInformation from "./EditUserInformation";
import { useParams } from "react-router-dom";
const EditProfile = () => {
  var arda =  useParams();
  return (
    <div
      style={{
        marginTop: "2.5rem",
        marginRight: "5%",
        marginLeft: "5%",
      }}
    >
      <h4 className="mb-3">Profile</h4>
      <MDBRow style={{ marginBottom: "10px", marginTop: "30px" }}>
        <EditUserInformation arda={arda} />
      </MDBRow>
    </div>
  );
};

export default EditProfile;
