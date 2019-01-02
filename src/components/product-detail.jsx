import React, { Component } from 'react'
import ImagePlaceholder from '../images/p.gif'
import UnknownImage from '../images/u.png'
import ErrorImage from '../images/e.png'
import Loader from '../images/a.gif'
import LoaderInModal from '../images/a2.gif'
import DataProvider from './data-provider.jsx'
import Constants from './constants.jsx'

class ProductDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false,
      productId: this.props.productId || this.props.match.params.id,
    };
  }

  copy2clipboard() {
    var temp = document.createElement('textarea');

    temp.value = window.location.origin + '/#/list/' + this.state.productId;
    temp.setAttribute('readonly', '');
    temp.style.position = 'absolute';
    temp.style.left = '-9999px';
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    
    this.setState({
      copied: true,
    })
  }

  render() {
    var detailClass = 'row product-detail';

    if (this.props.inModal) {
      detailClass += ' in-modal';
    }

    return (
      <DataProvider productId={this.state.productId}>
        {({ loading, error, data }) => {
          var loader = this.props.inModal ? LoaderInModal : Loader;
          var productDetail = <span></span>;
          var productImage = <span></span>;
          
          if (loading) {
            productImage = <img className="detail-img-placeholer" src={ImagePlaceholder} />;
            productDetail = (
              <div className="detail-content">
                <div className="detail-name-wrapper">
                  <img src={loader} />
                </div>
                <div className="detail-description-wrapper">
                  <img src={loader} />
                </div>
                <div className="detail-price-wrapper">
                  <img src={loader} />
                </div>
              </div>
            );
          }

          if (error) {
            productImage = <img className="detail-img-placeholer" src={ImagePlaceholder} />;
            productDetail = (
              <div className="detail-content">
                <div className="detail-name-wrapper">
                  Error
                </div>
                <div className="detail-description-wrapper">
                  <span>We are sorry, but we were not able to get data back from the server...</span>
                </div>
                <div className="detail-price-wrapper">
                </div>
              </div>
            );
          }

          if (data) {
            var sharableClass = 'sharable-link';

            if (this.state.copied) {
              sharableClass += ' shared';
            }

            productImage = <img className="detail-img-placeholer" src={data.image || UnknownImage} />;
            productDetail = (
              <div className="detail-content">
                <div className="detail-name-wrapper">
                  <div className="product-detail-name-wrapper">
                    <div className="product-detail-name">{data.name || '???'}</div>
                    <div className={sharableClass} onClick={this.copy2clipboard.bind(this)}></div>
                  </div>
                </div>
                <div className="detail-description-wrapper">
                  <div className="detail-description">{data.description || 'No Description'}</div>
                  <div className="nutrition-facts-wrapper">
                    <div className="detail-name-wrapper">
                      Nutrition Facts
                    </div>
                    {data.nutritionFacts.map((nutritionFact, index) => {
                      var fact = <span></span>;

                      if (!nutritionFact.value.value && nutritionFact.value.value !== 0) {
                        fact = <span className="nutrition-fact-per">{nutritionFact.value}</span>;
                      }
                      
                      if (nutritionFact.value.value || nutritionFact.value.value === 0) {
                        fact = (
                          <span>
                            <span>
                              <span>{nutritionFact.value.value}</span>
                              <span>{nutritionFact.value.unit}</span>
                            </span>
                            <span className="nutrition-fact-per">{nutritionFact.value.per}</span>
                          </span>
                        );
                      }

                      return (
                        <div key={index} className="nutrition-fact">
                          <span className="nutrition-fact-name">{nutritionFact.name}</span>
                          <span>
                            {fact}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="detail-price-wrapper">
                  <span ng-if="!vm.isLoading && !vm.error">
                    {Constants + (parseFloat(data.price).toFixed(2) || '??')}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div className={detailClass}>
              <div className="detail-content-wrapper">
                {productDetail}
              </div>
              <div className="detail-image-wrapper">
                {productImage}
              </div>
            </div>
          );
        }}
      </DataProvider>
    );
  }
}

export default ProductDetail;
