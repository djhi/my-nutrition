import React, { Component, PropTypes } from 'react';

export default class MealTime extends Component {
  static propTypes = {
    time: PropTypes.string.isRequired,
    onTimeChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      time: props.time,
      edition: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ time: nextProps.time });
  }

  onCancel() {
    this.setState({ edition: false });
  }

  onEdit() {
    this.setState({ edition: true });
  }

  onChange() {
    const time = this.refs.time.value;

    this.setState({
      time,
    });
  }

  onKeyDown(event) {
    // Sepcial key handling for textarea allowing to submit the form using Ctrl + Enter
    if (event.key === 'Enter') {
      this.onTimeChange();
    }
  }

  onTimeChange() {
    const time = this.refs.time.value;
    this.setState({ edition: false });

    this.props.onTimeChange(time);
  }

  renderForm() {
    const { time } = this.state;

    return (
      <form>
        <fieldset className="form-group">
          <input
            className="form-control"
            ref="time"
            value={time}
            type="time"
            onChange={this.onChange.bind(this)}
            onKeyDown={this.onKeyDown.bind(this)}
          />
        </fieldset>

        <div className="form-group btn-group btn-group-xs" role="group">
          <button type="button" className="btn btn-primary" onClick={this.onTimeChange.bind(this)}>Enregistrer</button>
          <button type="button" className="btn btn-secondary" onClick={this.onCancel.bind(this)}>Annuler</button>
        </div>
      </form>
    );
  }

  renderView() {
    const { time } = this.state;

    return (
        <button
          type="button"
          className="btn btn-link"
          data-toggle="tooltip"
          data-placement="top"
          title="Cliquer pour modifier"
          onClick={this.onEdit.bind(this)}
        >
        Pris à {time}
      </button>
    );
  }

  render() {
    const { edition } = this.state;

    return <div className="meal-time">{edition ? this.renderForm() : this.renderView()}</div>;
  }
}
