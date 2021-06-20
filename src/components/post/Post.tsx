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
  bookmarked: boolean,
  seen: boolean,
}

class Post extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      story: null,
      bookmarked: this.isBookmarked(),
      seen: this.isSeen()
    };
  }

  async componentDidMount() {
    const { id } = this.props;
    const story = await Database.getItemById(id);
    this.setState({
      story,
    });

    this.handleSeen();
  }

  handleSeen(): void {
    const { id } = this.props;

    let callback = (entries: any, obs: any) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting && !this.isSeen()) {
          console.log('seen:', id);
          const seen = JSON.parse(localStorage.getItem('seen') as string) || [];
          seen.push(id);
          localStorage.setItem('seen', JSON.stringify(seen));
          this.setState({
            seen: this.isSeen()
          });

          observer.disconnect();
        }
      });
    };

    let options = {
      threshold: 1.0
    }

    let observer = new IntersectionObserver(callback, options);
    let target = document.querySelector(`div[data-id="${id}"]`);
    observer.observe(target as Element);
  }

  handleClick(id: number = 0) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') as string) || [];
    const idx = bookmarks.indexOf(id);

    if (idx >= 0) {
      bookmarks.splice(idx, 1);
    } else {
      bookmarks.push(id);
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    this.setState({
      bookmarked: this.isBookmarked()
    });
  }

  isBookmarked(): boolean {
    const { id } = this.props;

    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') as string) || [];
    return bookmarks.includes(id);
  }

  isSeen(): boolean {
    const { id } = this.props;
    
    const seen = JSON.parse(localStorage.getItem('seen') as string) || [];
    return seen.includes(id);
  }

  renderComments(ids: number[]): JSX.Element[] {
    return ids.map((id: number) => {
      return (
        <Comment key={id} id={id} />
      );
    });
  }

  render(): JSX.Element {
    const { title, kids, id } = this.state.story || {};
    const { bookmarked } = this.state;

    return (
      <div
        className={`post-item ${bookmarked ? 'bookmarked': ''}`}
        onClick={() => this.handleClick(id)}
        data-id={id}>
        <p>{title}</p>

        {kids &&
          <div className="comment-list">
            {this.renderComments(kids)}
          </div>
        }
      </div>
    );
  }
}

export default Post;