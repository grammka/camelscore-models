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



var serialize = require('./csm');

var userConfig = {
  fields: {
    'user_id': {
      to: 'id'
    },
    'user_name': {
      to: 'name'
    },
    'user_avatar': {
      to: 'avatar',
      model: avatarConfig
    },
    'user_posts': {
      to: 'posts',
      model: postConfig
    },
  }
};

var avatarConfig = {
  fields: {
    'preview_url': {
      to: 'url'
    },
    'size': {
      model: sizeConfig
    },
  }
};

var sizeConfig = {
  fields: {
    'min_width': {
      to: 'width'
    },
    'min_height': {
      to: 'height'
    },
  }
};

var postConfig = {
  fields: {
    'post_id': {
      to: 'id'
    },
    'user_id': {
      to: 'userId'
    },
  }
};



var user = serialize.call(userConfig, responseBody);

console.log('user result: ');
console.log(user);
