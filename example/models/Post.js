import CSM from '../../index';


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
