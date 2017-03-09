/* global interfaceConfig */

import React, { Component } from 'react';

/**
 * Implements an abstract React Component for overlay - the components which are
 * displayed on top of the application covering the whole screen.
 *
 * @abstract
 */
export default class OverlayFrame extends Component {
    /**
     * OverlayFrame component's property types.
     *
     * @static
     */
    static propTypes = {
        /**
         * The browser which is used currently.
         *
         * @public
         * @type {string}
         */
        children: React.PropTypes.node.isRequired,

        /**
         * Indicates the css style of the overlay. If true, then lighter;
         * darker, otherwise.
         *
         * @type {boolean}
         */
        isLightOverlay: React.PropTypes.bool
    }

    /**
     * Initializes a new AbstractOverlay instance.
     *
     * @param {Object} props - The read-only properties with which the new
     * instance is to be initialized.
     * @public
     */
    constructor(props) {
        super(props);

        this.state = {
            /**
             * Indicates whether the film strip only mode is enabled or not.
             *
             * @type {boolean}
             */
            filmStripOnly: interfaceConfig.filmStripOnly
        };
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement|null}
     */
    render() {
        let containerClass = this.props.isLightOverlay
            ? 'overlay__container-light' : 'overlay__container';
        let contentClass = 'overlay__content';

        if (this.state.filmStripOnly) {
            containerClass += ' filmstrip-only';
            contentClass += ' filmstrip-only';
        }

        return (
            <div
                className = { containerClass }
                id = 'overlay'>
                <div className = { contentClass }>
                    {
                        this.props.children
                    }
                </div>
            </div>
        );
    }
}
