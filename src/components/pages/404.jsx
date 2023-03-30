import { Link } from 'react-router-dom';

import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Page doesn't exist!
      </p>
      <Link
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          color: '#9f0013',
          marginTop: '30px',
        }}
        to='/'
      >
        Go to the main page...
      </Link>
    </div>
  );
};

export default Page404;
