/*global FB:false*/
'use strict';

/**
 * @ngdoc service
 * @name SEO-SMO
 * @description para optimizar y social
 * # SEO-SMO
 * Module with services for SEO y SMO
 */
angular.module('SEO-SMO', [])
    .provider('facebookSharer', function FacebookSharerProvider($windowProvider){
        var window = $windowProvider.$get();

        this.setAppId = function(appId){
            window.fbAsyncInit = function() {
                FB.init({
                    appId: appId,
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

        }

        this.$get = [];
    })
    .run(function ($rootScope){
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
    });