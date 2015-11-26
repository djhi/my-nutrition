import React, { PropTypes } from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Form, ValidatedInput} from 'react-bootstrap-validation';

const NewMealTemplateModal = ({
    children,
    defaultValue,
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
        model={{value: defaultValue}}
        onValidSubmit={({value}) => onConfirm(value)}
      >
        <Modal.Body>
            {children}
            <ValidatedInput
              type="text"
              placeholder={placeholder}
              name="value"
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
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
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
