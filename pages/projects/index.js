import { withApollo } from '../../lib/apollo'
import ProjectsPage from '../../components/Projects/List'

const Projects = () => (
  <div>
    <ProjectsPage />
  </div>
);

export default withApollo(Projects);
