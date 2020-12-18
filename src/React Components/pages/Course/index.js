/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../../validation/isEmpty';
import { deleteCourse } from '../../../redux/actions/Course Actions';
import { triggerDeletion } from '../../../redux/actions/Delete Actions';

class Course extends Component {
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
            this.props.deletion.id === this.props.activeCourse.id
        )
            this.props.deleteCourse(this.props.activeCourse.id);
    }
    //==========================================================================
    render() {
        if (isEmpty(this.props.activeCourse)) {
            this.props.history.push('/dashboard');
            return null;
        }

        window.scrollTo(0, 0);

        const {
            id,
            title,
            about,
            logo,
            cover,
            price,
            date,
            instructor,
            no_of_Lectures,
            no_of_Students,
            no_of_Questions,
            suggestions,
        } = this.props.activeCourse;

        let formatted = new Date(date).toLocaleDateString('en-UK', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        let deleteBtn = null;
        if (this.props.activeCourse.instructorID === this.props.user.id) {
            deleteBtn = (
                <Link
                    to="#"
                    className="elbtn__type1"
                    onClick={this.props.triggerDeletion.bind(this,id)}>
                    <i class="fas fa-times-circle" />
                    &nbsp; Delete Course
                </Link>
            );
        }

        if (isEmpty(suggestions)) suggestions.push('No suggestions yet...');

        let addSuggestion = null;
        if (this.props.user.role === 'Student')
            addSuggestion = (
                <Link to="#" className="course__suggestion--btn">
                    Add Suggestions
                </Link>
            );

        const SuggestionList = suggestions.map((sg, index) => (
            <div className="suggestion" key={index}>
                {sg}
            </div>
        ));

        return (
            <div className="course">
                <img className="course__cover" src={cover} alt="Course Cover" />
                <img className="course__logo" src={logo} alt="Course Logo" />

                <div className="course__title">{title}</div>
                <div className="course__about">{about}</div>

                <div className="course__group">
                    <div className="course__info-group">
                        <div className="course__info">
                            No. of Lectures: {no_of_Lectures}
                        </div>
                        <div className="course__info">
                            No. of Students: {no_of_Students}
                        </div>
                        <div className="course__info">
                            No. of Questions: {no_of_Questions}
                        </div>
                        <div className="course__info">
                            Date Created:&emsp;{formatted}
                        </div>
                    </div>
                    // eslint-disable-next-line react/jsx-no-comment-textnodes
                    <div className="course__inst-group">
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img
                            src={instructor.profilePic}
                            className="course__inst__img"
                            alt="profile Picture"
                        />
                        <div className="course__inst--info">
                            <div className="course__inst__name">
                                {instructor.name}
                            </div>
                            <div className="course__inst__email">
                                {instructor.email}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="course__btn-group">
                    <Link
                        to="/dashboard/course/payment"
                        className="elbtn__type1">
                        Price: ${price}
                    </Link>
                    <Link
                        to="/dashboard/course/lectures"
                        className="elbtn__type1">
                        View Lectures
                    </Link>
                    <Link
                        to="/dashboard/course/discussion"
                        className="elbtn__type1">
                        Discussion Forum
                    </Link>
                    {deleteBtn}
                </div>

                <section className="suggestion-list">
                    <div className="suggestion__heading">Suggestions :</div>
                    {SuggestionList}
                    {addSuggestion}
                </section>
            </div>
        );
    }
}
//==============================================================================
const mapStateToProps = state => ({
    user: state.user,
    activeCourse: state.courses.activeCourse,
    deletion: state.deletion,
    errors: state.errors,
});

export default connect(
    mapStateToProps,
    { deleteCourse, triggerDeletion },
)(withRouter(Course));
