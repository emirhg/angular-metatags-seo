/*global FB:false*/
'use strict';

/**
 * @ngdoc service
 * @name SEO
 * @description Search Engine Optimization Metatags setter
 * # SEO-SMO
 * Module with services for SEO y SMO
 */
angular.module('SEO', [])
.service('metatags', function(){

        var defaultTitle = '';
        var defaultDescription = '';

        var setMetatag = function(name, value){
            var meta = $('meta');
            switch (name){
                case 'description':
                    meta = $('meta[name="description"]')
                    break;
                default:
                    meta = $('meta[property="' + name+'"]')
                    if (meta.length==0){
                        meta = $('<meta property="'+name+'"></meta>').appendTo('head');
                    }
                    break;
            }
            meta.attr('content',value);
        };

        var setTitle = function(title){
            if (typeof title!== 'undefined'){
                $('title').text(title);
            }else{
                $('title').text(defaultTitle);
            }
        }

        var setMetadata = function(metadata){
            if (typeof metadata==='object'){
                for (var key in metadata){
                    switch(key){
                        case 'title':
                            setTitle(metadata[key]);
                            break;
                        default:
                            setMetatag(key, metadata[key]);
                            break;
                    }
                }
            }
        }

        var setDefaultTitle = function (title){
            if (typeof title !== 'undefined'){
                defaultTitle = title;
            }else{
                setTitle(defaultTitle);
            }
        }

        var setDefaultDescription = function (description){
            if (typeof description !== 'undefined'){
                defaultDescription = description;
            }else{
                setMetatag('description', defaultDescription);
            }
        }



        return {
            setMetatag:setMetatag,
            setTitle: setTitle,
            setDefaultTitle: setDefaultTitle,
            setDefaultDescription: setDefaultDescription,
            setMetadata: setMetadata,
        }

    })
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
    .service('socialShare', function (){
        var tweet = {}
        var shareLink = '';

        return {
            tweet: tweet,
            setTweet: function(tweet){
                this.tweet = tweet;
            },

            shareLink: shareLink
        };

    })
    .run(function (metatags, $rootScope, socialShare){

        metatags.setDefaultTitle($('title').text(););
        metatags.setDefaultDescription($('meta[name="description"]').attr('content'));
        $rootScope.$on('$routeChangeStart', function() {
            metatags.setDefaultTitle();
            metatags.setDefaultDescription();
        });


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

        $rootScope.tweet = function (tweet){
            var text= "";
            if (typeof tweet ==='undefined'){
                tweet= socialShare.tweet;
            }
            if (typeof tweet === 'object'){
                for(var key in tweet){
                    text = text + "&"+key+"="+encodeURIComponent(tweet[key]);
                }
            }else if (typeof tweet === 'string'){
                text = "text="+encodeURIComponent(tweet);
            }
            window.open("https://twitter.com/share?"+ text, "_blank");

        }
    });