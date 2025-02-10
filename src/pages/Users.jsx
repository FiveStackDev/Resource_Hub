import { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { UserPlus, Search } from "lucide-react";
import { UserTable } from "../components/Users/UserTable.jsx";
import { AddUserDialog } from "../components/users/AddUserDialog.jsx";

export const Users = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);

  const [users, setUsers] = useState([
    {
      id: "1",
      email: "admin@example.com",
      userType: "Admin",
      additionalDetails: "Main admin",
      profilePicture: "https://ui-avatars.com/api/?name=Admin",
    },
    {
      id: "2",
      email: "user1@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User1",
    },
    {
      id: "3",
      email: "user2@example.com",
      userType: "User",
      additionalDetails: "New user",
      profilePicture: "https://ui-avatars.com/api/?name=User2",
    },
    {
      id: "4",
      email: "user3@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User3",
    },
    {
      id: "5",
      email: "user4@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User4",
    },
    {
      id: "6",
      email: "user5@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User5",
    },
    {
      id: "7",
      email: "user6@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User6",
    },
    {
      id: "8",
      email: "user7@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User7",
    },
    {
      id: "9",
      email: "user8@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User8",
    },
    {
      id: "10",
      email: "user9@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User9",
    },
    {
      id: "11",
      email: "user10@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User10",
    },
    {
      id: "12",
      email: "user11@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User11",
    },
    {
      id: "13",
      email: "user12@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User12",
    },
    {
      id: "14",
      email: "user13@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User13",
    },
    {
      id: "15",
      email: "user14@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User14",
    },
    {
      id: "16",
      email: "user15@example.com",
      userType: "User",
      additionalDetails: "Regular user",
      profilePicture: "https://ui-avatars.com/api/?name=User15",
    },
    {
      id: "17",
      email: "admin2@example.com",
      userType: "Admin",
      additionalDetails: "Secondary admin",
      profilePicture: "https://ui-avatars.com/api/?name=Admin2",
    },
    {
      id: "18",
      email: "admin3@example.com",
      userType: "Admin",
      additionalDetails: "Support admin",
      profilePicture: "https://ui-avatars.com/api/?name=Admin3",
    },
    {
      id: "19",
      email: "admin4@example.com",
      userType: "Admin",
      additionalDetails: "Backup admin",
      profilePicture: "https://ui-avatars.com/api/?name=Admin4",
    },
  ]);

  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, { ...newUser, id: Date.now().toString() }]);
    setIsAddUserOpen(false);
  };

  const handleEditUser = (editedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === editedUser.id ? editedUser : user))
    );
  };

  const handleDeleteUsers = (userIds) => {
    setUsers((prev) => prev.filter((user) => !userIds.includes(user.id)));
  };

  const filteredUsers = users.filter((user) => {
    const searchMatch =
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.additionalDetails.toLowerCase().includes(searchText.toLowerCase());
    const typeMatch = filterType === "All" || user.userType === filterType;
    return searchMatch && typeMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">User Management</h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left-aligned: Search Bar and Filter Dropdown */}
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* Search Bar */}
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: <Search size={20} />,
            }}
          />

          {/* Filter Dropdown */}
          <FormControl
            variant="outlined"
            size="small"
            className="w-40"
            style={{ marginLeft: "10px" }}
          >
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter by Type"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* Right-aligned: Add New User Button */}
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#1976D2", fontWeight: "bold" }}
          startIcon={<UserPlus size={20} />}
          onClick={() => setIsAddUserOpen(true)}
        >
          Add New User
        </Button>
      </div>

      <div style={{ marginTop: "20px" }}></div>

      <UserTable
        users={filteredUsers}
        onEditUser={handleEditUser}
        onDeleteUsers={handleDeleteUsers}
      />

      <AddUserDialog
        open={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onAdd={handleAddUser}
      />
    </div>
  );
};
