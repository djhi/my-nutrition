import React, { PropTypes } from 'react';
import {Button, Modal} from 'react-bootstrap';
import {Form, ValidatedInput} from 'react-bootstrap-validation';
import { FormattedMessage } from 'react-intl';

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
  confirmButtonLabel: PropTypes.node,
  cancelButtonLabel: PropTypes.node,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

NewMealTemplateModal.defaultProps = {
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

export default NewMealTemplateModal;
