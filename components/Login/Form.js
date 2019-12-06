import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'

const CREATE_POST_MUTATION = gql`
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
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION)

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const email = formData.get('email')
    const password = formData.get('pswd')
    form.reset()

    createPost({
      variables: { email, password },
      update: (proxy, { data: { sessionCreate: { user, token, errors } } }) => {
        if (user) {
          router.push('/projects')
        } else {
          console.log('handle errors')
        }
      }
    })
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
