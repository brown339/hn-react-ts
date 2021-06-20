import './Dialog.css';

import React from 'react';

import Post from '../post/Post';

interface Props {
  id: number,
}
interface State {

}

class Dialog extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }

  async componentDidMount() {

  }

  render() {
    const { id } = this.props;

    return (
      <div className="background">
        <div className="dialog">
          <Post key={id} id={id} />
        </div>
      </div>
    )
  }
}

export default Dialog;