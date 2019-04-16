'use strict';

/**
 * Diary.js controller
 *
 * @description: A set of functions called "actions" for managing `Diary`.
 */

const moment = require('moment');

module.exports = {

  /**
   * Retrieve diary records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.diary.search(ctx.query);
    } else {
      return strapi.services.diary.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a diary record.
   *
   * @return {Object}
   */

  findByDate: async (ctx) => {
    let diary = await strapi.services.diary.fetchAll({
      user: ctx.state.user.id,
      date: moment(ctx.params.date).utcOffset(0).set({hour:0,minute:0,second:0,millisecond:0}).toDate(),
      '_limit': 1
    });
    if (diary.length === 0) {
      return strapi.services.diary.add({
        user: ctx.state.user.id,
        date: moment(ctx.params.date).utcOffset(0).set({hour:0,minute:0,second:0,millisecond:0}).toDate()
      });
    } else {
      return diary.pop();
    }
  },

  /**
   * Count diary records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.diary.count(ctx.query);
  },

  /**
   * Create a/an diary record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.diary.add(ctx.request.body);
  },

  /**
   * Update a/an diary record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.diary.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an diary record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.diary.remove(ctx.params);
  }
};
