import React, { Component } from 'react'
import PlaceholderImage from '../images/p.gif'
import PlaceholderNameImage from '../images/a.gif'
import UnknownImage from '../images/u.png'
import Constants from './constants.jsx'

class FahProductCard extends Component {
  onProductClick() {
    if (this.props.productClick) {
      this.props.productClick();
    }
  }

  render() {
    var productImage = <img src={UnknownImage} />;
    var content = (
      <div className="box-shadow product-content">
        <div className="product-name">
          <img src={PlaceholderNameImage} />
        </div>
        <div className="product-image product-placeholder">
          <img src={PlaceholderImage} />
        </div>
      </div>
    );

    if (this.props.product) {
      if (this.props.product.image) {
        productImage = <img src={this.props.product.image} />;
      }

      content = (
        <div className="box-shadow product-content" onClick={this.onProductClick.bind(this)}>
          <div className="product-name">
            {(this.props.product.name || '???')}
          </div>
          <div className="product-image">
            <span>
              {productImage}
            </span>
            <span className="product-price">
              {Constants.currency + ((parseFloat(this.props.product.price).toFixed(2)) || '??')}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="fah-product-wrapper">
        {content}
      </div>
    );
  }
}

export default FahProductCard;
