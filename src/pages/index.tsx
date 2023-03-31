import { LogoutOutlined } from "@mui/icons-material";
import {
  AppBar,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { type NextPage } from "next";
import { useSession, signOut, signIn } from "next-auth/react";
import Head from "next/head";
import Todos from "~/components/Todos";

const Home: NextPage = () => {
  const session = useSession();

  return (
    <>
      <Head>
        <title>Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>

          {session.status === "authenticated" ? (
            <Stack spacing={2} direction="row" alignItems={"center"}>
              <Typography variant="body2">{session.data.user.name}</Typography>
              <Button
                variant="outlined"
                color="inherit"
                endIcon={<LogoutOutlined />}
                onClick={() => void signOut()}
              >
                Sign out
              </Button>
            </Stack>
          ) : (
            <Button color="inherit" onClick={() => void signIn()}>
              Sign in
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: 20,
        }}
      >
        {session.status === "authenticated" ? (
          <Todos />
        ) : (
          <>
            <Typography variant="body2" color="textSecondary">
              You need to sign in to use the app
            </Typography>

            <Button color="inherit" href="/api/auth/signin">
              Sign in
            </Button>
          </>
        )}
      </Container>
    </>
  );
};

export default Home;
