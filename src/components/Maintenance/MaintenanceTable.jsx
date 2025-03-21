import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  Button,
  Tooltip,
} from "@mui/material";
import { Pencil, Trash2, Send } from "lucide-react";
import { EditMaintanence } from "./EditMaintenacePopup";
import { DeleteConfirmDialog } from "./DeleteMaintenancePopup";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MainteranceTable = ({
  maintanence,
  userType,
  onEditUser,
  onDeleteUsers,
}) => {
  const [selected, setSelected] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("name");

  const handleDelete = () => {
    onDeleteUsers(selected);
    setSelected([]);
    setIsDeleteDialogOpen(false);
  };

  const sendMaintanence = (user) => {
    toast.success("Sent Successfully!");
   // Store notification in database
  };

  const sortsedMaintanance = [...maintanence].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <>
      <Paper className="relative">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#BDE0FC", color: "#333" }}>
                <TableCell onClick={() => handleSort("name")}>User</TableCell>

                <TableCell onClick={() => handleSort("userType")}>
                  Description
                  {sortColumn === "userType" && (
                    <span>
                      {sortDirection === "asc" ? (
                        <ArrowUpward />
                      ) : (
                        <ArrowDownward />
                      )}
                    </span>
                  )}
                </TableCell>

                <TableCell onClick={() => handleSort("additionalDetails")}>
                  Priority Level
                  {sortColumn === "additionalDetails" && (
                    <span>
                      {sortDirection === "asc" ? (
                        <ArrowUpward />
                      ) : (
                        <ArrowDownward />
                      )}
                    </span>
                  )}
                </TableCell>
                <TableCell align="center">Status</TableCell>

                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {maintanence
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={user.profilePicture}
                          alt={user.name}
                          className="w-8 h-8 rounded-full"
                        />
                        {user.name}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className={`px-2 py-1 text-sm `}>
                        {user.description}
                      </span>
                    </TableCell>

                    <TableCell>{user.priorityLevel}</TableCell>

                    <TableCell>
                      <div className="flex justify-center gap-2">
                        {user.status}
                      </div>
                    </TableCell>

                    <TableCell align="center">
                      <div className="flex justify-center gap-2">
                        <Tooltip title="Edit User">
                          <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<Pencil size={20} />}
                            onClick={() => setEditUser(user)}
                          >
                            Edit
                          </Button>
                        </Tooltip>

                        <Tooltip title="Delete User">
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<Trash2 size={20} />}
                            onClick={() => {
                              setSelected(user.id);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            Delete
                          </Button>
                        </Tooltip>

                        <Tooltip title="Send">
                          <Button
                            variant="outlined"
                            color="success"
                            startIcon={<Send size={20} />}
                            onClick={() => {
                              setSelected(user.id);
                              sendMaintanence(user);
                            }}
                          >
                            Send
                          </Button>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={maintanence.length}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </Paper>

      {editUser && (
        <EditMaintanence
          user={editUser}
          open={!!editUser}
          onClose={() => setEditUser(null)}
          onSave={(editedUser) => {
            onEditUser(editedUser);
            setEditUser(null);
          }}
        />
      )}

      <DeleteConfirmDialog
        open={isDeleteDialogOpen}
        userCount={selected.length}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
      <ToastContainer />
    </>
  );
};
