import React, { Component } from 'react'

class DataProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      host: window.location.origin + ':3000/',
      isLoading: true,
      data: null,
      error: null,
    };
  }

  parseData(data) {
    if (Array.isArray(data)) {
      data.forEach(item => {
        item.image = this.state.host + 'icons/' + item.productId;
      });
    }
    else {
      data.image = this.state.host + 'images/' + data.productId;
    }

    return data;
  };

  setData(data) {
    this.setState({
      isLoading: false,
      data: this.parseData(data),
    });
  }

  setError() {
    this.setState({
      isLoading: false,
      error: true,
    });
  }

  fetch(url) {
    return fetch(url).then(res => res.json()).catch(this.setError);
  }

  componentDidMount() {
    if (this.props.productId) {
      this.fetch(this.state.host + 'product/' + this.props.productId)
        .then(data => {
          this.setData(data)
        })
    }
    else {
      this.fetch(this.state.host + 'list')
        .then(data => {
          this.setData(data.products)
        })
    }
  }

  render() {
    return this.props.children({
      loading: this.state.isLoading,
      error: this.state.error,
      data: this.state.data,
    });
  }
}

export default DataProvider;
