import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import { assign } from 'lodash';

export default class DishForm extends Component {
  static propTypes = {
    dish: PropTypes.object,
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
    const { onCancel } = this.props;
    const { dish, edition } = this.state;
    const help = <span id="dishform">Enregistrer le plat: <b>CTRL + Entrer</b></span>;

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
              placeholder="Portions"
              name="portions"
              validate="required"
              errorHelp={{
                required: 'Requis',
              }}
              onKeyDown={this.onKeyDown.bind(this)}
            />
          </div>
          <div className="col-xs-6">
            <label className="control-label">portion(s)</label>
          </div>
          <div className="col-xs-12">
            <ValidatedInput
              ref="label"
              type="text"
              placeholder="Libellé"
              name="label"
              validate="required"
              errorHelp={{
                required: 'Requis',
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
          <button className="btn btn-primary" ref="submit" type="submit">{edition ? 'Enregistrer' : 'Ajouter'}</button>
          <button className="btn btn-secondary" onClick={onCancel}>Annuler</button>
        </div>
      </Form>
    );
  }
}
