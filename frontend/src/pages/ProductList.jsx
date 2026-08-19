import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, message, Popconfirm, Layout, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get('/products');
      setProducts(res.data);
    } catch (err) {
      message.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (record = null) => {
    setEditing(record);
    form.setFieldsValue(
      record || { name: '', sku: '', category: '', quantity: 0, price: 0 }
    );
    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editing) {
        await axiosClient.put(`/products/${editing.id}`, values);
        message.success('Product updated');
      } else {
        await axiosClient.post('/products', values);
        message.success('Product created');
      }
      setOpen(false);
      fetchProducts();
    } catch (err) {
      message.error('Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosClient.delete(`/products/${id}`);
      message.success('Product deleted');
      fetchProducts();
    } catch (err) {
      message.error('Failed to delete');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const columns = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'SKU', dataIndex: 'sku' },
    { title: 'Category', dataIndex: 'category' },
    { title: 'Quantity', dataIndex: 'quantity' },
    { title: 'Price', dataIndex: 'price', render: (val) => `$${Number(val).toFixed(2)}` },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button onClick={() => openModal(record)}>Edit</Button>
          <Popconfirm title="Delete this product?" onConfirm={() => handleDelete(record.id)}>
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Title level={4} style={{ color: 'white', margin: 0 }}>Inventory System</Title>
        <Space>
          <Button onClick={() => navigate('/report')}>Report</Button>
          <Button onClick={handleLogout}>Logout</Button>
        </Space>
      </Header>
      <Content style={{ padding: 24 }}>
        <Button type="primary" onClick={() => openModal()} style={{ marginBottom: 16 }}>
          Add Product
        </Button>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={products}
          loading={loading}
        />
        <Modal
          open={open}
          title={editing ? 'Edit Product' : 'New Product'}
          onCancel={() => setOpen(false)}
          onOk={handleSubmit}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="category" label="Category">
              <Input />
            </Form.Item>
            <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
            </Form.Item>
          </Form>
        </Modal>
      </Content>
    </Layout>
  );
}