import App from './app';

const port = process.env.PORT;

App.listen(port, () => {
    console.log(`[server]: Server is running http://localhost:${port}/api`);
});
