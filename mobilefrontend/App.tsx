import React from 'react';
import { AuthProvider } from './src/context/authContext';
import AppNavigator from './src/navigations/navigation';

const App: React.FC = () => {

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;