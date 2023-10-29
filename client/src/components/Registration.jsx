import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import CarouselImg from "./CarouselImg";
import Form from 'react-bootstrap/Form';
import "../css/Registration.css";

const Registratio = ({ handleClose, setIsOpen }) => {
    return (
        <Modal show={setIsOpen} className="registrationModal" centered={true}>
            <div className="container" id="registrationModalContainer">
                <div className="row" id="registrationModalContainerInner">
                    <div className="col-7" id="registrationModalCarouselOuter">
                        <CarouselImg />
                    </div>
                    <div className="col-5" id="registrationModalLoginOuter">
                            <Button className="btn-sm buttonClose"
                            title="Schließen Sie das Registrierungsfenster." variant="secondary" onClick={handleClose}>x</Button>
                        <Form>
                            <center className="formLabel">
                                <h2>Webdevelopment</h2>
                            </center>
                            <div className="col-12 text-break">
                                <p className="textCenter">
                                    Hallo, werden Sie Teil meiner Community und finden Sie was passendes für sich.
                                </p>
                            </div>
                            <Form.Group className="mb-2 inputFields" controlId="mail">
                                <Form.Control type="email" placeholder="Mail"></Form.Control>
                            </Form.Group>
                            <Form.Group className="mb-2 inputFields" controlId="password">
                                <Form.Control type="password" placeholder="Password"></Form.Control>
                            </Form.Group>
                            <div className="d-grid gap-2 col-6 mx-auto buttonOuter">
                                <Button variant="secondary" className="btn btn-secondary" type="submit">Login</Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};
Login.propTypes = {
    setIsOpen: PropTypes.bool.isRequired,
    handleClose: PropTypes.func
}
export default Login;
