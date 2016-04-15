import CSM from '../index';


var Avatar = new CSM({
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
