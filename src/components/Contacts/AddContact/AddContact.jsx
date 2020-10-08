import React, { useState, useEffect } from 'react'
import { Input, Form, Button } from 'antd'
import './AddContact.scss'

export default function AddContact({ currentContact, handleSubmit, type }) {

  const [fields, setFields] = useState([
    {name: ['name'], value: currentContact ? currentContact.name : ''},
    {name: ['phone'], value: currentContact ? currentContact.phone : ''},
    {name: ['address'], value: currentContact ? currentContact.address: ''}
  ])

  useEffect(() => {
    if(currentContact) {
      setFields([
        {name: ['name'], value: currentContact.name},
        {name: ['phone'], value: currentContact.phone},
        {name: ['address'], value: currentContact.address}
      ])
    } else {
      setFields([
        {name: ['name'], value: ''},
        {name: ['phone'], value: ''},
        {name: ['address'], value: ''}
      ])
    }
  }, [currentContact])

  const handleFieldsChange = (changed, all) => {
    setFields(all)
  }

  return (
    <Form 
      labelCol={{span: 4}} 
      className="new-contact__form" 
      name="contact" 
      fields={fields}
      onFinish={handleSubmit}
      onFieldsChange={handleFieldsChange}
    >
      <Form.Item label="ФИО" name="name" rules={[{ required: true, message: 'Это обязательное поле' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Телефон" name="phone">
        <Input />
      </Form.Item>
      <Form.Item label="Адрес" name="address">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">{type === 'create' ? "Создать" : "Изменить"}</Button>
      </Form.Item>
    </Form>
  )

}