var onlineShop = onlineShop || {};

/**
 * Provides some useful functions.
 *
 * @author Antoine Beland <antoine.beland@polymtl.ca>
 * @author Konstantinos Lambrou-Latreille <konstantinos.lambrou-latreille@polymtl.ca>
 */
onlineShop.utils = {

  /**
   * Formats the specified number as a price.
   *
   * @param price         The price to format.
   * @returns {string}    The price formatted.
   */
  formatPrice: price => price.toFixed(2).replace(".", ",") + "&thinsp;$",

  getUrlParameter: name => {
  	const results = new RegExp("[\?&]" + name + "=([^&#]*)").exec(window.location.href);
  	return results[1] || 0;
  },

  pad: (number, width, symbol) => {
    symbol = symbol || '0';
    number = number + '';
    return number.length >= width ? number : new Array(width - number.length + 1).join(symbol) + number;
  }
};
