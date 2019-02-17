import React from 'react';
import Spinner from 'react-svg-spinner';
import './Loader.css';

function Loader() {
  return (
    <div className = "loaderLoop">
      <Spinner height='128px' width='128px' color='teal' />
    </div>
  );
}

export default Loader;
