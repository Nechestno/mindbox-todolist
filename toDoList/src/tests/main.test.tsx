import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import {expect, describe, beforeEach, test} from "vitest"
import '@testing-library/jest-dom'
import App from "../App.tsx";


describe('Todo App', () => {
    beforeEach(() => {
        render(<App />);
    });


    test('Add a new todo', async () => {
        const input = screen.getByPlaceholderText(/Введите новое задание/i);
        const button = screen.getByText(/Добавить/i);

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(button);

        expect(screen.getByText(/New Todo/i)).toBeInTheDocument();
    });

    test('Toggle todo', async () => {
        const input = screen.getByPlaceholderText(/Введите новое задание/i);
        const button = screen.getByText(/Добавить/i);

        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(button);

        const checkbox = screen.getAllByRole('checkbox');
        const lastCheckBox = checkbox[checkbox.length - 1];
        fireEvent.click(lastCheckBox);

        const paragraph = screen.getByText(/New Todo/i);
        expect(paragraph).toHaveStyle('text-decoration: line-through');
    });

    test('Filter active todo', async () => {
        const input = screen.getByPlaceholderText(/Введите новое задание/i);
        const button = screen.getByText(/Добавить/i);

        fireEvent.change(input, { target: { value: 'New Todo 1' } });
        fireEvent.click(button);
        fireEvent.change(input, { target: { value: 'New Todo 2' } });
        fireEvent.click(button);

        const checkboxes = screen.getAllByRole('checkbox');
        const lastCheckBox = checkboxes[checkboxes.length - 1];
        fireEvent.click(lastCheckBox);

        const activeButton = screen.getByText(/Активные/i);
        fireEvent.click(activeButton);

        await waitFor(() => {
            expect(screen.queryByText(/New Todo 1/i)).toBeInTheDocument();
            expect(screen.queryByText(/New Todo 2/i)).not.toBeInTheDocument();
        });
    });
    test('Clear completed todo', async () => {
        const input = screen.getByPlaceholderText(/Введите новое задание/i);
        const button = screen.getByText(/Добавить/i);

        fireEvent.change(input, { target: { value: 'New Todo 1' } });
        fireEvent.click(button);
        fireEvent.change(input, { target: { value: 'New Todo 2' } });
        fireEvent.click(button);

        const checkboxes = screen.getAllByRole('checkbox');
        const lastCheckBox = checkboxes[checkboxes.length - 1];
        fireEvent.click(lastCheckBox);

        const clearButton = screen.getByText(/Очистить завершенные/i);
        fireEvent.click(clearButton);

        await waitFor(() => {
            expect(screen.queryByText(/New Todo 1/i)).toBeInTheDocument();
            expect(screen.queryByText(/New Todo 2/i)).not.toBeInTheDocument();
        });
    });
});