import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Task from '../../src/components/Task';

describe('Task Component', () => {
  const mockOnUpdate = jest.fn();
  const mockOnRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render task text correctly', () => {
    const { getByText } = render(
      <Task text="Test Task" onUpdate={mockOnUpdate} onRemove={mockOnRemove} />
    );
    expect(getByText('Test Task')).toBeTruthy();
  });

  it('should call onUpdate when task is pressed', () => {
    const { getByText } = render(
      <Task text="Test Task" onUpdate={mockOnUpdate} onRemove={mockOnRemove} />
    );
    fireEvent.press(getByText('Test Task'));
    expect(mockOnUpdate).toHaveBeenCalled();
  });

  it('should call onRemove when remove button is pressed', () => {
    const { getByText } = render(
      <Task text="Test Task" onUpdate={mockOnUpdate} onRemove={mockOnRemove} />
    );
    const removeButton = getByText('✕');
    fireEvent.press(removeButton);
    expect(mockOnRemove).toHaveBeenCalled();
  });

  it('should display the remove button', () => {
    const { getByText } = render(
      <Task text="Test Task" onUpdate={mockOnUpdate} onRemove={mockOnRemove} />
    );
    expect(getByText('✕')).toBeTruthy();
  });
});
