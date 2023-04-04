import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { api } from "../utils/api";

export default function Todos() {
  const [todo, setTodo] = useState<string>("");

  const listTodos = api.todo.list.useQuery();

  const todos = listTodos.data;

  const createTodoMutation = api.todo.create.useMutation({
    onSuccess: (newTodo) => {
      todos?.push(newTodo);
    },
  });

  const deleteTodoMutation = api.todo.delete.useMutation({
    onSuccess: () => {
      void listTodos.refetch();
    },
  });

  return (
    <Stack spacing={3} width={400}>
      <TextField
        size="small"
        label="Todo"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            setTodo("");
            createTodoMutation.mutate({ title: todo });
          }
        }}
      />
      <Divider />
      <Stack spacing={1}>
        <List>
          {todos?.map((todo) => (
            <ListItem key={todo.id}>
              <ListItemText primary={todo.title} />
              <ListItemSecondaryAction>
                <IconButton
                  color="error"
                  edge="end"
                  aria-label="delete"
                  onClick={() => deleteTodoMutation.mutate({ id: todo.id })}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {todos?.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            No todos yet
          </Typography>
        )}

        <Divider />

        {todos?.length && (
          <Typography variant="body2" color="textSecondary">
            {todos.length} todos
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
