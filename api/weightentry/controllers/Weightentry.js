'use strict';

/**
 * Weightentry.js controller
 *
 * @description: A set of functions called "actions" for managing `Weightentry`.
 */

const moment = require("moment");

module.exports = {

  /**
   * Retrieve weightentry records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const entries = await strapi.services.weightentry.fetchAll({ user: ctx.state.user.id });
    return ctx.send(entries);
  },

  /**
   * Retrieve a weightentry record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.weightentry.fetch(ctx.params);
  },

  /**
   * Count weightentry records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.weightentry.count(ctx.query);
  },

  /**
   * Create a/an weightentry record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const body = JSON.parse(ctx.request.body);
    body.user = ctx.state.user.id;
    body.date = moment(body.date).hour(0).minute(0).second(1).toDate();
    await strapi.services.weightentry.add(body);
    let latestWeight = await strapi.services.weightentry.fetchAll({ '_sort': 'date:DESC', '_limit': 1 });
    latestWeight = latestWeight.serialize().pop();
    strapi.log.info(JSON.stringify(latestWeight));
    await strapi.plugins['users-permissions'].services.user.edit({ id: ctx.state.user.id }, { weight: latestWeight.weight });
    return ctx.send({ weight: latestWeight.weight });
  },

  /**
   * Update a/an weightentry record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const entry = await strapi.services.weightentry.fetch(ctx.params);
    const body = JSON.parse(ctx.request.body);
    if (entry) {
      const user = await entry.related('user').fetch();
      if (user.id === ctx.state.user.id) {
        await strapi.services.weightentry.edit(ctx.params, body);
        let latestWeight = await strapi.services.weightentry.fetchAll({ '_sort': 'date:DESC', '_limit': 1 });
        latestWeight = latestWeight.serialize().pop();
        strapi.log.info(JSON.stringify(latestWeight));
        await strapi.plugins['users-permissions'].services.user.edit({ id: ctx.state.user.id }, { weight: latestWeight.weight });
        return ctx.send({ weight: latestWeight.weight });
      } else {
        return ctx.unauthorized();
      }
    }
    return ctx.notFound();
  },

  /**
   * Destroy a/an weightentry record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const entry = await strapi.services.weightentry.fetch(ctx.params);
    if (entry) {
      const user = await entry.related('user').fetch();
      if (user.id === ctx.state.user.id) {
        await strapi.services.weightentry.remove(ctx.params);
        let latestWeight = await strapi.services.weightentry.fetchAll({ '_sort': 'date:DESC', '_limit': 1 });
        latestWeight = latestWeight.serialize().pop();
        strapi.log.info(JSON.stringify(latestWeight.weight));
        await strapi.plugins['users-permissions'].services.user.edit({ id: ctx.state.user.id }, { weight: latestWeight.weight });
        return ctx.send({ weight: latestWeight.weight });
      } else {
        return ctx.unauthorized();
      }
    }
    return ctx.notFound();
  }
};
