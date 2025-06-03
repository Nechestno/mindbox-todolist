import {Button, Input, Typography, List, Radio, Checkbox} from "antd";
import {useState} from "react";
import {type DataTypes, mockData} from "./constants";
import styled from "styled-components";


const App = () =>  {
    const { Title, Paragraph } = Typography;

    const [todos, setTodos] = useState<DataTypes[]>(mockData.map(todo => ({ ...todo, completed: false })));
    const [inputValue, setInputValue] = useState<string>("");
    const [filter, setFilter] = useState<string>("all");

    const addTodo = () => {
        if (inputValue.trim()) {
            const newTodo: DataTypes = {
                id: (todos.length + 1).toString(),
                task: inputValue.trim(),
                completed: false
            };
            setTodos([...todos, newTodo]);
            setInputValue("");
        }
    };

    const toggleTodo = (id: string) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed));
    };

    const getFilteredTodos = () => {
        switch (filter) {
            case "active":
                return todos.filter(todo => !todo.completed);
            case "completed":
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    };

    const remainingTasks = todos.filter(todo => !todo.completed).length;

    return (
        <Container>
            <Title>TODO</Title>

            <InputContainer>
                <Input
                    placeholder="Введите новое задание"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={addTodo}
                />
                <Button type="primary" onClick={addTodo}>Добавить</Button>
            </InputContainer>

            <Radio.Group value={filter} onChange={(e) => setFilter(e.target.value)}>
                <Radio.Button value="all">Все</Radio.Button>
                <Radio.Button value="active">Активные</Radio.Button>
                <Radio.Button value="completed">Завершенные</Radio.Button>
            </Radio.Group>

            <List
                style={{ width: '100%' }}
                bordered
                dataSource={getFilteredTodos()}
                renderItem={(item) => (
                    <List.Item>
                        <Checkbox
                            checked={item.completed}
                            onChange={() => toggleTodo(item.id)}
                        />
                        <Paragraph
                            style={{
                                textDecoration: item.completed ? 'line-through' : 'none'
                            }}
                        >
                            {item.task}
                        </Paragraph>
                    </List.Item>
                )}
                footer={
                    <Footer>
                        <div>Осталось задач: {remainingTasks}</div>
                        <Button
                            type="link"
                            onClick={clearCompleted}
                            disabled={!todos.some(todo => todo.completed)}
                        >
                            Очистить завершенные
                        </Button>
                    </Footer>
                }
            />
        </Container>
    );
}

export default App;

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

const InputContainer = styled.div`
    width: 100%;
    display: flex;
    gap: 8px;
`;

const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;
