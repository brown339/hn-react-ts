import React from 'react';

interface Props { }

class Seen extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      postIds: localStorage.seenIds
    };
  }

  async componentDidMount() {
    // Fetch the latest 
    // const stories = Database.getNewStories();
  }

  render() {
    return (
      <div>Seen</div>
    );
  }
}

export default Seen;