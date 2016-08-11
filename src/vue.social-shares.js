/**
 * Social shares.
 * Vue Component.
 *
 * @author Alejandro Mostajo <http://about.me/amostajo>
 * @copyright 10Quality <http://www.10quality.com>
 * @license MIT
 * @version 1.0.1
 */
'use strict';

/**
 * Inner component mixin.
 * @since 1.0.0
 * @since 1.0.1 Added different mixin options.
 * @var object
 */
var _sr_mixins = {
    /**
     * Mixin for popup like sharers.
     * @since 1.0.0
     */
    popup: { template: '<a href="#share-{{network}}" @click.prevent="$parent.share(network)"><slot></slot></a>' },
    /**
     * Mixin for direct link sharers.
     * @since 1.0.1
     */
    direct: {
        template: '<a :href="$parent._getSharer(network)" data-action="{{attributes(\'data-action\')}}" @click="$parent.touch(network)"><slot></slot></a>',
        methods:
        {
            /**
             * Returns attribute value by key.
             * @since 1.0.1
             *
             * @param string key Attribute key.
             *
             * @return string
             */
            attributes: function(key)
            {
                return this.attr !== undefined && this.attr[key] !== undefined
                    ? this.attr[key]
                    : undefined;
            },
        }
    },
};

/**
 * Component.
 * @since 1.0.1
 */
Vue.component('social-shares', Vue.extend({
    props:
    {
        /**
         * URL to share.
         * @since 1.0.0
         * @var string
         */
        url:
        {
            type: String,
            default: undefined,
        },
        /**
         * Sharing title, if available by network.
         * @since 1.0.0
         * @var string
         */
        title:
        {
            type: String,
            default: '',
        },
        /**
         * Sharing description, if available by network.
         * @since 1.0.0
         * @var string
         */
        description:
        {
            type: String,
            default: '',
        },
        /**
         * Twitter user.
         * @since 1.0.0
         * @var string
         */
        twitterUser:
        {
            type: String,
            default: '',
        },
        /**
         * Flag that indicates if counts should be retrieved.
         * - NOT WORKING IN CURRENT VERSION
         * @since 1.0.0
         * @var mixed
         */
        withCounts:
        {
            type: [String, Boolean],
            default: false,
        },
        /**
         * Google plus key.
         * @since 1.0.0
         * @var string
         */
        googleKey:
        {
            type: String,
            default: undefined,
        },
    },
    data: function()
    {
        return {
            /**
             * Available sharing networks.
             * @since 1.0.0
             * @since 1.0.1 Added whatsapp
             * @param object
             */
            networks:
            {
                facebook:
                {
                    sharer: 'https://www.facebook.com/sharer/sharer.php?u=@url&summary=@title',
                    stats: 'https://api.facebook.com/method/links.getStats?urls=@url&format=json',
                },
                twitter:
                {
                    sharer: 'https://twitter.com/intent/tweet?url=@url&via=@twitteruser',
                },
                googleplus:
                {
                    sharer: 'https://plus.google.com/share?url=@url',
                    stats: 'https://plusone.google.com/_/+1/fastbutton?url=@url',
                },
                pinterest:
                {
                    sharer: 'https://pinterest.com/pin/create/button/?url=@url&description=@title',
                },
                reddit:
                {
                    sharer: 'http://www.reddit.com/submit?url=@url&title=@title',
                },
                linkedin:
                {
                    sharer: 'https://www.linkedin.com/shareArticle?mini=true&url=@url&title=@title&summary=@description',
                },
                whatsapp:
                {
                    sharer: 'whatsapp://send?text=@url',
                },
            },
            /**
             * Popup settings.
             * @since 1.0.0
             * @param object
             */
            popup:
            {
                status: false,
                resizable: true,
                toolbar: false,
                menubar: false,
                scrollbars: false,
                location: false,
                directories: false,
                width: 626,
                height: 436,
                top: 0,
                left: 0,
                window: undefined,
            },
        };
    },
    methods:
    {
        /**
         * Returns generated sharer url. 
         * @since 1.0.1
         *
         * @param string network Social network key.
         */
        _getSharer: function(network)
        {
            return this.networks[network].sharer.replace(/\@url/g, this.url)
                .replace(/\@title/g, this.title)
                .replace(/\@description/g, this.description)
                .replace(/\@twitteruser/g, this.twitterUser);
        },
        /**
         * Shares URL in specified network.
         * @since 1.0.0
         * @since 1.0.1 _getSharer used.
         *
         * @param string network Social network key.
         */
        share: function(network)
        {
            if (this.url !== undefined)
                this._openSharer(this._getSharer(network));
            this.$dispatch('social_shares_click', network, this.url);
        },
        /**
         * Touches network and dispatches click event.
         * @since 1.0.1
         *
         * @param string network Social network key.
         */
        touch: function(network)
        {
            this.$dispatch('social_shares_click', network, this.url);
        },
        /**
         * Opens sharer popup.
         * @since 1.0.0
         *
         * @param string url Url to share.
         */
        _openSharer: function(url)
        {
            this.popup.window = window.open(
                url,
                'sharer',
                'status=' + (this.popup.status ? 'yes' : 'no') +
                ',height=' + this.popup.height +
                ',width=' + this.popup.width +
                ',resizable=' + (this.popup.resizable ? 'yes' : 'no') +
                ',left=' + this.popup.left +
                ',top=' + this.popup.top +
                ',screenX=' + this.popup.left +
                ',screenY=' + this.popup.top +
                ',toolbar=' + (this.popup.toolbar ? 'yes' : 'no') +
                ',menubar=' + (this.popup.menubar ? 'yes' : 'no') +
                ',scrollbars=' + (this.popup.scrollbars ? 'yes' : 'no') +
                ',location=' + (this.popup.location ? 'yes' : 'no') +
                ',directories=' + (this.popup.directories ? 'yes' : 'no')
            );
        },
    },
    /**
     * Sets default url if non is indicated.
     * @since 1.0.0
     */
    ready: function()
    {
        if (this.url === undefined)
            this.url = window.location.href;
        //Allow for borders.
        this.popup.left = (window.screen.width / 2)
            - ((this.popup.width / 2) + 10);
        //Allow for title and status bars.
        this.popup.top = (window.screen.height / 2)
            - ((this.popup.height / 2) + 50);
    },
    /**
     * Set component aliases for buttons and links.
     * @since 1.0.0
     * @since 1.0.1 Added whatsapp.
     */
    components:
    {
        'facebook': Vue.extend({
            mixins: [_sr_mixins.popup],
            data: function() { return {network: 'facebook'} },
        }),
        'twitter': Vue.extend({
            mixins: [_sr_mixins.popup],
            data: function() { return {network: 'twitter'} },
        }),
        'googleplus': Vue.extend({
            mixins: [_sr_mixins.popup],
            data: function() { return {network: 'googleplus'} },
        }),
        'pinterest': Vue.extend({
            mixins: [_sr_mixins.popup],
            data: function() { return {network: 'pinterest'} },
        }),
        'reddit': Vue.extend({
            mixins: [_sr_mixins.popup],
            data: function() { return {network: 'reddit'} },
        }),
        'linkedin': Vue.extend({
            mixins: [_sr_mixins.popup],
            data: function() { return {network: 'linkedin'} },
        }),
        'whatsapp': Vue.extend({
            mixins: [_sr_mixins.direct],
            data: function() { return {network: 'whatsapp', attr: {'data-action': 'share/whatsapp/share'}} },
        }),
    },
}));

/**
 * Unset mixin.
 * @since 1.0.0
 * @since 1.0.1 Refactored to _sr_mixins.
 */
_sr_mixins = undefined;