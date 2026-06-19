const DashboardService = require('../services/dashboard.service');
const { success } = require('../utils/response');

async function getStats(req, res) {
  const stats = await DashboardService.getStats();
  return success(res, { message: 'Dashboard statistics retrieved', data: stats });
}

module.exports = { getStats };
