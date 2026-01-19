import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import App from './App';
import * as LocalAuthentication from 'expo-local-authentication';

jest.mock('expo-local-authentication');

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Auth screen initially when not authenticated', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    
    const { getByText } = render(<App />);
    
    await waitFor(() => {
      expect(getByText('Paidy')).toBeTruthy();
    });
  });

  it('should check if device supports biometrics on mount', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    
    render(<App />);

    await waitFor(() => {
      expect(LocalAuthentication.hasHardwareAsync).toHaveBeenCalled();
    });
  });

  it('should show Auth screen when not authenticated', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    
    const { getByText } = render(<App />);
    
    await waitFor(() => {
      expect(getByText('Todo-List Secure Application')).toBeTruthy();
    });
  });

  it('should handle biometric authentication', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

    const { getByText } = render(<App />);
    
    await waitFor(() => {
      expect(getByText('Login')).toBeTruthy();
    });

    const loginButton = getByText('Login');
    
    await act(async () => {
      fireEvent.press(loginButton);
    });

    await waitFor(() => {
      expect(LocalAuthentication.authenticateAsync).toHaveBeenCalled();
    });
  });

  it('should switch to TodoScreen after successful authentication', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

    const { getByText } = render(<App />);
    
    await waitFor(() => {
      expect(getByText('Login')).toBeTruthy();
    });

    const loginButton = getByText('Login');
    
    await act(async () => {
      fireEvent.press(loginButton);
    });

    await waitFor(() => {
      expect(getByText('To-Do List')).toBeTruthy();
    });
  });

  it('should remain on Auth screen if authentication fails', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: false });

    const { getByText, queryByText } = render(<App />);
    
    await waitFor(() => {
      expect(getByText('Login')).toBeTruthy();
    });

    const loginButton = getByText('Login');
    
    await act(async () => {
      fireEvent.press(loginButton);
    });

    await waitFor(() => {
      expect(queryByText('Paidy')).toBeTruthy();
      expect(queryByText('To-Do List')).not.toBeTruthy();
    });
  });

  it('should handle device without biometric support', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(false);

    const { getByText } = render(<App />);

    await waitFor(() => {
      expect(getByText('Paidy')).toBeTruthy();
    });
  });

  it('should call authenticateAsync with correct parameters', async () => {
    LocalAuthentication.hasHardwareAsync.mockResolvedValue(true);
    LocalAuthentication.authenticateAsync.mockResolvedValue({ success: true });

    const { getByText } = render(<App />);
    
    await waitFor(() => {
      expect(getByText('Login')).toBeTruthy();
    });

    const loginButton = getByText('Login');
    
    await act(async () => {
      fireEvent.press(loginButton);
    });

    await waitFor(() => {
      expect(LocalAuthentication.authenticateAsync).toHaveBeenCalledWith({
        promptMessage: 'Authenticate',
        fallbackLabel: 'Enter Password',
      });
    });
  });
});
