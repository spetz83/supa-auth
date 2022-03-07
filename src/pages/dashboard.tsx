import { NextPage } from 'next';
import { NextAppPageProps } from '~/types/app';
import Layout from '~/components/Layout';

const DashboardPage: NextPage<NextAppPageProps> = ({}) => {
  return (
    <Layout>
      <h1>What up?</h1>
    </Layout>
  );
};

export default DashboardPage;

DashboardPage.defaultProps = {
  meta: {
    title: 'Dashboard',
  },
};
