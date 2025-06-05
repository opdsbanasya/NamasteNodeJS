# Episode-09 | Encrypting Passwords with `bcrypt`
Passwords are very sensitive data, and storing them securely is crucial for any application. We can't store passwords in plaintext, there need to encrypt them in hash form before storing them in the database. 

Suppose, a user signup on our application, then first need to validate the credentials(username and password). As industry standard, sometime we create helper functios to sanitize the input data, like removing extra spaces, converting to lowercase, etc. After that, we need to hash the password using a hashing algorithm like `bcrypt`. Then we can store the hashed password in the database. Just hit the command to install the `bcrypt` library:

```bash
npm install bcrypt
```
It provides the `hash` method to hash the password that takes the password and a salt rounds value (no. of times the password will be hashed) as arguments. Here's an example of how to hash a password:

```javascript
const bcrypt = require('bcrypt');

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    // Validate date...

    // Hash the password
    const saltRounds = 10; // You can adjust the salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the data with hash password in the database
    // ...
    
    res.send('User created successfully');
});
```

## POST `/login` API
When a user tries to login, we need to validate the credentials again. We can use the `bcrypt` library to compare the entered password with the stored hashed password. If they match, we can allow the user to login. There is the `compare()` method in the `bcrypt` library that takes the entered password and the stored hashed password as arguments. Here's an example of how to implement the login functionality:

```javascript
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate date...

    // Fetch the user from the database
    const user = await User.findOne(email); // Assume this function fetches the user from the database

    if (!user) {
        throw new Error('Invalid username or password');
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.hashedPassword);

    if (isMatch) {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid username or password');
    }
});
```

**NEVER** say **"Your username is incorrect"** or **"Your password is incorrect"**. Instead, always say **"Invalid username or password"**. This is a security measure to prevent attackers from guessing valid usernames or passwords.