import CSM from '../index';
import Avatar from './Avatar'
import Post from './Post'


var User = new CSM({
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
