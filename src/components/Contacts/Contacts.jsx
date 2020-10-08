import React, { useState, useEffect } from 'react'
import axios from '../../services/axios'
import { useParams } from 'react-router-dom'
import { Input, Modal, Button } from 'antd'
import AddContact from './AddContact/AddContact'
import ContactCard from './ContactCard/ContactCard'
import './Contacts.scss'

export default function Contacts() {

  const [contacts, setContacts] = useState([])
  const [user, setUser] = useState('')
  const [searchString, setSearchString] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [currentContact, setCurrentContact] = useState(null)
  const [contactActionType, setContactActionType] = useState('create')

  const { id } = useParams()

  const filterContacts = () => {
    const filtered = contacts.filter(item => item.name.toLowerCase().includes(searchString.toLowerCase()))
    return filtered
  }
  const filteredContacts = filterContacts()

  const getContacts = async () => {
    const users = (await axios.get('/users')).data
    const currentUser = users.find(item => item.id === +id)
    setUser(currentUser)
    const userContacts = await axios.get(`/contacts?userId=${id}`)
    setContacts(userContacts.data)
  } 

  const handleSearchChange = event => {
    setSearchString(event.target.value)
    filterContacts()
  }
  const handleCancel = () => {
    setContactActionType('create')
    setCurrentContact(null)
    setIsModalVisible(false)
  }
  const openNewContactModal = () => {
    setIsModalVisible(true)
  }

  const handleDelete = async contactId => {
    if(window.confirm('Вы уверены, что хотите удалить данный контакт?')) {
      await axios.delete(`/contacts/${contactId}`)
      await getContacts()
    }
  }
  const handleEdit = contact => {
    setContactActionType('edit')
    setCurrentContact(contact)
    openNewContactModal()
  }

  const handleSubmit = async values => {
    if(contactActionType === 'create') {
      await axios.post(`/contacts`, {
        name: values.name,
        phone: values.phone,
        address: values.address,
        userId: +id
      })
    } else {
      await axios.put(`/contacts/${currentContact.id}`, {
        name: values.name,
        phone: values.phone,
        address: values.address,
        userId: +id
      })
    }
    handleCancel()
    await getContacts()
  }

  useEffect(() => {
    getContacts()
  }, [])

  return (
    <div className="contacts">
      <h1>Контакты пользователя {user.login}</h1>
      <div className="contacts__form">
        <Input className="contacts__search-input" placeholder="Введите строку для поиска" onChange={handleSearchChange} value={searchString} />
        <Button type="primary" onClick={openNewContactModal}>Добавить новый контакт</Button>
      </div>
      <div className="contacts__list">
        {
          filteredContacts.map(contact => <ContactCard handleDelete={handleDelete} handleEdit={handleEdit} contact={contact} key={contact.id} />)
        }
      </div>
      <Modal
        title={contactActionType === "create" ? "Добавить новый контакт" : "Редактировать контакт"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <AddContact type={contactActionType} currentContact={currentContact} handleSubmit={handleSubmit} />
      </Modal>
    </div>
  )
}