import React, {Component, PropTypes} from 'react';
import {Overlay, Popover} from 'react-bootstrap';
import ReactDOM from 'react-dom';
import Fa from 'react-fa';
import DatePicker from 'react-date-picker';
import moment from 'moment';

export default class PlanningSelector extends Component {
  static propTypes = {
    dateSelected: PropTypes.instanceOf(Date).isRequired,
    ready: PropTypes.bool,
    onDateChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showCalendar: false,
    };
  }

  onChange(dateText, selectedMoment) {
    this.setState({showCalendar: false});
    this.props.onDateChange(selectedMoment.toDate());
  }

  showCalendar() {
    this.setState({showCalendar: true});
  }

  render() {
    const { showCalendar } = this.state;
    const { dateSelected, onDateChange, ready } = this.props;
    const formattedDate = moment(dateSelected).format('DD MMMM YYYY');
    const icon = !ready ? <Fa name="spinner" spin /> : <Fa name="calendar" />;
    const prevDate = moment(dateSelected).add(-1, 'days').toDate();
    const nextDate = moment(dateSelected).add(1, 'days').toDate();

    return (
      <div className="btn-group">
        <button className="btn btn-secondary" onClick={onDateChange.bind(null, prevDate)}>
          <Fa name="chevron-left" /> Précédent
        </button>

        <button ref="button" className="btn btn-secondary" onClick={this.showCalendar.bind(this)}>
          {icon} {formattedDate}
        </button>

        <Overlay
          placement="bottom"
          show={showCalendar}
          target={() => ReactDOM.findDOMNode(this.refs.button)}
        >
          <Popover id="planning_date">
            <DatePicker
              date={dateSelected}
              locale="fr"
              todayText="Aujourd'hui"
              gotoSelectedText="Date sélectionnée"
              onChange={this.onChange.bind(this)}
            />
          </Popover>
        </Overlay>

        <button className="btn btn-secondary" onClick={onDateChange.bind(null, nextDate)}>
          Suivant <Fa name="chevron-right" />
        </button>
      </div>
    );
  }
}
