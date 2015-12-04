import React, { Component, PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape, FormattedMessage } from 'react-intl';

const messages = defineMessages({
    editTooltip: {
      id: 'planning.meal.clickToEdit',
      defaultMessage: 'Click to edit',
      description: 'Displayed as a tooltip on the meal time link',
    }
});

class MealTime extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
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
    const { formatMessage } = this.props.intl;

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
          <button type="button" className="btn btn-primary" onClick={this.onTimeChange.bind(this)}>
            <FormattedMessage
              id="common.save"
              defaultMessage="Save"
            />
          </button>
          <button type="button" className="btn btn-secondary" onClick={this.onCancel.bind(this)}>
            <FormattedMessage
              id="common.cancel"
              defaultMessage="Cancel"
            />
          </button>
        </div>
      </form>
    );
  }

  renderView() {
    const { time } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <button
        type="button"
        className="btn btn-link"
        data-toggle="tooltip"
        data-placement="top"
        title={formatMessage(messages.editTooltip)}
        onClick={this.onEdit.bind(this)}
      >
        <FormattedMessage
          id="planning.meal.takenAt"
          description="Displayed at the top of a meal, as a link for quick edition"
          defaultMessage="Taken at {time}"
          values={{time}}
        />
      </button>
    );
  }

  render() {
    const { edition } = this.state;

    return <div className="meal-time">{edition ? this.renderForm() : this.renderView()}</div>;
  }
}

export default injectIntl(MealTime);
