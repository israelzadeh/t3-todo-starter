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

export default function Todos() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

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
            setTodos([...todos, todo]);
          }
        }}
      />
      <Divider />
      <Stack spacing={1}>
        <List>
          {todos.map((todo, index) => (
            <ListItem key={index}>
              <ListItemText primary={todo} />
              <ListItemSecondaryAction>
                <IconButton
                  color="error"
                  edge="end"
                  aria-label="delete"
                  onClick={() => setTodos(todos.filter((_, i) => i !== index))}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {todos.length === 0 && (
          <Typography variant="body2" color="textSecondary">
            No todos yet
          </Typography>
        )}

        <Divider />

        {todos.length > 0 && (
          <Typography variant="body2" color="textSecondary">
            {todos.length} todos
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
