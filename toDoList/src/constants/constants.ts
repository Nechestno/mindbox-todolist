export type DataTypes = {
    id : string;
    task : string;
    completed: boolean;
}

export const mockData : DataTypes[] = [
    {
        id: '1',
        task: "Купить продукты",
        completed: false,
    },
    {
        id: '2',
        task: "Сделать домашнее задание",
        completed: false,
    },
    {
        id: '3',
        task: "Погулять с собакой",
        completed: false,
    },
    {
        id: '4',
        task: "Запланировать встречу с друзьями",
        completed: false,
    },
    {
        id: '5',
        task: "Почитать книгу",
        completed: false,
    }
];