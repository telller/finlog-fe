import { Flex, Modal, Space, Typography, Upload } from 'antd';
import {
  DeleteOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { useExpensesState } from '@src/state';
import { useNavigate } from 'react-router';
import { uploadFile } from '@src/services';
import type { UploadProps } from 'antd';
import { useState } from 'react';
import './UploadExpensesModal.css';

interface UploadExpensesModalProps {
  handleClose: () => void;
  isOpen: boolean;
}

const UploadExpensesModal = ({ isOpen, handleClose }: UploadExpensesModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { getExpensesList } = useExpensesState();
  const navigate = useNavigate();

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
  };

  const handleUploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file!);
      const res = await uploadFile(formData);
      console.log('uploaded', { res });
      getExpensesList(1).then();
      handleCloseModal();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setFile(null);
    handleClose();
  };

  return (
    <Modal
      okButtonProps={{ disabled: !file }}
      onCancel={handleCloseModal}
      title="Завантажити файл"
      onOk={handleUploadFile}
      cancelText="Скасувати"
      okText="Завантажити"
      open={isOpen}
    >
      {file ? (
        <Flex align="center" justify="space-between" className="file-card">
          <Space>
            {file.name.endsWith('.xlsx') || file.name.endsWith('.xls') ? (
              <FileExcelOutlined className="excel-icon" />
            ) : (
              <FileTextOutlined className="csv-icon" />
            )}
            <div>
              <Typography.Text strong>{file.name}</Typography.Text>
              <br />
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {(file.size / 1024).toFixed(2)} KB
              </Typography.Text>
            </div>
          </Space>
          <DeleteOutlined onClick={() => setFile(null)} className="delete-icon" />
        </Flex>
      ) : (
        <Upload.Dragger {...uploadProps} accept=".xlsx,.csv" showUploadList={false}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Натисніть або перетягніть файл у цю область, щоб завантажити
          </p>
          <p className="ant-upload-hint">Завантажувати можна тільки .xlsx або .csv файли</p>
        </Upload.Dragger>
      )}
    </Modal>
  );
};

export default UploadExpensesModal;
