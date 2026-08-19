import { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Table, Layout, Typography, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

const { Header, Content } = Layout;
const { Title } = Typography;

export default function Report() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axiosClient.get('/reports/summary')
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Title level={4} style={{ color: 'white', margin: 0 }}>Inventory Report</Title>
        <Space>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </Space>
      </Header>
      <Content style={{ padding: 24 }}>
        {data && (
          <>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <Statistic title="Total Products" value={data.summary.totalProducts} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Total Stock (units)" value={data.summary.totalStock} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="Total Stock Value"
                    value={data.summary.totalStockValue}
                    precision={2}
                    prefix="$"
                  />
                </Card>
              </Col>
            </Row>

            <Title level={5} style={{ marginTop: 32 }}>Low Stock Items (5 or fewer units)</Title>
            <Table
              rowKey="id"
              loading={loading}
              dataSource={data.lowStock}
              columns={[
                { title: 'Name', dataIndex: 'name' },
                { title: 'SKU', dataIndex: 'sku' },
                { title: 'Quantity', dataIndex: 'quantity' }
              ]}
              locale={{ emptyText: 'No low stock items 🎉' }}
            />
          </>
        )}
      </Content>
    </Layout>
  );
}