import React, { PropTypes } from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Form, ValidatedInput} from 'react-bootstrap-validation';

const NewMealTemplateModal = ({
    children,
    confirmButtonLabel,
    cancelButtonLabel,
    onCancel,
    onConfirm,
    placeholder,
    show,
  }) => (
  <Modal onHide={onCancel} show={show}>
      <Form
        className=""
        onValidSubmit={({name}) => onConfirm(name)}
      >
        <Modal.Body>
            <p>
              {children}
            </p>
            <ValidatedInput
              type="text"
              placeholder={`${placeholder}`}
              name="name"
              validate="required"
              errorHelp={{
                required: 'Requis',
              }}
            />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" type="submit">
            {confirmButtonLabel}
          </Button>

          <Button onClick={onCancel}>
            {cancelButtonLabel}
          </Button>
        </Modal.Footer>
      </Form>
  </Modal>
);

NewMealTemplateModal.propTypes = {
  children: PropTypes.node.isRequired,
  placeholder: PropTypes.string.isRequired,
  confirmButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

NewMealTemplateModal.defaultProps = {
  confirmButtonLabel: 'Ok',
  cancelButtonLabel: 'Annuler',
};

export default NewMealTemplateModal;
