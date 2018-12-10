'use strict';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.goToProductDetail = this.goToProductDetail.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.loadData = this.loadData.bind(this);

    this.state = {
      isLoading: true,
      productId: null,
      isDetailVisible: false,
      placeholders: (new Array(12)).join('|').split('|'), //this generates an array of X empty strings
    };

    this.loadData();
  }

  loadData() {
    DataProvider.getProducts().then((products) => {
      this.setState({
        products: products,
        isLoading: false,
      });
    }).catch(() => {
      this.setState({
        error: true,
        isLoading: false,
      });
    });
  }

  goToProductDetail(productId) {
    if (!productId) {
      return;
    }

    /**
     * When we are checking the website from a mobile device, the product detail will be shown in another view
     * otherwise we will open the modal with its details.
     */
    if (window.Device.isMobile) {
      window.location.href = '#/list/' + productId;
    }
    else {
      this.setState({
        productId: productId,
      });
    }
  };

  closeModal() {
    this.setState({
      productId: null,
    });
  };

  render() {
    var errorMsg = <span></span>;
    var modal = <span></span>;
    var content = (
      <div className="row product-list-wrapper">
        {this.state.placeholders.map((element, index) => {
          return (
            <span key={index} className="column product-placeholder">
              <FahProductCard />
            </span>
          );
        })}
      </div>
    );

    if (!this.state.isLoading) {
      /**
       * this message will appears if there was an error getting the data from the DataProvider
       */
      if (this.state.error) {
        errorMsg = (
          <div className="error-wrapper">
            <img src="images/e.png" />
            <div>We are so sorry, but there was an error trying to load the products...</div>
          </div>
        );
      }
      else {
        content = (
          <div className="row product-list-wrapper">
            {this.state.products.map((product, index) => {
              var wrapperClass = 'column product-wrapper';

              if (product.product_id) {
                wrapperClass += ' have-product-id';
              }

              return (
                <span key={index} className={wrapperClass}>
                  <FahProductCard product={product} onClick={this.goToProductDetail} />
                </span>
              )
            })}
          </div>
        );

        /**
         * this message will appears if the DataProvider return 0 items but there was no any error
         */
        if (this.state.products && this.state.products.length === 0) {
          errorMsg = (
            <div className="error-wrapper">
              <img src="images/e.png" />
              <div>We are so sorry, but seems there are no available products for now.</div>
            </div>
          );
        }
      }

      /**
       * When there is a productId we have to show the Modal with its details
       */
      if (this.state.productId) {
        modal = (
          <div className="modal-wrapper">
            <div className="modal-content-wrapper">
              <div className="close-btn" onClick={this.closeModal}>X</div>
              <div className="modal-content">
                <FahProductDetail productId={this.state.productId} inModal={true} />
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="product-list-wrapper">
        {content}
        {errorMsg}
        {modal}
      </div>
    );
  }
};
