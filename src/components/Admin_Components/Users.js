import React, { useEffect, useState } from "react";
import {
  MDBCol,
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

function Users() {
  const navigate = useNavigate();

  // Define a function for navigation
  const handleNavigate = (path) => () => {
    navigate(path);
  };

  return (
    <MDBCol md="12">
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBNavbarNav>
          <MDBNavbarItem>
            <MDBNavbarLink tag="span" onClick={handleNavigate("/influencers")}>
              Influencers
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink tag="span" onClick={handleNavigate("/advertisers")}>
              Advertisers
            </MDBNavbarLink>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBNavbar>
    </MDBCol>
  );
}

export default Users;
