const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qf8hqc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const database = client.db('bistroDB');
        const menuCollection = database.collection('menus');
        const reviewCollection = database.collection('reviews');
        const cartCollection = database.collection('carts');
        const userCollection = database.collection('users');

        // Custom Middlewares
        const verifyToken = (req, res, next) => {
            // console.log('inside verify token:', req.headers.authorization);
            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'unauthorized access' });
            }
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(401).send({ message: 'unauthorized access' });
                }
                req.decoded = decoded;
                next();
            });
        }

        // use verifyAdmin after verifyToken
        const verifyAdmin = async (req, res, next) => {
            const email = req.decoded.email;
            const query = { email: email };
            const user = await userCollection.findOne(query);
            const isAdmin = user?.role === 'admin';
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            next();
        }

        // JWT related api
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
            res.send({ token });
        })

        /*------------------------------ 
            Menu Collection API
        -------------------------------*/

        // Get all menus data
        app.get('/menus', async (req, res) => {
            const cursor = menuCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // Get specific menu data by its id
        app.get('/menus/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: id };
            const result = await menuCollection.findOne(query);
            res.send(result);
        })

        // Create or add a new menu in the menu collection
        app.post('/menus', verifyToken, verifyAdmin, async (req, res) => {
            const menu = req.body;
            const result = await menuCollection.insertOne(menu);
            res.send(result);
        })

        // Patch (Change) some fields of any document by its id
        app.patch('/menus/:id', async (req, res) => {
            const id = req.params.id;
            const menu = req.body;
            // console.log(menu);
            const filter = { _id: id };
            const updatedMenu = {
                $set: {
                    name: menu.name,
                    category: menu.category,
                    price: menu.price,
                    recipe: menu.recipe,
                    image: menu.image
                }
            }
            const result = await menuCollection.updateOne(filter, updatedMenu);
            res.send(result);
        })

        // Delete a specific menu item by its id
        app.delete('/menus/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await menuCollection.deleteOne(query);
            res.send(result);
        })

        /*----------------------------- 
            Review Collection API
        -------------------------------*/

        // Get all reviews data
        app.get('/reviews', async (req, res) => {
            const cursor = reviewCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        /*----------------------------
            Cart Collection API
        -------------------------------*/

        // Get all cart data from cart collection by user email
        app.get('/carts', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const cursor = cartCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // Insert a new food item to the cart collection
        app.post('/carts', async (req, res) => {
            const cartItem = req.body;
            const result = await cartCollection.insertOne(cartItem);
            res.send(result);
        })

        // Delete Specific cart item 
        app.delete('/carts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await cartCollection.deleteOne(query);
            res.send(result);
        })

        /*-------------------------- 
            User Collection API
        -----------------------------*/

        // Get all the user information from DB
        app.get('/users', verifyToken, verifyAdmin, async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        // Check the user is admin or not
        app.get('/users/admin/:email', verifyToken, async (req, res) => {
            const email = req.params.email;
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            const query = { email: email };
            const user = await userCollection.findOne(query);
            let admin = false;
            if (user) {
                admin = user?.role === 'admin';
            }
            res.send({ admin });
        })

        // save (POST API) the user information to the DB
        app.post('/users', async (req, res) => {
            const user = req.body;

            /* Insert email if user does not exist */
            const query = { email: user.email };
            const existingUser = await userCollection.findOne(query);
            if (existingUser) {
                return res.send({ message: 'user already exists', insertedId: null });
            }

            const result = await userCollection.insertOne(user);
            res.send(result);
        })

        // Make a specific user admin from users collection 
        app.patch('/users/admin/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc);
            res.send(result);
        })

        // Delete the specific user by its id from user collection
        app.delete('/users/:id', verifyToken, verifyAdmin, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Bistro Boss Restaurant is running');
})

app.listen(port, () => {
    console.log(`Bistro Boss is running on the PORT: ${port}`);
})