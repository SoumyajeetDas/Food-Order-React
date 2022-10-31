import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function RatingAddedModal(props) {

    const handleClose = () => props.setModalShow(false);
    console.log("Modal in Rating",props.modalShow)


    return (
        <Modal show={props.modalShow} onHide={handleClose}>
            <Modal.Body>
                <Modal.Title><b class="text-info">Thanks for the Rating!!</b></Modal.Title>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
