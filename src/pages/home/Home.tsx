import './Home.css';

import React from 'react';

import Database from '../../components/database/Database';
import Post from '../../components/post/Post';

interface Props { };
interface State {
  ids: number[], 
  count: number,
};

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ids: [],
      count: 10,
    };
  }

  async componentDidMount() {
    const ids = await Database.getNewStories();
    this.setState({
      ids,
    });

    this.handleInfiniteScroll();
  }

  handleInfiniteScroll() {
    let callback = (entries: any, obs: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          this.setState({
            count: this.state.count + 10
          });
        }
      });
    };

    let options = {
      threshold: 1.0
    }

    let observer = new IntersectionObserver(callback, options);
    let target = document.querySelector('.bottom');
    observer.observe(target as Element);
  }

  renderPosts(): JSX.Element[] {
    const { ids, count } = this.state;
    const postsToRender = ids.slice(0, count);

    return postsToRender.map((id: number) => {
      return (
        <Post key={id} id={id} />
      )
    });
  }

  render(): JSX.Element {
    return (
      <div className="post-list">
        {this.renderPosts()}

        <div className="bottom"></div>
      </div>
    )
  }
}

export default Home;