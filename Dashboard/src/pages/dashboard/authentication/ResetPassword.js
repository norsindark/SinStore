import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { BASE_API } from 'constant/network';
import { Button, Card, CardBody, Col, FormGroup, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { updateUserPassword } from "services/user";

const ResetPassword = () => {
    const [queryParameters] = useSearchParams();
    const email = queryParameters.get("email");
    const token = queryParameters.get("token");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");


    const validateForm = () => {
        const errors = {};

        if (!password.trim()) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setError(JSON.stringify(validationErrors));
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        console.log(email, token);

        try {
            const tokenResponse = await axios.get(`http://localhost:8080/api/auth/check-token?token=${token}`);
            if (tokenResponse.data === true) {
                const usersResponse = await axios.get(`http://localhost:3001/users?email=${email}`);
                const users = usersResponse.data;


                if (users && users.length > 0) {
                    const user = users[0];
                    const message = await updateUserPassword(user, password);
                    alert(message);
                    navigate("/auth/login", { replace: true });
                } else {
                    console.error("User not found with email:", email);
                }
            } else {
                console.error("Invalid token");
            }
        } catch (error) {
            console.error("Error checking token:", error);
        }
    };


    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        <div className="text-muted text-center mt-2 mb-3">
                            <small>Set New Your Password</small>
                        </div>
                        <Form role="form" onSubmit={handleSubmit}>
                            <FormGroup className="mb-3">
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="New password"
                                        type="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup className="input-group-alternative">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                        placeholder="Confirm new password"
                                        type="password"
                                        autoComplete="new-password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </InputGroup>
                            </FormGroup>
                            {error && <div className="text-danger">{error}</div>}
                            <div className="text-center">
                                <Button
                                    className="my-4"
                                    color="primary"
                                    type="submit"
                                >
                                    Set New Password
                                </Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default ResetPassword;
