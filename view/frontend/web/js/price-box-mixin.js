define([
    'jquery'
], ($) => {
    'use strict';

    // Fix for invisible button at product page
    if ($('script[src$="square-marketplace.js"]').length && !window.AfterPay) {
        // Button checks window.AfterPay
        // See Afterpay_Afterpay/js/view/container/express-checkout/button::_getIsVisible
        window.AfterPay = {};

        $.mixin('afterpayExpressCheckoutButton', {
            initAfterpay: function (original) {
                if (window.AfterPay.init && this.countryCode) {
                    return original();
                }

                setTimeout(this.initAfterpay, 500);
            }
        });
    }

    $.mixin('priceBox', {
        updatePrice: function (original, newPrices) {
            const result = original(newPrices);

            if (this.cache.displayPrices?.finalPrice?.formatted &&
                this.element.closest('.product-info-main').length > 0
            ) {
                this.syncPriceWithAfterpay();
            }

            return result;
        },

        syncPriceWithAfterpay: function () {
            require(['Afterpay_Afterpay/js/model/container/container-model-holder'], (containerModelHolder) => {
                const containerModel = containerModelHolder.getModel('afterpay-pdp-container');

                containerModel.setCurrentProductId(this.element.data('productId'));
                containerModel.setPrice(this.cache.displayPrices.finalPrice.amount);
            });
        }
    });
});
