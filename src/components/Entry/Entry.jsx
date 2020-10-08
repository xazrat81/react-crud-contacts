import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './Entry.scss'
import axios from '../../services/axios'
import { Alert, Input, Layout } from 'antd'
import { sha512 } from 'js-sha512'

export default function Entry() {

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isAlertVisible, setIsAlertVisible] = useState(false)

  const history = useHistory()

  const handleLoginInput = event => {
    setIsAlertVisible(false)
    setLogin(event.target.value)
  }
  const handlePasswordInput = event => {
    setIsAlertVisible(false)
    setPassword(event.target.value)
  }

  const sendAuthorizationData = async event => {
    event.preventDefault()
    const users = await axios.get('/users')
    const match = users.data.find(user => {
      return user.login === login && user.password === sha512(sha512(password))
    })
    if(match) 
      history.push(`${match.id}/contacts`)
    else {
      setIsAlertVisible(true)
    }
  }

  return (
    <Layout>
      <div className="entry">
        <form className="entry__authorization-form" onSubmit={sendAuthorizationData}>
          <h1 className="entry__authorization-form__title">Вход в личный кабинет</h1>
          <div className="entry__authorization-form__inputs" direction="vertical">
            <Input onChange={handleLoginInput} type="text" id="login" placeholder="Введите логин" />
            <Input onChange={handlePasswordInput} type="text" id="password" placeholder="Введите пароль" />
            <Input type="submit" value="Войти" />
            {isAlertVisible &&
              <Alert type="error" message="Неверное имя пользователя или пароль. Попробуйте снова." />
            }
          </div>
        </form>
      </div>
    </Layout>
  )
}