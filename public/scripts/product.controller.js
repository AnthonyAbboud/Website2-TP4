var onlineShop = onlineShop || {};

/**
 * Controls the "product" view.
 *
 */
(($, productsService, utils) => {
  "use strict";

  /**
   * Updates the product view.
   *
   * @param products    The products list to render.
   * @private
   */
  function _updateView(product) {
    $("#product-name").text(product.name);
    $("#product-desc").html(product["description"]);
    $("#product-price").html(utils.formatPrice(product.price));
    $("#product-image").attr("src", "./assets/img/" + product.image);
    $("#product-features").append(product["features"].map(feature => $("<li>" + feature + "</li>")));
    $("#add-to-cart-form").attr("data-product-id", product-id);
  }
  
  const productId = +utils.getUrlParameter("id");
  productsService.getProduct(productId).done(product => {
    if(product){
      _updateView(product);
    } else {
      $("article").html('<h1>Page non trouvée!</h1>');
    }
  });

})(jQuery, onlineShop.productsService, onlineShop.utils);
