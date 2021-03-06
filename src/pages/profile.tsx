import Link from 'next/link';
import { useAuth } from '~/lib/auth'; // pull the `useAuth` hook
import Layout from '~/components/Layout';
import { SpinnerFullPage } from '~/components/Spinner';
import { NextAppPageServerSideProps } from '~/types/app';
import { supabase } from '~/lib/supabase';
import { GetServerSideProps } from 'next';

const ProfilePage = ({}) => {
  // the absolutely essential methods we'll need from AuthContext
  const {
    user, // The logged-in user object
    loading, // loading state
    signOut, // and a method to let the logged-in user sign out
  } = useAuth();

  if (loading) {
    return <SpinnerFullPage />;
  }

  return (
    <Layout useBackdrop={false}>
      <div className="h-screen flex flex-col justify-center items-center relative">
        <h2 className="text-3xl my-4">
          Howdie, {user && user.email ? user.email : 'Explorer'}!
        </h2>
        {!user && (
          <small className="mb-2">
            You've landed on a protected page. Please{' '}
            <Link href="/">log in</Link> to view the page's full content{' '}
          </small>
        )}
        {user && (
          <div>
            <button
              onClick={signOut}
              className="border bg-gray-500 border-gray-600 text-white px-3 py-2 rounded w-full text-center transition duration-150 shadow-lg"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<NextAppPageServerSideProps> => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      user,
      loggedIn: !!user,
    },
  };
};

export default ProfilePage;
