import React, { Component } from 'react'
import ErrorImage from '../images/e.png'
import FahProductCard from './fah-product-card.jsx'
import DataProvider from './data-provider.jsx'
import ProductDetail from './product-detail.jsx'

class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      productId: null,
      placeholders: (new Array(12)).join('.').split('.'),
    };
  }

  searchChanged(event) {
    this.setState({
      search: event.target.value,
    });
  }

  closeModal() {
    this.setState({
      productId: null,
    });
  }

  productClick(product) {
    this.setState({
      productId: product.productId,
    });
  }

  render() {
    var content = <span></span>;
    var modal = <span></span>;

    return (
      <DataProvider>
        {({ loading, error, data }) => {
          if (loading) {
            content = (
              <div className="row product-list">
                {this.state.placeholders.map((product, index) => {
                  return (
                    <span key={index} className="column product-placeholder">
                      <FahProductCard />
                    </span>
                  );
                })}
              </div>
            );
          }

          if (error) {
            content = (
              <div className="error-wrapper">
                <img src={ErrorImage} />
                <div>We are so sorry, but there was an error trying to load the products...</div>
              </div>
            );
          }

          if (data) {
            var filteredProducts = data.filter(product => {
              return product.name.match(this.state.search);
            });

            if (filteredProducts.length) {
              content = (
                <div className="row product-list">
                  {filteredProducts.map((product, index) => {
                    var productClass = 'column product-wrapper';

                    if (product.productId) {
                      productClass += ' have-product-id';
                    }

                    return (
                      <span key={index} className={productClass}>
                        <FahProductCard product={product} productClick={this.productClick.bind(this, product)}/>
                      </span>
                    );
                  })}
                </div>
              );
            }
            else {
              content = (
                <div className="error-wrapper">
                  <div>No products found!</div>
                </div>
              );
            }

            if (this.state.productId) {
              modal = (
                <div className="modal-wrapper">
                  <div className="modal-content-wrapper">
                    <div className="close-btn" onClick={this.closeModal.bind(this)}>X</div>
                    <div className="modal-content">
                      <ProductDetail inModal={true} productId={this.state.productId} />
                    </div>
                  </div>
                </div>
              );
            }
          }

          return (
            <div className="product-list-wrapper">
              <input 
                className="search-input" 
                type="text" 
                placeholder="Search by name..." 
                value={this.state.search} 
                onChange={this.searchChanged.bind(this)} 
                />
                {content}
                {modal}
            </div>
          );
        }}
      </DataProvider>
    );
  }
}

export default ProductList;
