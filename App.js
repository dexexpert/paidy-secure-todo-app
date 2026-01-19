import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Auth from './src/screens/AuthScreen';
import TodoScreen from './src/screens/TodoScreen';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if hardware supports biometrics

  useEffect(() => {
    let isMounted = true;
    
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (isMounted) {
        setIsBiometricSupported(compatible);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
  * Requests biometric authentication.
  * Used before all sensitive actions (add, update, delete).
  */

  function onAuthenticate() {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate',
      fallbackLabel: 'Enter Password',
    });
    auth.then(result => {
      setIsAuthenticated(result.success);
    }
    );
  }

  return (
    <View style={styles.container}>
      {isAuthenticated
        ? <TodoScreen /> 
        : <Auth onAuthenticate={onAuthenticate} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});