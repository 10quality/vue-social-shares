# Social Shares Component (for [Vue](http://vuejs.org/))

[![GitHub version](https://badge.fury.io/gh/10quality%2Fvue-social-shares.svg)](https://badge.fury.io/gh/10quality%2Fvue-social-shares)
[![Bower version](https://badge.fury.io/bo/vue-social-shares.svg)](https://badge.fury.io/bo/vue-social-shares)

Social network sharing component for [Vue Js](http://vuejs.org/).

[Demo](http://codepen.io/amostajo/pen/ZOKyYR)

## Package index
- [Installation](#installation)
- [Usage](#usage)
    - [Props](#props)
    - [Custom binding](#custom-binding)
    - [Events](#event)
- [Networks supported](#networks-supported)
- [License](#license)

## Installation

Several installation options are available:

- [Download the latest release](https://github.com/10quality/vue-social-shares/releases).
- Install with [Bower](http://bower.io): `bower install vue-social-shares`.

## Usage

Add the following resources for the component to function correctly.

```html
<!-- Required Javascript -->
<script src="vue.js"></script>
<script src="[component path]/dist/vue.social-shares.min.js"></script>
```

Add the component in your vue view.

```html
<!-- Assuming your view app is APP. -->
<body id="app">

    <social-shares inline-template>
        <facebook>
            Share in facebook
        </facebook>
    </social-shares>

</body>
```

### Props

List of available props to use in component:

Prop           | Data Type  | Default   | Description
-------------- | ---------- | --------- | -----------
`url`          | String     | current   | URL to share.
`title`        | String     |           | Sharing title (if available).
`description`  | String     |           | Sharing description (if available).
`twitter-user` | String     |           | Twitter user (Only for twitter).

Usage example:

```html
<body id="app">

    <social-shares inline-template
        :url.sync="url"
        twitter-user="10quality"
    >

        <facebook>
            <i class="fa fa-facebook"></i>
        </facebook>

        <twitter>
            <i class="fa fa-twitter"></i>
        </twitter>

    </social-shares>

</body>
```

```javascript
new Vue({
    el: '#app',
    data: {url:undefined}, 
});
```

### Custom binding

Instead of using child components to enable share functionality:

```html
<body id="app">

    <social-shares inline-template>
        <facebook>
            Share in facebook
        </facebook>
    </social-shares>

</body>
```

Click event binding can be applied instead, using component method `share`:

```html
<body id="app">

    <social-shares inline-template>
        <a title="Share in facebook"
            @click="share('facebook')"
        >
            Share in facebook
        </a>
    </social-shares>

</body>
```

### Events

List of available events to use in component:

Event                 | Passes                                          | Description
--------------------- | ----------------------------------------------- | -----------
`social_shares_click` | `network`: Selected network. `url`: shared url. | Triggered when a share network is clicked.

Usage example:

```javascript
new Vue({
    el: '#app',
    events: {
        'social_shares_click': function(network, url) {
            // TODO my code here
        }
    }, 
});
```

### Networks supported

List of available networks to use in component:

Network        | Child component or key
-------------- | -----------------------
Facebook       | `facebook`
Twitter        | `twitter`
Google +       | `googleplus`
Pinterest      | `pinterest`
Reddit         | `reddit`
LinkedIn       | `linkedin`

## License

Copyright (c) 2016 [10Quality](http://www.10quality.com/). Under MIT License.