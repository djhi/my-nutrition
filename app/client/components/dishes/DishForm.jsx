import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { assign } from 'lodash';

const messages = defineMessages({
  required: {
    id: 'common.required',
    description: 'Error message shown when a required field is missing',
    defaultMessage: 'Required',
  },
  portionsPlaceholder: {
    id: 'planning.dish.portionsPlaceholder',
    description: 'Placeholder for dish portions count input',
    defaultMessage: 'Portions',
  },
  labelPlaceholder: {
    id: 'planning.dish.labelPlaceholder',
    description: 'Placeholder for dish label input',
    defaultMessage: 'Label',
  },
});

class DishForm extends Component {
  static propTypes = {
    dish: PropTypes.object,
    intl: intlShape.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const dish = assign({ portions: 1 }, props.dish);

    this.state = {
      dish,
      edition: !!dish._id,
    };
  }

  componentDidMount() {
    this.refs.label.getInputDOMNode().select();
  }

  onKeyDown(event) {
    // Sepcial key handling for textarea allowing to submit the form using Ctrl + Enter
    if (event.key === 'Enter' && event.ctrlKey) {
      ReactDOM.findDOMNode(this.refs.submit).click();
    }
  }

  onValidSubmit(values) {
    // If we were editing an existing dish, inject its id in the resulting dish
    this.props.onSubmit(this.props.dish ? assign({}, this.props.dish, values) : values);
  }

  render() {
    const { intl: { formatMessage }, onCancel } = this.props;
    const { dish, edition } = this.state;

    const help = (
      <span id="dishform">
        <FormattedMessage
          id="planning.dish.helpForSave"
          description="Displayed below the textarea for dish's description"
          defaultMessage="Save with: CTRL + Enter"
        />
      </span>
    );

    return (
      <Form
        className="form-horizontal"
        model={dish}
        onValidSubmit={this.onValidSubmit.bind(this)}
      >
        <div className="row">
          <div className="col-xs-6">
            <ValidatedInput
              type="number"
              placeholder={formatMessage(messages.portionsPlaceholder)}
              name="portions"
              validate="required"
              errorHelp={{
                required: formatMessage(messages.required),
              }}
              onKeyDown={this.onKeyDown.bind(this)}
            />
          </div>
          <div className="col-xs-6">
            <label className="control-label">
              <FormattedMessage
                id="planning.dish.portions"
                description="Label displayed after the dish's portions count (should handle optional plural form)"
                defaultMessage="portion(s)"
              />
            </label>
          </div>
          <div className="col-xs-12">
            <ValidatedInput
              ref="label"
              type="text"
              placeholder={formatMessage(messages.labelPlaceholder)}
              name="label"
              validate="required"
              errorHelp={{
                required: formatMessage(messages.required),
              }}
              onKeyDown={this.onKeyDown.bind(this)}
            />
          </div>
          <div className="col-xs-12">
            <ValidatedInput
              type="textarea"
              placeholder="Description"
              help={help}
              name="description"
              onKeyDown={this.onKeyDown.bind(this)}
            />
          </div>
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" ref="submit" type="submit">
            <FormattedMessage
              id="common.save"
              defaultMessage="Save"
            />
          </button>
          <button className="btn btn-secondary" onClick={onCancel}>
            <FormattedMessage
              id="common.cancel"
              defaultMessage="Cancel"
            />
          </button>
        </div>
      </Form>
    );
  }
}

export default injectIntl(DishForm);
