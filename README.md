# camelscore-models

CamelScore-Models is a way to (un)serialize server Data.

It helps you to convert `weird` data fields from server to something more `friendly`.

[![Npm Version](https://badge.fury.io/js/camelscore-models.svg)](https://www.npmjs.com/package/camelscore-models)
[![Month Downloads](https://img.shields.io/npm/dm/camelscore-models.svg)](http://npm-stat.com/charts.html?package=camelscore-models)
[![Npm Licence](https://img.shields.io/npm/l/camelscore-models.svg)](https://www.npmjs.com/package/camelscore-models)

[![NPM](https://nodei.co/npm/camelscore-models.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/camelscore-models/)


## Usage

This library was created for using in React application uses Redux as store.
In actions when data is fetching `serialize` method passed to convert income data and `unserialize` method passed to convert outcome data.
There is converted data in store and components.


## Code Example

Below you can see response body example. There are fields that should have other names in App.

```js
var responseBody = {
  user_id: 1,
  user_name: "Pavel",
  user_avatar: {
    preview_url: "http://site.com/avatar.jpg",
    size: {
      min_width: 100,
      min_height: 100
    }
  },
  user_posts: [{
      post_id: 1, // id
      user_id: 1, // userId
      text: "Hey, how are u?",
      created: new Date(),
    }, {
      post_id: 2,
      user_id: 1,
      text: "Hello! I'm fine",
      created: new Date(),
  }],
};
```

To change the name of these fields need to create models and use models serialize / unserialize methods



#### Create Models

#### `User.js`
```js
import CSM from 'camelscore-models'
import Avatar from './Avatar'
import Post from './Post'

const User = new CSM({
  fields: {
    'user_id': {
      to: 'id'
    },
    'user_name': {
      to: 'name'
    },
    'user_avatar': {
      to: 'avatar',
      model: Avatar
    },
    'user_posts': {
      to: 'posts',
      model: Post
    },
  }
});

export default User;
```


#### `Avatar.js`
```js
import CSM from 'camelscore-models'

const Avatar = new CSM({
  fields: {
    size: {
      model: {
        'min_width': {
          to: 'width'
        },
        'min_height': {
          to: 'height'
        },
      }
    },
  }
});


export default Avatar;
```


#### `Post.js`
```js
import CSM from 'camelscore-models'

const Post = new CSM({
  fields: {
    'post_id': {
      to: 'id'
    },
    'user_id': {
      to: 'userId'
    },
  }
});


export default Post;
```



#### Serialize

To convert data fields to friendly way use model's `serialize` method

```js
var serialized = User.serialize(responseBody);
```

returns:

```
{
  id: 1,
  name: 'Pavel',
  avatar: {
    previewUrl: 'http://site.com/avatar.jpg',
    size: {
      minWidth: 100,
      minHeight: 100
    }
  },
  posts: [{
    id: 1,
    userId: 1,
    text: 'Hey, how are u?'
  }, {
    id: 2,
    userId: 1,
    text: 'Hello! I\'m fine'
  }]
}
```



#### Unserialize

to revert data back for passing as body in request use model's `unserialize` method

```js
var unserialized = User.unserialize(serialized)
```

returns:

```
{
  user_id: 1,
  user_name: 'Pavel',
  user_avatar: {
    preview_url: 'http://site.com/avatar.jpg',
    size: {
      min_width: 100,
      min_height: 100
    }
  },
  user_posts: [{
    post_id: 1,
    user_id: 1,
    text: 'Hey, how are u?'
  }, {
    post_id: 2,
    user_id: 1,
    text: 'Hello! I\'m fine'
  }]
}
```
