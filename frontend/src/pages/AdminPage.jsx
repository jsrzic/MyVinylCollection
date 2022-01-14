import React from "react";

import {
  Button,
  Card,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LinkIcon from "@mui/icons-material/Link";

import authHeader from "../auth-header";
import EventCard from "../components/EventCard";
import AddIcon from "@mui/icons-material/Add";
import AdminEvents from "./AdminEvents";

function AdminPage() {
  const [tab, setTab] = React.useState("Users");
  return (
    <div style={{ width: "100%" }}>
      <Tabs style={{ marginBottom: "3rem" }} value={tab} centered>
        <Tab label="Users" value="Users" onClick={() => setTab("Users")} />
        <Tab label="Events" value="Events" onClick={() => setTab("Events")} />
      </Tabs>
      {tab === "Users" ? <AdminUsers /> : <AdminEvents />}
    </div>
  );
}

function AdminUsers() {
  const api = process.env.REACT_APP_API_URL;
  React.useEffect(() => {
    fetch(api + "/users", {
      method: "GET",
      headers: {
        Authorization: authHeader(),
        Origin: origin,
      },
    }).then((response) => response.json().then((d) => console.log(d)));
  }, []);
  return <p>users</p>;
}

export default AdminPage;
