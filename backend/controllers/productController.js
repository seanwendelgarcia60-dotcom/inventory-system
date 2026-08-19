const { sql, poolPromise } = require('../config/db');

// GET all products
exports.getAll = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Products ORDER BY id DESC');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one product by id
exports.getById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('SELECT * FROM Products WHERE id = @id');

    if (!result.recordset[0]) return res.status(404).json({ message: 'Product not found' });
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE a product
exports.create = async (req, res) => {
  try {
    const { name, sku, category, quantity, price } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('name', sql.NVarChar, name)
      .input('sku', sql.NVarChar, sku)
      .input('category', sql.NVarChar, category)
      .input('quantity', sql.Int, quantity)
      .input('price', sql.Decimal(10, 2), price)
      .query(`INSERT INTO Products (name, sku, category, quantity, price)
              VALUES (@name, @sku, @category, @quantity, @price)`);

    res.status(201).json({ message: 'Product created successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE a product
exports.update = async (req, res) => {
  try {
    const { name, sku, category, quantity, price } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('name', sql.NVarChar, name)
      .input('sku', sql.NVarChar, sku)
      .input('category', sql.NVarChar, category)
      .input('quantity', sql.Int, quantity)
      .input('price', sql.Decimal(10, 2), price)
      .query(`UPDATE Products
              SET name=@name, sku=@sku, category=@category,
                  quantity=@quantity, price=@price, updated_at=GETDATE()
              WHERE id=@id`);

    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE a product
exports.remove = async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM Products WHERE id = @id');

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};