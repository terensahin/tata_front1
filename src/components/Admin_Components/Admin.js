import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Influencers from "./Influencers";
import Users from "./Users";
import Advertisers from "./Advertisers";
import Campaigns from "./Campaigns";

const Admin = () => {
  return (
    <div>
      <AdminNavbar></AdminNavbar>
      <Routes>
        <Route path="/Users" element={<Users></Users>}></Route>
        <Route
          path="/influencers"
          element={<Influencers></Influencers>}
        ></Route>
        <Route
          path="/advertisers"
          element={<Advertisers></Advertisers>}
        ></Route>
        <Route path="/Campaigns" element={<Campaigns></Campaigns>}></Route>
      </Routes>
    </div>
  );
};

export default Admin;
