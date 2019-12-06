import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'

const CREATE_POST_MUTATION = gql`
  mutation userCreate($email: String!, $password: String!, $passwordConfirmation: String!) {
    userCreate(input: { email: $email, password: $password, passwordConfirmation: $passwordConfirmation }) {
      user {
        id
        email
      }
    }
  }
`

const SignUpForm = ({ router }) => {
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION)

  const handleSubmit = event => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const email = formData.get('email')
    const password = formData.get('pswd')
    const passwordConfirmation = formData.get('pswd-confirm')
    form.reset()

    createPost({
      variables: { email, password, passwordConfirmation },
      update: (proxy, { data: { userCreate: { user, errors } } }) => {
        if (user) {
          router.push('/login')
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
      <input type="password" name="pswd-confirm" placeholder="Password Confirmation" required />
      <button type="submit" disabled={loading}>Sign Up</button>
    </form>
  );
}

export default withRouter(SignUpForm);
