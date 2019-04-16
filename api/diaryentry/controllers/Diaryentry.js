'use strict';

/**
 * Diaryentry.js controller
 *
 * @description: A set of functions called "actions" for managing `Diaryentry`.
 */

module.exports = {

  /**
   * Retrieve diaryentry records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.diaryentry.search(ctx.query);
    } else {
      return strapi.services.diaryentry.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a diaryentry record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.diaryentry.fetch(ctx.params);
  },

  /**
   * Count diaryentry records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.diaryentry.count(ctx.query);
  },

  /**
   * Create a/an diaryentry record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.diaryentry.add(ctx.request.body);
  },

  /**
   * Update a/an diaryentry record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const entry = await strapi.services.diaryentry.fetch(ctx.params);
    const body = JSON.parse(ctx.request.body);
    if (entry) {
      const user = await entry.related('user').fetch();
      if (user.id === ctx.state.user.id) {
        return strapi.services.diaryentry.edit(ctx.params, body) ;
      } else {
        return ctx.unauthorized();
      }
    }
    return ctx.notFound();
  },

  /**
   * Destroy a/an diaryentry record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const entry = await strapi.services.diaryentry.fetch(ctx.params);
    if (entry) {
      const user = await entry.related('user').fetch();
      if(user.id === ctx.state.user.id) {
        return strapi.services.diaryentry.remove(ctx.params);
      } else {
        return ctx.unauthorized();
      }
    }
    return ctx.notFound();
  }
};
