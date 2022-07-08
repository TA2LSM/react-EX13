import { Navigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

export function CheckAdmin({ user, children }) {
  //console.log(user);
  if (user) {
    if (user.isAdmin === true) {
      return children;
    } else {
      return (
        <>
          {toast.error('This action needs administrator rights')}
          {/* <Navigate
            replace
            to='/logout'
          /> */}
        </>
      );
    }
  }

  return (
    <>
      {/* {toast.error('Please login as an administrator')} */}
      <Navigate
        replace
        to='/login'
      />
    </>
  );
}

export function CheckLogin({ user, children }) {
  // console.log(user);
  if (!user) {
    return (
      <>
        {/* {toast.error('Please login')} */}
        <Navigate
          replace
          to='/login'
        />
      </>
    );
  }

  return children;
}
