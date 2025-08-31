# Episode-02 | Deploying Backend

Follow the steps below to deploy the backend of your application.

1. Open the terminal in your project directory.
2. Connect to remote server using SSH
3. Navigate to the backend directory
4. Install dependencies:

```bash
npm install
```

5. Open the **MongoDB Atlas** dashboard and allow access from your server's IP address.
6. Start the backend server:

```bash
npm run start
```

7. Ensure you set the environment variables for your MongoDB connection string and any other necessary configurations in your server's environment.
8. Verify that the backend is running by accessing the API endpoints via a web browser or a tool like Postman.
9. Now, you can access your server with the public IP address and the port number where your backend is running (default is usually 3000).
10. But, there is a problem, if you exit the terminal,, your server will stop running.
11. So, we run our server in background using `pm2` package that keeps the server running even after you close the terminal.
12. Install `pm2` globally if you haven't already:

```bash
npm install pm2 -g
```

13. Start the server:

```bash
pm2 start npm --name "<name>" -- start
```

14. Some other commands:

```bash
# View logs
pm2 logs

# clear logs
pm2 flush name

# view all processes
pm2 list

# Stop the server
pm2 stop name

# pm2 delete name
pm2 delete name
```

## Mapping port to IP/Domain

let your frontend running on **http://42.33.33.20** and backend running on **http://42.33.33.20:3000**. If you map your IP/domain to port then you can access your backend without specifying the port number.

- frontend: **http://42.33.33.20**
- backend: **http://42.33.33.20/api**

Follow the steps below to map your backend to the IP/domain:
Edit the Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/default
```

- edit `server_name` `IP/domain` and `location /api/ {}`
- Paste the following configuration:

```nginx
server {
    listen 80;
    server_name your_domain_or_IP;

    location /api/ {
        proxy_pass http://localhost:3000/; # Change the port if your backend runs on a different port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

- Restart Nginx to apply the changes:

```bash
sudo systemctl restart nginx
```

## Connecting Frontend to Backend

Before we call localhost, instead of we use `/api`. To do this, edit the `BASE_URL` in `constants.js` file in your frontend project:

```javascript
export const BASE_URL = "/api";
```

- Build your project again and copy build to `/var/www/html` directory.
- Now, your can access your frontend and backend by your IP address.
- Frontend: "http://42.33.33.20"

---

[**Previous**](../S03%20Episode%201/README.md) | [**Next**](../S03%20Episode%203/README.md)