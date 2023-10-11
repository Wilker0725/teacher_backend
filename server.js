import createServer from "./app.js"

const app = createServer();

app.listen(3000, () => {
    console.log(`Server is start on port 3000`);
})
