# Episode-05 | Keeping our credentials safe

## What is `.env`

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

Here's a properly formatted version of your text with lists, code blocks, and clear organization:

## **Why Use `dotenv`?**

- **Never push credentials to GitHub** – This is a major security risk.
- The `dotenv` package securely stores credentials in a `.env` file.
- Credentials stored this way are called **environment variables**.
- `dotenv` loads these variables into `process.env` (Node.js global object), making them accessible anywhere in your project.

## **How to Use `dotenv`**

### **1. Installation**

```bash
npm install dotenv
```

### **2. Create a `.env` File**

- Store secret credentials in a `.env` file in the root directory.
- Format: `KEY=VALUE`
- Example:
  ```env
  DB_USER=admin
  DB_PASS=secret123
  # This is a comment (use '#' for comments)
  ```

### **3. Load `dotenv` in Your Application**

- Require `dotenv` at the **top** of your main file (e.g., `app.js`):
  ```javascript
  require("dotenv").config();
  ```

### **4. Access Environment Variables**

- Use `process.env.VARIABLE_NAME` to retrieve values.
- Example:
  ```javascript
  function connectToDB() {
    const dbUser = process.env.DB_USER;
    const dbPass = process.env.DB_PASS;
    console.log(`Connecting with ${dbUser}...`);
  }
  ```

## **Important Notes**

- **`.env` does not work in browsers** – It is **server-side only**.
- **Add `.env` to `.gitignore`** – Prevent accidental exposure.
- **Deploying to a remote server?**
  1. Connect to your remote machine (e.g., via SSH).
  2. Pull your code changes.
  3. Create a `.env` file on the remote machine:
     ```bash
     nano .env
     ```
  4. Paste your environment variables.
  5. Save and restart the server.

---

## `.gitignore` Entry\*\*

Don't forget to add `.env` in `.gitignore` file. This ensures your credentials stay secure and never get pushed to version control.

```gitignore
# Ignore .env files
.env
```
