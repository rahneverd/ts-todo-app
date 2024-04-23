#! /usr/bin/env node

import inquirer from "inquirer";

    const todoList: string[] = [];
    let isRunning = true;

    while (isRunning) {
        const answer = await inquirer.prompt([
            {
                type: 'list',
                name: 'operation',
                message: 'Select the operation you want to perform:',
                choices: ['Add Todo', 'View Todos', 'Delete Todo', "Exit"]
            }
        ]);

        switch (answer.operation) {
            case 'Add Todo':
                const todo = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'todo',
                        message: 'Enter the todo: '
                    }
                ]);
                todoList.push(todo.todo);
                console.log("Todo added successfully!");
                viewTodos();
                break;

            case 'View Todos':
                viewTodos();
                break;

            case 'Delete Todo':
                const todoToDelete = await inquirer.prompt([
                    {
                        type: 'number',
                        name: 'index',
                        message: 'Enter the index of the todo you want to delete: ',
                        validate: (input: string) => !isNaN(parseFloat(input)),
                    }
                ]);
                if (todoList[todoToDelete.index]) {
                    todoList.splice(todoToDelete.index, 1);
                    console.log("Todo deleted successfully!");
                    viewTodos();
                } else {
                    console.log("Todo not found!");
                }
                break;
            case 'Exit':
                const confirm = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'exit',
                        message: 'Are you sure you want to exit? All data will be lost if you exit.',
                        choices: ["Yes", "No"]
                    }
                ]);
                if (confirm.exit === "Yes") {
                    isRunning = false;
                }
                break;
        }
        function viewTodos() {
            if (todoList.length > 0) {
                console.table(todoList)
            } else {
                console.log("No todos found!");
            }
        }
    }