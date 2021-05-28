import React from 'react';
import { MDBFooter} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter backgroundColor='light' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgb(116,123,129)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='/'>
          NoteBook.com
        </a>
      </div>
    </MDBFooter>
  );
}