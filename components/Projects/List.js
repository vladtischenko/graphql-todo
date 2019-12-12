import { useQuery } from '@apollo/react-hooks'
import { NetworkStatus } from 'apollo-client'
import gql from 'graphql-tag'
import Link from 'next/link';

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      projects {
        id
        position
        title
        createdAt
      }
    }
  }
`

export default function PostList () {
  const { loading, error, data } = useQuery(ME_QUERY)

  return (
    <div>
      <Link href="/projects/new">
        <a>
          New Project
        </a>
      </Link>
      <p>
        Projects
      </p>
      {data && data.me && data.me.projects &&
        <ul>
          {data.me.projects.map(project => (
            <li key={project.id}>
              <div>
                {project.title}
              </div>
            </li>
          ))}
        </ul>
      }
    </div>
  )
}
