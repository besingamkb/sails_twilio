/**
 * Communication.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      sid: {
          required: true,
          type: 'string'
      },
      direction: {
          required: true,
          type: 'integer'
      },
      from: {
          required: true,
          type: 'string'
      },
      to: {
          required: true,
          type: 'string'
      },
      message: {
          required: true,
          type: 'string'
      },
      duration: {
          type: 'string'
      }
  }
};

