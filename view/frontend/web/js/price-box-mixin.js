define([
    'jquery'
], ($) => {
    'use strict';

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
