import React, { Component, PropTypes } from 'react';
import Fa from 'react-fa';
import ConfirmModal from '../ConfirmModal';
import PromptModal from '../PromptModal';
import { FormattedMessage } from 'react-intl';

export default class MealMenu extends Component {
  static propTypes = {
    meal: PropTypes.object.isRequired,
    onMealDeleted: PropTypes.func.isRequired,
    onNewMealTemplate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      confirm: false,
      setTemplateName: false,
    };
  }

  onCancel() {
    this.setState({
      confirm: false,
      setTemplateName: false,
    });
  }

  onNewMealTemplate(name) {
    this.setState({ setTemplateName: true });
  }

  onSaveNewMealTemplate(name) {
    this.setState({ setTemplateName: false });
    this.props.onNewMealTemplate(this.props.meal._id, name);
  }

  onDelete() {
    this.setState({ confirm: true });
  }

  onDeletionConfirmed() {
    this.setState({ confirm: false });
    this.props.onMealDeleted(this.props.meal._id);
  }

  render() {
    const { meal } = this.props;
    const { confirm, setTemplateName } = this.state;

    return (
      <div className="btn-group pull-right">
        <button type="button" className="btn btn-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        </button>
        <div className="dropdown-menu dropdown-menu-right">
          <button className="dropdown-item" onClick={this.onNewMealTemplate.bind(this)}>
            <FormattedMessage
              id="planning.meal.saveAsTemplate"
              description="Displayed in meal menu"
              defaultMessage="Save as template"
            />
          </button>
          <button className="dropdown-item text-danger" onClick={this.onDelete.bind(this)}>
            <FormattedMessage
              id="common.remove"
              defaultMessage="Remove"
            />
          </button>
        </div>
        <PromptModal
          defaultValue={meal.name}
          onCancel={this.onCancel.bind(this)}
          onConfirm={this.onSaveNewMealTemplate.bind(this)}
          show={setTemplateName}
        >
          <FormattedMessage
            id="planning.meal.promptNewTemplateName"
            description="Displayed in a modal when requesting to create a new template from a meal"
            defaultMessage="Enter a name for this new meal template"
          />
          <p className="text-muted">
            <small>
              <FormattedMessage
                id="planning.meal.promptNewTemplateNameInfo"
                description="Displayed in a modal when requesting to create a new template from a meal as addtional information"
                defaultMessage="If the name is already used, the matching template will be overriden"
              />
            </small>
          </p>
        </PromptModal>

        <ConfirmModal
          onCancel={this.onCancel.bind(this)}
          onConfirm={this.onDeletionConfirmed.bind(this)}
          show={confirm}
        >
          <FormattedMessage
            id="planning.meal.removalConfirmationPrompt"
            description="Displayed in a modal when requesting to remove a meal"
            defaultMessage="Do you really want to remove this meal ?"
          />
        </ConfirmModal>
      </div>
    );
  }
}
