import React, {PropTypes} from 'react';
import {Button, Modal} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

const ConfirmDeletionModal = ({
      children,
      confirmButtonLabel,
      cancelButtonLabel,
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
        {cancelButtonLabel}
      </Button>
    </Modal.Footer>
  </Modal>
);

ConfirmDeletionModal.propTypes = {
  children: PropTypes.node.isRequired,
  confirmButtonLabel: PropTypes.node,
  cancelButtonLabel: PropTypes.node,
  show: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ConfirmDeletionModal.defaultProps = {
  confirmButtonLabel: (
    <FormattedMessage
      id="common.ok"
      defaultMessage="Ok"
    />
  ),
  cancelButtonLabel: (
    <FormattedMessage
      id="common.cancel"
      defaultMessage="Cancel"
    />
  ),
};

export default ConfirmDeletionModal;
