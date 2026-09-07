import {
  Card,
  Row,
  Col,
  DatePicker,
  Select,
  Input,
  InputNumber,
  Button,
  Space,
  Form,
  Segmented,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTagsState } from '@src/state';
import type { ExpenseStatFilterDto } from '@src/dto';
import dayjs from 'dayjs';
import { useState } from 'react';

const datePreset = [
  {
    label: 'Сьогодні',
    value: 'today',
  },
  {
    label: 'Вчора',
    value: 'yesterday',
  },
  {
    label: 'Цей тиждень',
    value: 'this_week',
  },
  {
    label: 'Останній тиждень',
    value: 'last_week',
  },
  {
    label: 'Останні 7 днів',
    value: 'last_7_days',
  },
  {
    label: 'Цей місяць',
    value: 'this_month',
  },
  {
    label: 'Останній місяць',
    value: 'last_month',
  },
  {
    label: 'Останні 30 днів',
    value: 'last_30_days',
  },
  {
    label: 'Цей рік',
    value: 'this_year',
  },
  {
    label: 'Весь час',
    value: 'all_time',
  },
  {
    label: 'Свій вибір',
    value: 'custom',
  },
];

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

  const [currentRange, $currentRange] = useState<string>('this_month');

  const initialRange: [dayjs.Dayjs, dayjs.Dayjs] = [
    dayjs().utc().startOf('month'),
    dayjs().utc().endOf('month'),
  ];

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
  };

  const handlePresetRange = (value: string) => {
    let fromDateTime = dayjs().utc();
    let toDateTime = dayjs().utc();
    const actions = {
      today: () => {
        fromDateTime = dayjs().utc().startOf('day');
        toDateTime = dayjs().utc().endOf('day');
      },
      yesterday: () => {
        fromDateTime = dayjs().utc().subtract(1, 'day').startOf('day');
        toDateTime = dayjs().utc().subtract(1, 'day').endOf('day');
      },
      this_week: () => {
        fromDateTime = dayjs().utc().startOf('week');
        toDateTime = dayjs().utc().endOf('day');
      },
      last_week: () => {
        fromDateTime = dayjs().utc().subtract(1, 'week').startOf('week');
        toDateTime = dayjs().utc().subtract(1, 'week').endOf('week');
      },
      last_7_days: () => {
        fromDateTime = dayjs().utc().subtract(6, 'day').startOf('day');
        toDateTime = dayjs().utc().endOf('day');
      },
      this_month: () => {
        fromDateTime = dayjs().utc().startOf('month');
        toDateTime = dayjs().utc().endOf('day');
      },
      last_month: () => {
        fromDateTime = dayjs().utc().subtract(1, 'month').startOf('month');
        toDateTime = dayjs().utc().subtract(1, 'month').endOf('month');
      },
      last_30_days: () => {
        fromDateTime = dayjs().utc().subtract(29, 'day').startOf('day');
        toDateTime = dayjs().utc().endOf('day');
      },
      this_year: () => {
        fromDateTime = dayjs().utc().startOf('year');
        toDateTime = dayjs().utc().endOf('day');
      },
      all_time: () => {
        fromDateTime = dayjs('11.02.2025').utc().startOf('day');
        toDateTime = dayjs().utc().endOf('day');
      },
    };
    if (value && actions[value as keyof typeof actions]) {
      actions[value as keyof typeof actions]();
      form.setFieldsValue({ range: [fromDateTime, toDateTime] });
      handleSubmit(form.getFieldsValue());
    }
    $currentRange(value);
  };
  return (
    <Card size="small">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          range: initialRange,
        }}
      >
        <Row gutter={[12, 12]}>
          <Col xs={24}>
            <Space direction="vertical" size={12} style={{ width: '100%' }}>
              <Segmented onChange={handlePresetRange} options={datePreset} value={currentRange} />
              <Form.Item rules={[{ required: true, message: 'Вкажіть дату та час' }]} name="range">
                <DatePicker.RangePicker
                  placeholder={['Від', 'До']}
                  style={{ width: '100%' }}
                  disabled={currentRange !== 'custom'}
                  showTime
                />
              </Form.Item>
            </Space>
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
