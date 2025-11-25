import { DatePicker, Form, Input, Modal, Select } from 'antd';
import { useEffect } from 'react';
import { map } from 'lodash';
import { roundTo15Minutes } from '@src/utils/roundTo15Minutes';
import { createExpense, updateExpense } from '@src/services';
import type { UpsertExpenseDto } from '@src/dto';
import type { Expense, Tag } from '@src/types';
import dayjs from 'dayjs';

interface UpsertExpenseModalProps {
  expenseToEdit: Expense | null;
  handleRefresh: () => void;
  handleClose: () => void;
  tagId?: string | null;
  isOpen: boolean;
  tags: Tag[];
}

const UpsertExpenseModal = ({
  expenseToEdit,
  handleRefresh,
  handleClose,
  isOpen,
  tagId,
  tags,
}: UpsertExpenseModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isOpen) {
      form.setFieldsValue({
        spendAt: roundTo15Minutes(expenseToEdit?.spendAt),
        description: expenseToEdit?.description || '',
        tagId: expenseToEdit?.tagId || tagId,
        amount: expenseToEdit?.amount || '',
      });
    }
    return () => {
      const clearErrors = form.getFieldsError().map(({ name }) => ({
        name,
        errors: [],
      }));
      if (clearErrors.length) form.setFields(clearErrors);
    };
  }, [expenseToEdit, tagId, form, isOpen]);

  const handleSubmit = async (values: UpsertExpenseDto) => {
    try {
      const body = {
        ...values,
        spendAt: dayjs.utc(values.spendAt).toISOString(),
        amount: Number(values.amount),
      };
      console.log(body);
      if (expenseToEdit) {
        const res = await updateExpense(expenseToEdit.id, body);
        console.log('updated', { res });
      } else {
        const res = await createExpense(body);
        console.log('created', { res });
      }
      handleRefresh();
      handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    form.resetFields();
    handleClose();
  };

  return (
    <Modal
      title={`${expenseToEdit ? 'Оновити' : 'Додати'} витрату`}
      okText={expenseToEdit ? 'Оновити' : 'Додати'}
      onOk={() => form.submit()}
      onCancel={handleClose}
      cancelText="Скасувати"
      open={isOpen}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Дата та час"
          name="spendAt"
          rules={[{ required: true, message: 'Вкажи дату та час' }]}
        >
          <DatePicker
            showTime={{ minuteStep: 15 }}
            style={{ width: '100%' }}
            format="DD.MM.YYYY HH:mm"
          />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Оберіть категорію' }]}
          label="Категорія"
          name="tagId"
        >
          <Select
            options={map(tags, ({ id, name }) => ({ label: name, value: id }))}
            placeholder="Оберіть категорію"
          />
        </Form.Item>
        <Form.Item
          label="Сума"
          name="amount"
          rules={[
            { required: true, message: 'Вкажіть суму' },
            { pattern: /^\d+$/, message: 'Повинно бути ціле число' },
          ]}
        >
          <Input placeholder="100" type="number" step={1} min={0} />
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Вкажіть короткий опис' }]}
          name="description"
          label="Опис"
        >
          <Input.TextArea placeholder="Продукти (АТБ)" rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpsertExpenseModal;
