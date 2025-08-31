# Episode-08 | Data Sanitization and Validation

## Data Sanitization

Data sanitization is the process of cleaning and validating input data to ensure it is safe and conforms to expected formats. This is crucial for preventing security vulnerabilities such as SQL injection, cross-site scripting (XSS), and other forms of data manipulation.

## Data Validation

Data validation is the process of checking if the input data meets certain criteria or rules before it is processed. This can include checking data types, formats, ranges, and required fields.

## Adding checks to schema

1. `required`: Ensures that a field must be provided. Keep required true for fields that are mandatory like `name`, `email`, and `password`.

```js
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // This field is mandatory
  },
  // More fields...
});
```

2. `unique`: It ensures that the value of a field is unique across all documents in the collection. This is often used for fields like `email` or `username`.

```js
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // More fields...
});
```

3. `default`: It sets a default value for a field if no value is provided during document creation. This is useful for fields that should have a standard value.

```js
const userSchema = new mongoose.Schema({
  profilePhoto: {
    type: String,
    default:
      "https://i.pinimg.com/736x/6e/59/95/6e599501252c23bcf02658617b29c894.jpg",
  },
  // More fields...
});
```

4. `minLength` and `maxLength`: These validators ensure that the string length of a field is within specified limits. This is useful for fields like `password` or `username`.

5. `lowercase: true` and `uppercase: true`: These validators ensure that the string is in the specified case. This is useful for fields like `username` or `email`.

6. `trim: true`: This validator removes any leading or trailing whitespace from the string. It is useful for fields like `username` or `email`.

## Custom Validate functions

Custom validation functions allow you to define your own validation logic for fields. This is useful when you need to enforce specific rules that are not covered by built-in validators. Mongoose provides a way to define custom validation functions using the `validate` property in the schema definition.

```js
gender: {
  validate(value){
    if(!["Male", "Female", "Other"].includes(value)){
            throw new Error("Gender is not valid");
        }
  }
}
```

By default, validate functions only be called when a new document is created, for update to existing documents, it not be executes. To this, you have to pass the `runValidators: true` option when calling the `updateOne`, `updateMany`, or `findOneAndUpdate` methods.

```js
const user = await User.findByIdAndUpdate(req.body.userId, req.body, {
  returnDocument: "after",
  runValidators: true,
});
```

### Adding Timestamps

Mongoose provides a built-in option to automatically add `createdAt` and `updatedAt` timestamps to your documents. You can enable this feature by setting the `timestamps` option in your schema definition. You need to pass `timestamps: true` inside a object as the second argument to the `new mongoose.Schema()` constructor.

```js
const userSchema = new mongoose.Schema(
  {
    // Define your schema fields here...
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);
```

## API level validation

Let a user want to update their profile and he also want to update their email, this can be make a blunder for your server to manage user's email, so we can't allow user to update their email, we can only allow them to update their profile photo, first name, last name, and about. We can do this by validating the request body in the API endpoint.

```js
const data = req.body;
const allowedUpdated = [
  "firstName",
  "lastName",
  // add more fields that you want to allow for updates...
];
const isUpdatesAllowed = Object.keys(data).every((key) =>
  allowedUpdated.includes(key)
);

if (!isUpdatesAllowed) {
  throw new Error("Updates are not allowed");
}
```

- **Setting up limit to skills**: If you want to limit the number of skills a user can have, you can do this by checking the length of the `skills` array in the request body.

```js
if (data?.skills.length > 10) {
  throw new Error("Skill can't be more than 10");
}
```

## Validator library

There is `validator` library that provides a set of validation functions for common use cases. You can use it to validate email addresses, URLs, and other data types easily. Just hit the command below to install it:

```bash
npm install validator
```

- `isEmail`: Validates if a string is a valid email address.

```js
email: {
      type: String,
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid Email");
        }
      }
    },
```
- `isURL`: Validates if a string is a valid URL.
- `isStrongPassword`: Validates if a string is a strong password.
- There are many more functions available in the `validator` library. You can check the [official documentation](https://www.npmjs.com/package/validator) for more details.

---

[**Previous**](../S02%20Episode%207/README.md) | [**Next**](../S02%20Episode%209/README.md)