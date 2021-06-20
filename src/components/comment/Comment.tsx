import './Comment.css';

import parse from 'html-react-parser';
import React from 'react';

import Database from '../database/Database';

interface Props {
  id: number,
}
interface State {
  text: string,
}

class Comment extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  async componentDidMount() {
    const { id } = this.props;
    const comment = await Database.getItemById(id) || null;

    if (comment?.text) {
      this.setState({
        text: comment.text
      });
    }
  }

  render() {
    const { text } = this.state;

    return (
      <div className="comment-item">
        {parse(text)}
      </div>
    );
  }
}

export default Comment;