import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
    
    componentDidMount() {
        const { id } = this.props.match.params;//provided by react-router. params lists al the wildcard tokens in the url. 
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;  
        this.props.deletePost(id, () =>  {
            this.props.history.push('/');
        });
    }

    render() {
        const { post } = this.props;

        if(!post) {
            return <div className="loader"></div>
        }

        return (
            <div>
                <Link className="btn btn-primary" to="/">
                    Back to Index
                </Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h5>Category: {post.categories}</h5>
                <p className="postContent">{post.content}</p>
            </div>
        );
    }
}

//the 2nd argue ownProps is the props obj tat is going to the component above.
function mapStateToProps({ posts }, ownProps) {
    return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
