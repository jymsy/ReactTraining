var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

var Comment = React.createClass({displayName: "Comment",
  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, 
          this.props.author
        ), 
        React.createElement("span", {dangerouslySetInnerHTML: this.rawMarkup()})
      )
    );
  }
});

var CommentList = React.createClass({displayName: "CommentList",
  render: function() {
    var commentNodes = this.props.data.map(function (comment, i) {
      return (
        React.createElement(Comment, {author: comment.author, key: i}, 
          comment.text
        )
      );
    });
    return (
      React.createElement("div", {className: "commentList"}, 
        commentNodes
      )
    );
  }
});



var CommentForm = React.createClass({displayName: "CommentForm",
  render: function() {
    return (
      React.createElement("div", {className: "commentForm"}, 
        "Hello, world! I am a CommentForm."
      )
    );
  }
});

var CommentBox = React.createClass({displayName: "CommentBox",
  //getInitialState() 在组件的生命周期中仅执行一次，用于设置组件的初始化 state 。
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.state.data}), 
        React.createElement(CommentForm, null)
      )
    );
  }
});

// ReactDOM.render(
//   <CommentBox data={data} />,
//   document.getElementById('content')
// );

ReactDOM.render(
  React.createElement(CommentBox, {url: "/api/comments"}),
  document.getElementById('content')
);

