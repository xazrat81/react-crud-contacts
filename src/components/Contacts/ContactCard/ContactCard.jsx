import React from 'react'
import { Card, Button } from 'antd'

export default function ContactCard(props) {

  return (
    <Card 
      className="contacts__card" 
      title={props.contact.name}
      extra={
        <>
          <Button type="link" onClick={props.handleEdit.bind(null, props.contact)}>Редактировать</Button>
          <Button type="link" onClick={props.handleDelete.bind(null, props.contact.id)}>Удалить</Button>
        </>
      }
    >
      <p>{props.contact.phone}</p>
      <p>{props.contact.address}</p>
    </Card>
  )
}