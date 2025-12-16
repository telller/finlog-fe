import { Button, Card, Flex, Form, Input, Typography } from 'antd';
import './Login.css';
import { useEffect } from 'react';
import { login, setAuthToken, setRefreshToken } from '@src/services';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ email: '', password: '' });
    return () => {
      const clearErrors = form.getFieldsError().map(({ name }) => ({
        name,
        errors: [],
      }));
      if (clearErrors.length) form.setFields(clearErrors);
    };
  }, [form]);

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await login(values);
      const { accessToken, refreshToken } = res.data;
      setAuthToken(accessToken);
      setRefreshToken(refreshToken);
      console.log('login', { res });
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex align="center" justify="center" className="login-container">
      <Card className="login-card">
        <Typography.Title level={3} className="title">
          Авторизація
        </Typography.Title>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Електронна пошта"
            name="email"
            rules={[
              { required: true, message: 'Введіть адресу електронної пошти' },
              { type: 'email', message: 'Неправильна адреса електронної пошти' },
            ]}
          >
            <Input placeholder="email@example.com" />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введіть пароль' }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Увійти
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
};

export default Login;
