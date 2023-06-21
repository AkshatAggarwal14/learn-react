# learning-react

[Linkedin Course's Github Repository](https://github.com/LinkedInLearning/react-creating-and-hosting-a-full-stack-site-3209140)

[Firebase: https://console.firebase.google.com/](https://console.firebase.google.com/)

For running mongodb locally:

1. `mongod -dbpath <db-storage-path>`
2. Open a new terminal instance and create a new DB in `mongosh`

```
use <db-name>
```

```
db.<collection-name>.insertMany(
    [
        {
            name: 'learn-react',
            upvotes: 0,
            comments: [],
        },
        {
            name: 'learn-node',
            upvotes: 0,
            comments: [],
        },
        {
            name: 'mongodb',
            upvotes: 0,
            comments: [],
        }
    ]
)
```

```
db.articles.find({})
```

```
.exit
```

# Releasing App

1. Build frontend to get browser friendly code!

```
npm run build
```

2. Copy `build` folder into backend.

3. Serve `build` files statically!

```js
app.use(express.static(path.join(__dirname, '../build')));
```

> But we added `type: module` to package.json. So `__dirname` doesnt work.
> So we need:

```js
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

4. Also need a route handler for requests which isnt on API route!

```
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
```

5. Change server so runtime can tell server the `PORT` to listen on.

6. Host MongoDB on cloud!

    > Add username and password in `.env`. and change connection string!

7. Insert some data in MongoDB Atlas.

    > Click on `Connect` and `Connect with shell!`

    > Insert data from `mongosh`.

8. Release to google cloud!

    > Make `app.yaml`

    > Make `prod-env.yaml` to have seperate environment for production and development!

    > Define `start` script in `package.json` as this will be used by GCP.

    > Go to [console.cloud.google.com](console.cloud.google.com)

    > Navigate to the firebase project name!

    > Install gcloud cli.

```
gcloud --version
gcloud auth login
gcloud config set project <project-id>
gcloud app deploy
```
