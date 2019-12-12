import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { withRouter } from 'next/router'

const CREATE_PROJECT_MUTATION = gql`
  mutation projectCreate($title: String!) {
    projectCreate(input: { title: $title }) {
      project {
        id
      }
    }
  }
`

const NewProject = ({ router }) => {
  const [projectCreate, { loading }] = useMutation(CREATE_PROJECT_MUTATION)

  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    form.reset()

    try {
      await projectCreate({ variables: { title } });
      router.push(`/projects`)
    } catch (error) {
      console.log(
        error.message.replace('GraphQL error:', '').trim()
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Project</h1>
      <input placeholder='title' name='title' type='text' required />
      <button type='submit' disabled={loading}>
        Submit
      </button>
    </form>
  )
}

export default withRouter(NewProject);
