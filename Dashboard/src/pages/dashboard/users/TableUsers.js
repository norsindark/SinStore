import React, { useState, useEffect } from "react";
import { Badge, Card, CardHeader, CardFooter, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Media, Pagination, PaginationItem, PaginationLink, Progress, Table, Container, Row, UncontrolledTooltip, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import Header from "components/dashboard/Headers/Header.js";
import { getUsers, updateUser, deleteUser } from "services/admin/users/user.service";

const TableUsers = () => {
  const [editedUser, setEditedUser] = useState({});
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedRole, setEditedRole] = useState("USER");
  const [editedStatus, setEditedStatus] = useState("Active");


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        // console.log(data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    setEditedUser(user.id);
    setEditedName(user.fullName || "");
    setEditedEmail(user.email || "");
    setEditedRole(user.role ? user.role.name : "USER");
    setEditedStatus(user.status || "Active");
    setIsModalOpen(true);
    console.log(user);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setEditedName(value);
        break;
      case "email":
        setEditedEmail(value);
        break;
      case "role":
        setEditedRole(value);
        break;
      case "status":
        setEditedStatus(value);
        break;
      default:
        break;
    }
  };

  const handleSaveEdit = async () => {
    const data = {
      id: editedUser,
      fullName: editedName,
      email: editedEmail,
      role: editedRole,
      status: editedStatus
    };
    try {
      await updateUser(data);
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleCancelEdit = (user) => {
    setEditedUser({}); 
    setIsModalOpen(false);
  };

  const handleDeleteUser = async (id) => { 
    try {
      console.log(id);
      await deleteUser(id);
      const updatedUsers = await getUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {/* Light Table */}

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">User tables</h3>
              </CardHeader>

              {/* users  */}

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <th scope="row">{user.id}</th>
                      <td>{user.fullName || ""}</td>
                      <td>{user.email || ""}</td>
                      <td>{user.role ? user.role.name : ""}</td>
                      <td>{user.status || ""}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem onClick={() => handleEditUser(user)}>
                              Edit
                            </DropdownItem>
                            <DropdownItem onClick={() => handleDeleteUser(user.id)}>
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>




        {/* Modal for Edit User */}
        <Modal isOpen={isModalOpen} toggle={handleCancelEdit}>
          <ModalHeader toggle={handleCancelEdit}>Edit User</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={editedName || ""}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={editedEmail || ""}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="role">Role</Label>
                <Input
                  type="select"
                  name="role"
                  id="role"
                  value={editedRole || ""}
                  onChange={handleChange}
                >
                  <option value="USER">USER</option>
                  <option value="ADMIN">ADMIN</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="status">Status</Label>
                <Input
                  type="select"
                  name="status"
                  id="status"
                  value={editedStatus || ""}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="BAN">BAN</option>
                </Input>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSaveEdit}>Save</Button>{' '}
            <Button color="secondary" onClick={handleCancelEdit}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </Container >
    </>
  );
};

export default TableUsers;
