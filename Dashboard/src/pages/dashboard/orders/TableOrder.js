import React, { useState, useEffect } from "react";
import { Badge, Card, CardHeader, CardFooter, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Media, Pagination, PaginationItem, PaginationLink, Progress, Table, Container, Row, UncontrolledTooltip, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import Header from "components/dashboard/Headers/Header.js";
import { getOrders, updateOrderStatus } from "services/admin/orders/order.service";
import toast, { Toaster } from 'react-hot-toast';
import moment from "moment";

const TableOrder = () => {
    const [orders, setOrders] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [edittingOrder, setEdittingOrder] = useState(null);
    const [editedStatus, setEditedStatus] = useState("");
    const statusColors = {
        PAID: 'green',
        'IN PROGRESS PAYMENT CONFIRM': 'yellow',
        'PAYMENT CONFIRMED': 'blue',
        'ON DELIVERY': 'orange',
        DELIVERED: 'purple',
        COMPLETED: 'cyan',
        DISABLE: 'red',
        PENDING: 'gray'
    };


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                if (data.length === 0) {
                    setOrders([]);
                }
                setOrders(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchOrders();
    }, []);

    const handleEditOrder = (order) => {
        setEdittingOrder(order);
        setEditedStatus(order.status);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async () => {
        const data = {
            id: edittingOrder.id,
            status: editedStatus
        };

        const response = await updateOrderStatus(data);
        if (response.httpStatus === "OK") {
            setIsEditModalOpen(false);
            const data = await getOrders();
            setOrders(data);
            toast.success(response.message);
        } else {
            setIsEditModalOpen(false);
            toast.error(response.message);
        }
    };

    const handleCancelEdit = () => {
        setEdittingOrder(null);
        setEditedStatus("");
        setIsEditModalOpen(false);
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setEditedStatus(value);
    };

    console.log(orders);

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                                <h3 className="mb-0">Orders</h3>
                            </CardHeader>

                            <Table className="align-items-center table-flush" responsive>
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Total Price</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Country</th>
                                        <th scope="col">City</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Notes</th>
                                        <th scope="col">Full Name</th>
                                        <th scope="col">Created At</th>
                                        <th scope="col">Status</th>
                                        <th scope="col" />
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <th scope="row">{order.id}</th>
                                            <td>{order.totalPrice} VNĐ</td>
                                            <td>{order.address}</td>
                                            <td>{order.country}</td>
                                            <td>{order.city}</td>
                                            <td>{order.phone}</td>
                                            <td>{order.email}</td>
                                            <td>{order.notes}</td>
                                            <td>{order.fullName}</td>
                                            <td>{moment(order.createdAt).format('DD/MM/YYYY')}</td>
                                            <td>
                                                <span className={`text-${statusColors[order.status]}`}>
                                                    {order.status}
                                                </span>
                                            </td>
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
                                                        <DropdownItem onClick={() => handleEditOrder(order)}>
                                                            Update Status
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

                {/* Modal for Edit order */}
                <Modal isOpen={isEditModalOpen} toggle={handleCancelEdit}>
                    <ModalHeader toggle={handleCancelEdit}>Update Status Order</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input
                                    type="select"
                                    name="status"
                                    id="status"
                                    value={editedStatus}
                                    onChange={handleChange}
                                >
                                    <option value="PAID">PENDING</option>
                                    <option value="IN PROGRESS PAYMENT CONFIRM">IN PROGRESS PAYMENT CONFIRM</option>
                                    <option value="PAYMENT CONFIRMED">PAYMENT CONFIRMED</option>
                                    <option value="ON DELIVERY">ON DELIVERY</option>
                                    <option value="DELIVERED">DELIVERED</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                    <option value="DISABLE">DISABLE</option>
                                </Input>
                            </FormGroup>

                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleSaveEdit}>Save</Button>{' '}
                        <Button color="secondary" onClick={handleCancelEdit}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </Container>
        </>
    );
};

export default TableOrder;