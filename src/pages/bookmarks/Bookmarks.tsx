import React from 'react';

import Post from '../../components/post/Post';

interface Props {
}
interface State {
  ids: number[]
}

class Bookmarks extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ids: JSON.parse(localStorage.getItem('bookmarks') as string) || []
    };
  }

  renderPosts(): JSX.Element[] {
    const { ids } = this.state;

    return ids.map((id: number) => {
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

export default Bookmarks;