/* global Meteor */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTitle } from '../../actions/app';

class Dashboard extends Component {
  static propTypes = {
    children: PropTypes.node,
    setTitle: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.setTitle('Tableau de bord');
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

function mapStateToProps(state) {
  return {
    coachees: state.coachees.items,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setTitle,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
