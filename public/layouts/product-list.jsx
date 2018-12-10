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
      placeholders: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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
    var content = <span></span>;
    var errorMsg = <span></span>;
    var modal = <span></span>;

    if (!this.state.error) {
      if (this.state.isLoading) {
        content = (
          <div className="row product-list-wrapper">
            {this.state.placeholders.map((index) => {
              return (
                <span key={index} className="column product-placeholder">
                  <FahProductCard />
                </span>
              )
            })}
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
      }
    }

    if (!this.state.isLoading && this.state.error) {
      errorMsg = (
        <div className="error-wrapper">
          <img src="images/e.png" />
          <div>We are so sorry, but there was an error trying to load the products...</div>
        </div>
      );
    }

    if (!this.state.isLoading && this.state.products && this.state.products.length === 0) {
      errorMsg = (
        <div className="error-wrapper">
          <img src="images/e.png" />
          <div>We are so sorry, but seems there are no available products for now.</div>
        </div>
      );
    }

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

    return (
      <div className="product-list-wrapper">
        {content}
        {errorMsg}
        {modal}
      </div>
    );
  }
};
