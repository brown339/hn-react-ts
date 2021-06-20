import './Post.css';

import React from 'react';

import Item from '../../models/Item';
import Comment from '../comment/Comment';
import Database from '../database/Database';

interface Props {
  id: number
}
interface State {
  story: Item | null,
}

class Post extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      story: null,
    };
  }

  async componentDidMount() {
    const { id } = this.props;
    const story = await Database.getItemById(id);
    this.setState({
      story,
    });
  }

  renderComments(ids: number[]): JSX.Element[] {
    return ids.map((id: number) => {
      return (
        <Comment key={id} id={id} />
      );
    });
  }


  render(): JSX.Element {
    const { title, kids } = this.state.story || {};

    return (
      <div className="post-item">
        <p>{title}</p>

        { kids &&
          <div className="comment-list">
            {this.renderComments(kids)}
          </div>
        }
      </div>
    );
  }
}

export default Post;