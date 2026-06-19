/**
 * Standardised API response helpers.
 * Every endpoint returns { success, message, data } for consistency.
 */

function success(res, { message = 'Success', data = null, statusCode = 200 } = {}) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

function created(res, { message = 'Created successfully', data = null } = {}) {
  return success(res, { message, data, statusCode: 201 });
}

function paginated(res, { message = 'Success', data, pagination }) {
  return res.status(200).json({
    success: true,
    message,
    data,
    pagination,
  });
}

module.exports = { success, created, paginated };
