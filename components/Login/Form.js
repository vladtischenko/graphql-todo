import React, { useState, useEffect } from "react";

import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'

const CREATE_SESSION_MUTATION = gql`
  mutation sessionCreate($email: String!, $password: String!) {
    sessionCreate(input: { email: $email, password: $password }) {
      token
      user {
        id
        email
      }
    }
  }
`

const LoginForm = ({ router }) => {
  const [createSession, { loading, error, data }] = useMutation(CREATE_SESSION_MUTATION)

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const email = formData.get('email')
    const password = formData.get('pswd')
    form.reset()

    try {
      const {
        data: {
          sessionCreate: {
            token,
            user,
          },
        },
      } = await createSession({ variables: { email, password } });
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      router.push('/projects')
    } catch (error) {
      console.log(
        error.message.replace('GraphQL error:', '').trim()
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="email" placeholder="Email" required />
      <input type="password" name="pswd" placeholder="Password" required />
      <button type="submit" disabled={loading}>Login</button>
    </form>
  );
}

export default withRouter(LoginForm);
