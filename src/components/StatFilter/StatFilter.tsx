import { Card, Row, Col, DatePicker, Select, Input, InputNumber, Button, Space, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTagsState } from '@src/state';
import type { ExpenseStatFilterDto } from '@src/dto';
import dayjs from 'dayjs';
import { useEffect } from 'react';

interface StatFilterProps {
  onApply: (values: ExpenseStatFilterDto) => void;
}

interface StatFilterForm {
  range: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  search: string;
  tagIds: string[];
  amountFrom: number;
  amountTo: number;
}

const StatFilter = ({ onApply }: StatFilterProps) => {
  const { tags } = useTagsState();
  const [form] = Form.useForm();

  const fromDateTime = dayjs().utc().startOf('month');
  const toDateTime = dayjs().utc().endOf('month');

  useEffect(() => {
    form.setFieldsValue({
      range: [fromDateTime, toDateTime],
    });
  }, [form, fromDateTime, toDateTime]);

  const handleSubmit = (values: StatFilterForm) => {
    const data = {
      fromDateTime: values.range[0]!.toISOString(),
      toDateTime: values.range[1]!.toISOString(),
      tagIds: values.tagIds,
      search: values.search || undefined,
      amountFrom: values.amountFrom,
      amountTo: values.amountTo,
    };
    console.log('submit', data);
    onApply(data);
  };

  const resetFilters = () => {
    form.resetFields();
    form.setFieldsValue({ range: [fromDateTime, toDateTime] });
  };

  return (
    <Card size="small">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Form.Item rules={[{ required: true, message: 'Вкажіть дату та час' }]} name="range">
              <DatePicker.RangePicker
                placeholder={['Від', 'До']}
                style={{ width: '100%' }}
                showTime
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item name="search">
              <Input allowClear prefix={<SearchOutlined />} placeholder="Пошук" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Form.Item name="tagIds">
              <Select
                mode="multiple"
                allowClear
                placeholder="Теги"
                style={{ width: '100%' }}
                options={tags.map((t) => ({ label: t.name, value: t.id }))}
              />
            </Form.Item>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Item name="amountFrom">
              <InputNumber style={{ width: '100%' }} placeholder="Сума від" min={0} />
            </Form.Item>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <Form.Item name="amountTo">
              <InputNumber style={{ width: '100%' }} placeholder="Сума до" min={0} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={6}>
            <Space>
              <Button type="primary" onClick={() => form.submit()}>
                Застосувати
              </Button>
              <Button onClick={resetFilters}>Скинути</Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default StatFilter;
