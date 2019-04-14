'use strict';

/**
 * Food.js controller
 *
 * @description: A set of functions called "actions" for managing `Food`.
 */

module.exports = {

  /**
   * Retrieve food records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.food.search(ctx.query);
    } else {
      return strapi.services.food.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a food record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.food.fetch(ctx.params);
  },

  /**
   * Count food records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.food.count(ctx.query);
  },

  /**
   * Create a/an food record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.food.add(ctx.request.body);
  },

  /**
   * Update a/an food record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.food.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an food record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.food.remove(ctx.params);
  }
};
