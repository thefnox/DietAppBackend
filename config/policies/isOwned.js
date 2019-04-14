'use strict';

/**
 * `isOwned` policy.
 */

module.exports = async (ctx, next) => {
  // Add your own logic here.
  console.log('In isOwned policy.');

  await next();
};
