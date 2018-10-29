import React, { Component } from 'react';
//reduxForm is similar to connect func. It helps our component to communicate with the formReducer(redux store)
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    //the field object here contains some event handlers that we need to wire up to the JSX that is returned.
    //in other words it lets the Field tag know abt any changes made in the input tag.
    renderField(field) {
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}//this syntax (...) tells it wants all the properties like event handlers(onChange,onblur) and value available as props.
                />
                <div className="text-help">
                {/*This meta.error property is automatically added to tat field obejct from validate func.*/}
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        //history.push('path) automatically calls the path when this func is executed. this is programmatic navigation.
        //the props in this.props.history is made available by the <Route> calling this component.
        this.props.createPost(values, () => {
            this.props.history.push('/');//reason we cal this inside createPost as a cb is coz we want to navigate oly afta the api post has been completed.
        });
    }
    
    render() {
        const { handleSubmit } = this.props;

        return (
            //handleSubmit does the reduxForm side of the work and the onsubmit callback does our side of the work like saving it to the backend.
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

//gets called automatically at certain points of the form's lifecycle(here when the form is submitted.
//values is an object that contains all the values submitted through the form.
function validate(values) {
  const errors = {};

  //validate the inputs from 'values'
  if(!values.title) {
      errors.title = "Enter a Title!";
  }

  if(!values.categories) {
      errors.categories = "Enter some categories";
  }

  if(!values.content) {
    errors.content = "Enter some content please";
}

  //If errors is empty, redux form assumes the form is fine to submit.
  //If errors had *any* properties, redux form assumes form is invalid.
  return errors;
  
}

export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'//basically naming a form in case we use multiple forms.
})(
    connect(null, {createPost})(PostsNew)
);