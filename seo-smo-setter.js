/*global FB:false*/
'use strict';

/**
 * @ngdoc service
 * @name indicesApp.seo
 * @description para optimizar y social
 * # seo
 * Service in the indicesApp.
 */
angular.module('SEO-SMO')
    .service('seo', function seo($rootScope) {
        // AngularJS will instantiate a singleton by calling "new" on this function

        /** Facebook SDK */
        window.fbAsyncInit = function() {
            FB.init({
                appId: '141448832714787',
                xfbml: true,
                version: 'v2.0'
            });
        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        $rootScope.fbShare = function(href) {

            if (typeof href === 'undefined') {
                href = location.href;
            }
            FB.ui({
                method: 'share',
                display: 'popup',
                href: href
            }, function() {});
        };
        /** End of Facebook SDK **/
    });
