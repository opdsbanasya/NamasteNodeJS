# Episode 15-19 | DevTinder UI
To build the UI for DevTinder, we will use following technologies:
- **React**: For building the user interface.
- **Redux**: For state management.
- **React Router**: For routing.
- **Axios**: For making API calls.
- **Tailwind CSS**: For styling the components.
- **Shadcn UI** & **Magic UI** & **Daisy UI**: For UI components.
- **Vite**: For bundling the application.
- **CORS**: For handling cross-origin requests.
- **Lucid Icons** & **React Icons**: For icons in the application.

## Making API calls
When you make an API call, from different orogin, you will get CORS error. To fix it, set CORS in backend server. Install the `cors` package in your backend server and use it in your server file.

```bash
npm i cors
```
Then use it in your server file:

```js
const cors = require("cors");
app.use(cors());
```

By this, you will be able to make API calls from different origin without any CORS error, but if you want to set cookies, you need to set some additional options in the `cors` middleware:

```js
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true, // Allow cookies to be sent
  })
)
```

When you make an API call, using `axios`, you need to set `withCredentials` to `true` to send cookies with the request:

```js
axios.get("http://localhost:5000/userData", {
  withCredentials: true, // To send cookies with the request
});
```

## Setting up React App
To set up a React app, use 
```bash
npm create vite@latest dev-tinder-ui --template react
```
- Follow the [Vite Documentation](https://vitejs.dev/guide/) for more details on setting up a Vite project.
- Here are the more references for setting up project:
  - [Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)
  - [Shadcn UI](https://ui.shadcn.com/docs/installation/vite)
  - [React Router](https://reactrouter.com/start/data/installation)
  - [Axios](https://www.npmjs.com/package/axios)
  - [Magic UI](https://magicui.design/docs/installation)
  - [Daisy UI](https://daisyui.com/docs/install/)
  - [Lucid Icons](https://lucide.dev/icons/)
  - [React Icons](https://react-icons.github.io/react-icons/)


## Setting up Redux
To set up a Redux store, follow the tutorial in the [Redux Tutorial](https://github.com/opdsbanasya/NamsteReact/blob/main/Episode%2012/README.md).
- Or you can use the [Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started) to set up a Redux store. It is the recommended way to set up a Redux store.

## Protecting Routes
To protect routes in React, you have to check if the user is logged in. If the user is not logged in, redirect them to the login page. Then write the following code in your `Body.jsx` file:
```js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Body() {
  const navigate = useNavigate();

  const handleUserData = async () => {
    try {
      // Fetching user data from the backend
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err.message);
    }
  };
  const handleUserFeed = async () => {
    try {
      // Fetching user feed data from the backend
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err.message);
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (location.pathname === "/signup") {
      return;
    }

    // If user is not logged in, redirect to login page
    if (!user) {
      handleUserData();
    }
    // If user is logged in, fetch user feed data
    if (!feed) {
      handleUserFeed();
    }
  }, [location.pathname, user, feed]);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default Body;
```