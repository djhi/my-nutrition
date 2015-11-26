import React, { Component, PropTypes } from 'react';
import Fa from 'react-fa';
import ConfirmModal from '../ConfirmModal';
import PromptModal from '../PromptModal';

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
          <button className="dropdown-item" onClick={this.onNewMealTemplate.bind(this)}>Enregistrer comme modèle</button>
          <button className="dropdown-item text-danger" onClick={this.onDelete.bind(this)}>Supprimer</button>
        </div>
        <PromptModal
          defaultValue={meal.name}
          onCancel={this.onCancel.bind(this)}
          onConfirm={this.onSaveNewMealTemplate.bind(this)}
          show={setTemplateName}
        >
          Entrez le nom de ce nouveau modèle de repas
          <p className="text-muted"><small>Si ce nom existe déjà, le modèle correspondant sera remplacé.</small></p>
        </PromptModal>

        <ConfirmModal
          onCancel={this.onCancel.bind(this)}
          onConfirm={this.onDeletionConfirmed.bind(this)}
          show={confirm}
        >
            Voulez-vous vraiment supprimer ce repas ?
        </ConfirmModal>
      </div>
    );
  }
}
