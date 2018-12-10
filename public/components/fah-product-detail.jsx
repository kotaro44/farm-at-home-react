'use strict';

class FahProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.goToProductList = this.goToProductList.bind(this);
    this.loadData = this.loadData.bind(this);

    this.state = {
      isLoading: true,
      loaderSrc: 'images/a' + (this.props.inModal ? '2': '') + '.gif',
      error: false,
    };

    this.loadData();
  }

  loadData() {
    DataProvider.getProduct(this.props.productId).then((product) => {
      this.setState({
        product: product,
        isLoading: false,
      });
    }).catch(() => {
      this.setState({
        error: true,
        isLoading: false,
      });
    });
  }

  goToProductList() {
    window.location.href = '#/list';
  }

  render() {
    var wrapperClass = 'row product-detail';
    var image = <img className="detail-img-placeholer" src="images/p.gif" />;
    var imageContent = <span></span>;
    var productName = <img src={this.state.loaderSrc} />;
    var description = <img src={this.state.loaderSrc} />;
    var price = <img src={this.state.loaderSrc} />;

    if (!this.state.isLoading) {
      if (this.state.error) {
        image = <img ng-if="vm.error" src="images/e.png" />;
        productName = <span>Error</span>;
        description = <span>We are sorry, but we were not able to get data back from the server...</span>;
        price = <span></span>;
      }
      else {
        productName = <span>{this.state.product.name || '???'}</span>;
        description = <span>{this.state.product.description || 'No Description'}</span>;
        price = <span>{Constants.currency + (this.state.product.price.toFixed(2) || '??')}</span>;

        if (this.state.product.image) {
          image = <img src={this.state.product.image} />
        }
        else {
          image = <img src="images/u.png" />;
        }
      }
    }

    if (this.props.inModal) {
      wrapperClass += ' in-modal';
    }

    return (
      <div className={wrapperClass}>
        <div className="detail-image-wrapper">
          {image}
        </div>
        <div className="detail-content-wrapper">
          <div className="detail-content">
            <div className="detail-name-wrapper">
              {productName}
            </div>
            <div className="detail-description-wrapper">
              {description}
            </div>
            <div className="detail-price-wrapper">
              {price}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
