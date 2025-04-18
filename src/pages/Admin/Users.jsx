import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { UserPlus, Search } from "lucide-react";
import { UserTable } from "../../components/Users/UserTable.jsx";
import { AddUserDialog } from "../../components/Users/AddUserDialog.jsx";

export const Users = () => {
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:9090/user/details");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(
        data.map(
          ({
            id,
            email,
            usertype,
            additional_details,
            profile_picture_url,
            username,
            phone_number,
            created_at,
          }) => ({
            id: id.toString(),
            email,
            userType: usertype,
            additionalDetails: additional_details,
            profilePicture:
              profile_picture_url ||
              `https://ui-avatars.com/api/?name=${username}`,
            username,
            phoneNumber: phone_number,
            createdAt: created_at,
          })
        )
      );
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAddUser = async (newUser) => {
    try {
      const userToAdd = {
        username: newUser.username || newUser.email.split("@")[0],
        profile_picture_url:
          newUser.profilePicture ||
          `https://ui-avatars.com/api/?name=${newUser.email.split("@")[0]}`,
        usertype: newUser.userType,
        email: newUser.email,
        phone_number: newUser.phoneNumber || "",
        additional_details: newUser.additionalDetails || "",
        created_at: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:9090/user/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userToAdd),
      });

      if (!response.ok) throw new Error("Failed to add user");
      fetchUsers();
      setIsAddUserOpen(false);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUsers = async (userIds) => {
    try {
      await Promise.all(
        userIds.map((userId) =>
          fetch(`http://localhost:9090/user/details/${userId}`, {
            method: "DELETE",
          })
        )
      );
      fetchUsers();
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  const filteredUsers = useMemo(
    () =>
      users.filter(({ email, additionalDetails, userType }) => {
        const searchMatch = [email, additionalDetails].some((field) =>
          field?.toLowerCase().includes(searchText.toLowerCase())
        );
        return searchMatch && (filterType === "All" || userType === filterType);
      }),
    [users, searchText, filterType]
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">User management</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{ startAdornment: <Search size={20} /> }}
          />
          <FormControl variant="outlined" size="small" className="w-40 ml-2">
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
        <Button
          variant="contained"
          color="primary"
          className="font-bold"
          startIcon={<UserPlus size={20} />}
          onClick={() => setIsAddUserOpen(true)}
        >
          Add New User
        </Button>
      </div>

      {loading ? (
        <div>Loading users...</div>
      ) : (
        <UserTable
          users={filteredUsers}
          onEditUser={(editedUser) =>
            setUsers((prev) =>
              prev.map((user) =>
                user.id === editedUser.id ? editedUser : user
              )
            )
          }
          onDeleteUsers={handleDeleteUsers}
        />
      )}

      <AddUserDialog
        open={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onAdd={handleAddUser}
      />
    </div>
  );
};