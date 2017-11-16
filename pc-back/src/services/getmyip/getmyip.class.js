/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  find (params) {
    //return Promise.resolve([]);
    console.log("FIND: ", params.ip, params.ipdnsP);
    return Promise.all( [params.ipdnsP, Promise.resolve( {ip: params.ip.substring(7) }) ] );
   }

  get (id, params) {
    console.log("GET: ", params.ip);
    return Promise.all( [params.ipdnsP, Promise.resolve( {ip: params.ip.substring(7) }) ] );
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
