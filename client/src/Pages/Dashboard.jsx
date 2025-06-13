import React from 'react'
import { Avatar, Button, Card, Flex, Typography } from 'antd'
import { useAuth } from '../context/AuthContext.jsx'
import {UserOutlined} from '@ant-design/icons'

const Dashboard = () => {


  



  const { logout,userData } = useAuth();



  const hamdleLogout = async () => {
    await logout();
  }



  return (
   <>

   <Card className='profile-card'>
    <Flex vertical gap='small' align='center'>
      <Avatar size={150} icon={<UserOutlined/>} className='avatar'/>
      <Typography.Title level={2} strong className='username'>
        {userData.name}
      </Typography.Title>

      <Typography.Text type='secondary' strong>Email:{userData.email}</Typography.Text>

      <Typography.Text type='secondary' strong>Role:{userData.Role}</Typography.Text>

    <Button size='large' type='primary' className='profile-btn' onClick={hamdleLogout}>Logout</Button>
    </Flex>
   </Card>




   </>
  )
}

export default Dashboard
