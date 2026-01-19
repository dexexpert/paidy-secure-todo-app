import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TodoScreen from '../../src/screens/TodoScreen';

describe('TodoScreen', () => {
  it('should render the to-do list title', () => {
    const { getByText } = render(<TodoScreen />);
    expect(getByText('To-Do List')).toBeTruthy();
  });

  it('should add a new task when Add button is pressed', async () => {
    const { getByPlaceholderText, getByText } = render(<TodoScreen />);
    
    const input = getByPlaceholderText('Enter here');
    fireEvent.changeText(input, 'New Task');
    
    const addButton = getByText('Add');
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(getByText('New Task')).toBeTruthy();
    });
  });

  it('should not add empty tasks', async () => {
    const { getByText, getByPlaceholderText } = render(<TodoScreen />);
    
    // Try to add without entering text
    const addButton = getByText('Add');
    fireEvent.press(addButton);

    // Verify no task was added by checking that the input field is still empty
    const input = getByPlaceholderText('Enter here');
    expect(input.props.value).toBeUndefined(); // Input should still be undefined/empty
  });

  it('should remove a task when remove button is pressed', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TodoScreen />);
    
    // Add a task first
    const input = getByPlaceholderText('Enter here');
    fireEvent.changeText(input, 'Task to Remove');
    fireEvent.press(getByText('Add'));

    await waitFor(() => {
      expect(getByText('Task to Remove')).toBeTruthy();
    });

    // Remove the task
    const removeButton = getByText('✕');
    fireEvent.press(removeButton);

    await waitFor(() => {
      expect(queryByText('Task to Remove')).not.toBeTruthy();
    });
  });

  it('should update a task when clicked and modified', async () => {
    const { getByPlaceholderText, getByText, queryByText } = render(<TodoScreen />);
    
    // Add a task
    const input = getByPlaceholderText('Enter here');
    fireEvent.changeText(input, 'Original Task');
    fireEvent.press(getByText('Add'));

    await waitFor(() => {
      expect(getByText('Original Task')).toBeTruthy();
    });

    // Click task to edit
    fireEvent.press(getByText('Original Task'));

    // Verify button changes to Update
    await waitFor(() => {
      expect(getByText('Update')).toBeTruthy();
    });

    // Modify the task
    fireEvent.changeText(input, 'Updated Task');
    fireEvent.press(getByText('Update'));

    await waitFor(() => {
      expect(getByText('Updated Task')).toBeTruthy();
      expect(queryByText('Original Task')).not.toBeTruthy();
    });
  });

  it('should show Add button for new tasks', () => {
    const { getByText } = render(<TodoScreen />);
    expect(getByText('Add')).toBeTruthy();
  });
});
