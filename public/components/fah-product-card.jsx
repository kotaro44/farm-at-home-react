'use strict';

class FahProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(this.props.product.product_id);
  }

  render() {
    var productImg = <img src="images/u.png" />;
    var product = (
      <div className="box-shadow product-content">
        <div className="product-name">
          <img src="images/a.gif" />
        </div>
        <div className="product-image product-placeholder">
          <img src="images/p.gif" />
        </div>
      </div>
    );

    /**
     * The initial status of the components is the loading product status,
     * so in case there is no product yet, we just return the default component
     * otherwise we modify the variables to show the details.
     */
    if (this.props.product) {
      if (this.props.product.image) {
        productImg = <img src={this.props.product.image} />;
      }

      product = (
        <div className="box-shadow product-content" onClick={this.handleClick}>
          <div className="product-name">
            {this.props.product.name || '???'}
          </div>
          <div className="product-image">
            <span>
              {productImg}
            </span>
            <span className="product-price">
              {Constants.currency + (this.props.product.price || '???')}
            </span>
          </div>
        </div>
      );
    }

    return (
      <div className="fah-product-wrapper">
        {product}
      </div>
    );
  }
};




