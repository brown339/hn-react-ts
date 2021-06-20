import './Home.css';

import parse from 'html-react-parser';
import React from 'react';

import Database from '../../components/database/Database';
import Dialog from '../../components/dialog/Dialog';
import Post from '../../components/post/Post';

interface Props { };
interface State {
  ids: number[],
  count: number,
  latestComment: string,
  parentId: number,
  dialogOpen: boolean,
};

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ids: [],
      count: 10,
      latestComment: '',
      parentId: 0, 
      dialogOpen: false,
    };
  }

  async componentDidMount() {
    const ids = await Database.getNewStories();
    this.setState({
      ids,
    });

    this.handleInfiniteScroll();
    this.handleLatest();
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

  handleLatest() {
    Database.getLatestItem().on('value', snap => {
      setTimeout(async () => {
        const item = await Database.getItemById(snap.val());
        if (item?.type === 'comment' && item?.text) {
          this.setState({
            latestComment: item.text
          });

          if (this.state.dialogOpen === false) {
            this.setState({
              parentId: item.parent as number
            });
          }

        }
      }, 3000)
    });
  }

  handleDialog() {
    this.setState({
      dialogOpen: !this.state.dialogOpen,
    });
  }

  render(): JSX.Element {
    const { latestComment, dialogOpen, parentId } = this.state;

    return (
      <div className="post-list">
        {this.renderPosts()}

        { dialogOpen &&
          <Dialog id={parentId} />
        }

        { latestComment && 
          <div className="latest-comment" onClick={() => this.handleDialog()}>
            {parse(latestComment)}
          </div>
        }
        <div className="bottom"></div>
      </div>
    )
  }
}

export default Home;