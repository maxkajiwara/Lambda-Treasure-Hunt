// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';

// import styled from 'styled-components';

class Info extends Component {
	render() {
		return <div className="Info">Info</div>;
	}
}

const mapStateToProps = state => ({
	status: state.mapReducer.status
});

export default connect(
	mapStateToProps,
	{}
)(Info);
