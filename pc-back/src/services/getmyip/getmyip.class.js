/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  find (params) {
    //return Promise.resolve([]);
    console.log("FIND: ", params.ip);
    return Promise.resolve({
            ip: params.ip,
            ipdns: params.ipdnsP,
            test2: "find"
             // id, text: `A new message with ID: ${id}!`
    });
   }

  get (id, params) {
    console.log("GET: ", params.ip);
    return Promise.resolve({
            ip: params.ip,
            test2: "test"
             // id, text: `A new message with ID: ${id}!`
    });
  }

  create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current)));
    }

    return Promise.resolve(data);
  }

  update (id, data, params) {
    return Promise.resolve(data);
  }

  patch (id, data, params) {
    return Promise.resolve(data);
  }

  remove (id, params) {
    return Promise.resolve({ id });
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
