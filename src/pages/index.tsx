import React from 'react';
import HelloWorld from '../components/first';
import SimpleForm from '../components/simpleform';


const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to My Next.js Project</h1>
      <HelloWorld />
      <SimpleForm />
    </div>
  );
}

export default Home;