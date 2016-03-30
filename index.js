/*

/users/1 GET Response:

{
  user_id: 1,
  user_name: "Pasha",
  user_design: {
    avatar: {
      user_id: 1,
      url: "http://img.com/pasha.jpg",
      min_width: 100,
      mih_height: 100
    }
  }
}

Module transform:

user_id                   =>  id
user_name                 =>  name
user_design               =>  design
{design.avatar}.user_id   =>  userId
min_width                 =>  minWidth
min_height                =>  minHeight

{
  id: 1,
  name: "Pasha",
  design: {
    avatar: {
      userId: 1,
      url: "http://image.url",
      minWidth: 100,
      mihHeight: 100
    }
  }
}

*/


/*

/users/1 PATCH Request body:

{
  id: 1,
  name: "Vanya",
  design: {
    avatar: {
      userId: 1,
      url: "http://img.com/vanya.jpg",
      minWidth: 200,
      minHeight: 200
    }
  }
}

Module transform:

id                =>  user_id
name              =>  user_name
design            =>  user_design
userId            =>  user_id
minWidth          =>  min_width
minHeight         =>  min_height

{
  user_id: 1,
  user_name: "Vanya",
  user_design: {
    avatar: {
      user_id: 1,
      url: "http://img.com/vanya.jpg",
      min_width: 200,
      min_height: 200
    }
  }
}

*/

var model = {
  camel: {
    'user_id': 'id',
    'user_name': 'name',
    'user_design': 'design',
    'user_design.avatar.user_id': 'userId',
    'user_design.avatar.min_width': 'minWidth',
    'user_design.avatar.min_height': 'minHeight',
    'items.item_id': 'id',
    'items.item_name': 'name',
  },
  under: {
    'id': 'user_id',
    'name': 'user_name',
    'design': 'user_design',
    'design.avatar.userId': 'user_id',
    'design.avatar.minWidth': 'min_width',
    'design.avatar.minHeight': 'min_height',
    'items.id': 'item_id',
    'items.name': 'item_name',
  }
};

var under = {
  user_id: 1,
  user_name: "Vanya",
  user_design: {
    avatar: {
      user_id: 1,
      url: "http://img.com/vanya.jpg",
      min_width: 200,
      min_height: 200
    }
  },
  items: [
    {
      item_id: 1,
      item_name: 'Banana'
    },
    {
      item_id: 2,
      item_name: 'Apple'
    }
  ]
};

var camel = {
  id: 1,
  name: "Vanya",
  design: {
    avatar: {
      userId: 1,
      url: "http://img.com/vanya.jpg",
      minWidth: 200,
      minHeight: 200
    }
  },
  items: [
    {
      id: 1,
      name: 'Banana'
    },
    {
      id: 2,
      name: 'Apple'
    }
  ]
};

/**
 *
 * @param {object} data
 * @param {string} type - 'toCamel' or 'toUnder'
 */
function convert(data, type) {
  let serializer = model[type];

  function iterate(obj, keyChunk) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (obj == null || typeof obj != "object") {
      return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (var i = 0, len = obj.length; i < len; i++) {
        let keyChain = keyChunk || '';
        copy[i] = iterate(obj[i], keyChain);
      }
      return copy;
    }

    if (obj instanceof Object) {
      copy = {};
      for (let key in obj) {
        let keyChain = keyChunk || '';

        if (obj.hasOwnProperty(key)) {
          keyChain += (keyChain ? '.' : '') + key;
          let newKey = serializer[keyChain] || key;
          copy[newKey] = iterate(obj[key], keyChain);
        }
      }
      return copy;
    }
  }

  return iterate(data);
}






exports = module.exports = {

};
