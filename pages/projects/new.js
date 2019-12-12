import { withApollo } from '../../lib/apollo'
import NewProjectPage from '../../components/Projects/New'

const NewProject = () => (
  <div>
    <NewProjectPage />
  </div>
);

export default withApollo(NewProject);
