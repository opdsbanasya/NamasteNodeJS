# Episode-01 | Launching AWS EC2 Instance and Deploying

## Cloud

Cloud is a place where we deploy our services, applications, and websites, so that they can be accessed from anywhere in the world. It is a virtual space that provides resources like servers, storage, and databases over the internet.

## Platforms

There are many cloud platforms available:

- **AWS (Amazon Web Services)**: A popular cloud platform that provides a wide range of services like computing power, storage, and databases.
- **Google Cloud Platform (GCP)**: A cloud platform that provides services like computing, storage, and databases.
- **Microsoft Azure**: A cloud platform that provides services like computing, storage, and databases
- **DigitalOcean**: A cloud platform that provides services like computing, storage, and databases.

We are using **AWS** over here, but you can use any cloud platform you like.

### Launching AWS EC2 Instance

To launch an AWS EC2 instance, follow these steps:

1. Go to the [AWS Management Console](https://aws.amazon.com/console/).
2. Create or log in to your AWS account.
3. Search for "EC2" in the search bar and click on "EC2".
4. Click on "Launch Instance".
5. Fill following details:

- \*Name\*\*: Give your instance a name, e.g., `my-aws-instance`.
- Choose an Amazon Machine Image (AMI). We will use the **Ubuntu Server 20.04 LTS** AMI.
- Choose an instance type. We will use the **t3.micro** instance type (which is free tier eligible).
- Create a key value pair. Download the `.pem` file and keep it safe, as it will be used to connect to the instance.
- Now you can see your key pair in the list.
- Click on "Launch Instance" to launch the instance.

6. Wait till the **Instance state** is `running` and the **Status Checks** are `3/3 checks passed`.
7. Click on **Intance ID** to go to the instance details page.
8. Here you can see the **Public IPv4 address** of your instance. This is the address you will use to connect to your instance.
9. Click on the **Connect** button on the top right corner of the instance details page.
10. Open your terminal and navigate to the directory where you saved the `.pem` file.
11. Chnage settings of the `.pem` file to read-only by running the command:

```bash
chmod 400 your-key-file.pem
```

12. Now you can connect to your instance using the command, find it on the **Connect** page:

```bash
ssh -i "your-key-file.pem" ubuntu@your-instance-public-ip
```

13. You will be connected to your instance, and you can now run commands on your instance.

## Setting up Node.js

To set up Node.js on your AWS EC2 instance, follow these steps:

1. Update the package manager:
   ```bash
   sudo apt update
   ```
2. Go to the [Node.js download page](https://nodejs.org/en/download) and copy the commands for the latest LTS version:

- Download and install nvm:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

- Close and reopen your terminal.
- Download and install Node.js:

```bash
  nvm install 22 # Replace 22 with the latest LTS version number
  node -v # To check the installed version
```

## Deploying Frontend

Follow these steps to deploy your frontend application on AWS EC2 instance:

1. Clone your frontend repository to the instance:

```bash
  git clone  https://www.github.com/your-username/your-frontend-repo.git
```
2. Navigate to the cloned repository:

```bash
  cd your-frontend-repo
```
3. Install the dependencies:

```bash
  npm install
```
4. You need to build your frontend application. If you are using React, run:

```bash
  npm run build
```
5. Install `nginx` to serve your frontend application:
```bash
  sudo apt install nginx
```
6. Start & enable the nginx service to start on boot and start the service:

```bash
  sudo systemctl start nginx
  sudo systemctl enable nginx
```
7. Now, copy the contents of the `build` folder to the nginx default directory:

```bash
  sudo scp -r build/* /var/www/html/
  # -r is used to copy directories recursively
```
8. Find your public IP address of the instance and open it in your browser. You should see your frontend application running. My IP address is [13.60.104.229](http://13.60.104.229). Go to see if your frontend is running.
9. `nginx` is running on port `80` by default, so you don't need to specify the port in the URL.
10. Click on **Instance ID** to go to the instance details page. Find the **security** group associated with your instance. Click on the **security group** to go to the security group details page.
11. Click on the **Inbound rules** tab and then click on **Edit inbound rules**.
12. Click on **Add rule** and select **HTTP** from the dropdown. This will allow incoming traffic on port `80`.
13. Click on **Save rules** to save the changes.
14. Now, you can access your frontend application using the public IP address of your instance.
