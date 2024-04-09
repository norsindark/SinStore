import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ModalProfile = ({ isModalOpen, toggle, handleSaveEdit, handleCancelEdit, handleChange, editedData }) => {

    return (
        <Modal isOpen={isModalOpen} toggle={handleCancelEdit} backdrop="static">
            <ModalHeader toggle={handleCancelEdit}>Edit My Profile</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={editedData || ""} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" value={editedData || ""} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Phone Number</Label>
                        <Input type="phone" name="phone" id="phone" value={editedData || ""} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="street">Street</Label>
                        <Input type="text" name="street" id="street" value={editedData || ""} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input type="text" name="city" id="city" value={editedData || ""} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="country">Country</Label>
                        <Input type="text" name="country" id="country" value={editedData || ""} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="postal_code">Postal Code</Label>
                        <Input type="text" name="postalCode" id="postalCode" value={editedData || ""} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="about">About Me</Label>
                        <Input type="textarea" name="about" id="about" value={editedData || ""} onChange={handleChange} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSaveEdit}>Save</Button>{' '}
                <Button color="secondary" onClick={handleCancelEdit}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalProfile;
