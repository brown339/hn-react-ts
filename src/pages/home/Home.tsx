import React from 'react';

import Database from '../../components/database/Database';
import Post from '../../components/post/Post';

interface Props { };
interface State {
  ids: number[]
};

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ids: []
    };
  }

  async componentDidMount() {
    const ids = await Database.getNewStories();
    this.setState({
      ids
    });
  }
  
  renderPosts() {
    return this.state.ids.map((id: number) => {
      return (
        <Post key={id} id={id} />
      )
    });
  }

  render(): JSX.Element {
    return (
      <div className="post-list">
        {this.renderPosts()}
      </div>
    )
  }
}

export default Home;