"use strict";

import User from './models/User';


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
  user_posts: [
    {
      post_id: 1, // id
      user_id: 1, // userId
      text: "Hey, how are u?"
    },
    {
      post_id: 2,
      user_id: 1,
      text: "Hello! I'm fine"
    },
  ],
};

var serialized = User.serialize(responseBody);
var unserialized = User.unserialize(serialized);


console.log('Serialized:\n');
console.log(serialized);
console.log(`\n`);
console.log('Unserialized:\n');
console.log(unserialized);
