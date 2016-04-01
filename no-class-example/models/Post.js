import CSM from '../csm';


var Post = new CSM({
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
