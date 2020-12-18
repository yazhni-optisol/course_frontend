/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import { deleteAnswers } from '../../../redux/actions/Answer Actions';
import { triggerDeletion } from '../../../redux/actions/Delete Actions';


class ConvoBubble extends Component {
    //==========================================================================
    componentDidUpdate(prevProps) {
        if (
            !isEmpty(this.props.errors) &&
            this.props.errors !== prevProps.errors &&
            this.props.errors !== 'Unauthorized'
        )
            this.setState({ errors: this.props.errors });

        if (
            !prevProps.deletion.approval &&
            this.props.deletion.approval &&
            this.props.deletion.id === this.props.answerID
        ) {
            console.log('deleting');
            this.props.deleteAnswers(this.props.answerID);
        }
    }
    //==========================================================================
    render() {
        const { name, owner, profilePic, date, answerID, text } = this.props;

        let type = 'passive';
        if (name === owner) type = 'active';

        let deleteBtn = null;
        if (name === this.props.user.name && answerID !== '-1') {
            deleteBtn = (
                <button
                    className={`convoBubble__${type}--delete`}
                    onClick={this.props.triggerDeletion.bind(this, answerID)}>
                    &times;
                </button>
            );
        }

        return (
            <div className={`convoBubble__${type}`}>
                <img
                    src={profilePic}
                    alt="Profile Pic"
                    className={`convoBubble__${type}--pic`}
                />
                <div className={`convoBubble__${type}__box`}>
                    <div className={`convoBubble__${type}--name`}>{name}</div>
                    {deleteBtn}
                    <div className={`convoBubble__${type}--date`}>{date}</div>
                    <div className={`convoBubble__${type}--text`}>{text}</div>
                </div>
            </div>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    user: state.user,
    deletion: state.deletion,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { deleteAnswers, triggerDeletion },
)(withRouter(ConvoBubble));
