import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class PostsIndex extends Component {

  componentWillMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    if(!this.props.posts) {
      return <div className="emptyMessage">There are no posts yet... Why dont you go ahead and create one by clicking on the 'Add Post' button.</div>
    } 
    //since this.props.posts is an object and not array we use lodash.map instead of React map.
    return _.map(this.props.posts, post => {     
     return (
      <li className="list-group-item" key={post.id}>
      <Link to={`/posts/${post.id}`}>
        {post.title}
      </Link>
     </li>
     );
   }); 
  }

  render() {
    return (
      <div>
        <h2>Blog Posts</h2>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">
            Add a post
          </Link>
        </div>
        <ul className="list-group">{this.renderPosts()}</ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { posts: state.posts }
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex);// calling fetchPosts here is just a shorcut for binding action creators i.e instead of mapDispatchToProps.
