define([
    'jquery'
], ($) => {
    'use strict';

    $.mixin('configurable', {
        _configureElement: function (original, element) {
            const result = original(element);

            if (this.simpleProduct) {
                this.syncProductWithAfterpay();
            }

            return result;
        },

        syncProductWithAfterpay: function () {
            require(['Afterpay_Afterpay/js/model/container/container-model-holder'], (containerModelHolder) => {
                const containerModel = containerModelHolder.getModel('afterpay-pdp-container');

                containerModel.setCurrentProductId(this.simpleProduct);
            });
        }
    });
});
