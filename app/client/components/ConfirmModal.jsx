import React, {PropTypes} from 'react';
import {Button, Modal} from 'react-bootstrap';

const ConfirmDeletionModal = ({
      children,
      confirmButtonLabel,
      onCancel,
      onConfirm,
      show,
    }) => (
  <Modal onHide={onCancel} show={show}>
    <Modal.Body>
      {children}
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="primary" onClick={onConfirm}>
        {confirmButtonLabel}
      </Button>

      <Button onClick={onCancel}>
        Annuler
      </Button>
    </Modal.Footer>
  </Modal>
);

ConfirmDeletionModal.propTypes = {
  children: PropTypes.node.isRequired,
  confirmButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ConfirmDeletionModal.defaultProps = {
  confirmButtonLabel: 'Ok',
  cancelButtonLabel: 'Annuler',
};

export default ConfirmDeletionModal;
