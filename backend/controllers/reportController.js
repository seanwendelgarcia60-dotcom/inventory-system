const { poolPromise } = require('../config/db');

exports.summary = async (req, res) => {
  try {
    const pool = await poolPromise;

    const totals = await pool.request().query(`
      SELECT
        COUNT(*) AS totalProducts,
        ISNULL(SUM(quantity), 0) AS totalStock,
        ISNULL(SUM(quantity * price), 0) AS totalStockValue
      FROM Products
    `);

    const lowStock = await pool.request().query(`
      SELECT id, name, sku, quantity
      FROM Products
      WHERE quantity <= 5
      ORDER BY quantity ASC
    `);

    res.json({
      summary: totals.recordset[0],
      lowStock: lowStock.recordset
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
