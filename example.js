"use strict";

var responseBody = {
  user_id: 1,
  user_name: "Pavel",
  user_avatar: {
    preview_url: "http://someurl.com/avatar.jpg",
    size: {
      min_width: 100,
      min_height: 100
    }
  },
  user_posts: [
    {
      post_id: 1, // id
      user_id: 1, // userId
      text: "Hey, how are u?",
      created: new Date(),
    },
    {
      post_id: 2,
      user_id: 1,
      text: "Hello! I'm fine",
      created: new Date(),
    },
  ],
};



var CSM = require('./csm');

class User extends CSM {
  constructor(json) {
    super();

    this.config = {
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
        }
      }
    };

    return this.serialize(json);
  }
}

class Avatar extends CSM {
  constructor(json) {
    super();

    this.config = {
      fields: {
        'preview_url': {
          to: 'url'
        },
        'size': {
          model: Size
        }
      }
    };

    return this.serialize(json);
  }
}

class Size extends CSM {
  constructor(json) {
    super();

    this.config = {
      fields: {
        'min_width': {
          to: 'width'
        },
        'min_height': {
          to: 'height'
        }
      }
    };

    return this.serialize(json);
  }
}

class Post extends CSM {
  constructor(json) {
    super();

    this.config = {
      fields: {
        'post_id': {
          to: 'id'
        },
        'user_id': {
          to: 'userId'
        },
      }
    };

    return this.serialize(json);
  }
}



var user = new User(responseBody);

console.log('user result: ');
console.log(user);
