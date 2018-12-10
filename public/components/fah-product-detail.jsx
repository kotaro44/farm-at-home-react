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
    var name = <img src={this.state.loaderSrc} />;
    var description = <img src={this.state.loaderSrc} />;
    var price = <img src={this.state.loaderSrc} />;

    /**
     * The initial status of the components is the loading product details status,
     * so in case there is no product yet, we just return the default component
     * otherwise we modify the variables to show the details.
     */
    if (!this.state.isLoading) {
      if (this.state.error) {
        image = <img ng-if="vm.error" src="images/e.png" />;
        name = <span>Error</span>;
        description = <span>We are sorry, but we were not able to get data back from the server...</span>;
        price = <span></span>;
      }
      else {
        name = <span>{this.state.product.name || '???'}</span>;
        description = <span>{this.state.product.description || 'No Description'}</span>;
        price = <span>{Constants.currency + (this.state.product.price.toFixed(2) || '??')}</span>;
        image = <img src={this.state.product.image || 'images/u.png'} />
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
              {name}
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
