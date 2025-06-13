import React from 'react';
import { Card, Flex, Form, Typography, Input, Button, Alert, Spin } from 'antd';
import { Link } from 'react-router-dom';
import Image from '../assets/onepiece.jpg';
import useSignup from '../hooks/usesignup';

const Register = () => {
  const { loading, error, registerUser } = useSignup();

  const handleRegister = (values) => {
    registerUser(values);
  };

  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        <Flex vertical flex={1}>
          <Typography.Title level={3} className="title">
            Create an account
          </Typography.Title>

          <Typography.Text type="secondary" className="slogan">
            Join for exclusive access!
          </Typography.Text>

          <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: 'Please enter your name!' }]}
            >
              <Input size="large" placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Invalid email format' },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
              hasFeedback
            >
              <Input.Password size="large" placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="passwordConfirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="Re-enter your password" />
            </Form.Item>

            {error && (
              <Alert description={error} type="error" showIcon closable className="alert" />
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" className="btn" loading={loading}>
                Create Account
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/login">
                <Button size="large" className="btn">
                  Sign In
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>

        <Flex flex={1}>
          <img src={Image} alt="signup" className="auth-image" />
        </Flex>
      </Flex>
    </Card>
  );
};

export default Register;



