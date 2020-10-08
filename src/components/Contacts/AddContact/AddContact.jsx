import React, { useState, useEffect } from 'react'
import { Input, Form, Button } from 'antd'
import './AddContact.scss'

export default function AddContact(props) {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    if(props.currentContact) {
      setName(props.currentContact.name)
      setPhone(props.currentContact.phone)
      setAddress(props.currentContact.address)
    }
    return () => {
      setName('')
      setPhone('')
      setAddress('')
    }
  }, [props.currentContact])

  const handleNameChange = event => {
    setName(event.target.value)
  }
  const handlePhoneChange = event => {
    setPhone(event.target.value)
  }
  const handleAddressChange = event => {
    setAddress(event.target.value)
  }

  return (
    <Form 
      labelCol={{span: 4}} 
      className="new-contact__form" 
      name="contact" onFinish={props.handleSubmit}
      initialValues={props.currentContact ? 
        {name: props.currentContact.name, phone: props.currentContact.phone, address: props.currentContact.address} : {name: '', phone: '',}}
    >
      <Form.Item label="ФИО" name="name" rules={[{ required: true, message: 'Это обязательное поле' }]}>
        <Input onChange={handleNameChange} value={name} />
      </Form.Item>
      <Form.Item label="Телефон" name="phone">
        <Input onChange={handlePhoneChange} value={phone} />
      </Form.Item>
      <Form.Item label="Адрес" name="address">
        <Input onChange={handleAddressChange} value={address} />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">{props.type === 'create' ? "Создать" : "Изменить"}</Button>
      </Form.Item>
    </Form>
  )

}