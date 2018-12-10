'use strict';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="product-detail-wrapper">
        <FahProductDetail productId={this.props.param} />
      </div>
    );
  }
};
