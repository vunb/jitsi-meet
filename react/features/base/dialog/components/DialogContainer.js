import React, { Component } from 'react';
import { connect } from 'react-redux';

/**
 * Implements a DialogContainer that will be responsible for
 * showing all dialogs.
 */
export class DialogContainer extends Component {

    /**
     * DialogContainer component's property types.
     *
     * @static
     */
    static propTypes = {
        _component: React.PropTypes.func,
        _props: React.PropTypes.object
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {

        if (!this.props._component) {
            return null;
        }

        return React.createElement(this.props._component, this.props._props);
    }
}

/**
 * Maps (parts of) the Redux state to the associated Dialog's props.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {{
 *     _component: React.Component,
 *     _props: React.PropTypes.object
 * }}
 */
function _mapStateToProps(state) {

    return {
        _component: state['features/base/dialog'].component,
        _props: state['features/base/dialog'].props
    };
}

export default connect(_mapStateToProps)(DialogContainer);
