# Episode-07 | Payment Gateway Integration (Razorpay)

## What is the Payment Gateway?
A payment gateway is a service that authorizes and processes credit card or direct payments for online businesses, e-commerce platforms, or brick-and-mortar stores. It acts as a bridge between the customer and the merchant, ensuring secure transactions by encrypting sensitive information like credit card numbers and personal details.

### Things to Remember
When a payment is done through a payment gateway, it takes 2 steps:
1. **Create Order**: The payment gateway creates an order with the amount and currency.
2. **Payment verification**: The payment gateway verifies the payment details and processes the transaction. It can happnen on server, can't do on frontend.
```javascript
Server (Secret Key) -> Payment Gateway
```

## Razorpay
Razorpay is a popular payment gateway in India that allows businesses to accept, process, and disburse payments with its product suite. It provides a seamless experience for both merchants and customers, supporting various payment methods like credit/debit cards, net banking, UPI, and wallets.

I use Razorpay for payment gateway integration in this project. To integrate it, follow these steps:
1. Go to [Razorpay](https://razorpay.com/) and create an account.
2. It ask you to fill some details about your business like `phone number`, `Aadhar verification`, `bank details`, `website name`, `privacy policy`, `terms and conditions`, etc.
3. It can take 3-4 days to verify your account.
4. Once your account is verified, Go to **Dashboard** and click on Settings. Make sure `Test Mode` is enabled.

---

### Working
- When you click on pay button, client make an API call and ask to server for creating an order. Server make an APi call to Razorpay with secret key.
- Razorpay creates an order and send back the order details to server.
- when you click on pay butter, client make an API call and ask to sei Ver to create an API call to razempay with segetteg order. server make an Razorpay sends back an order Id with other detail of order.
- Once server recieves this order Id, sends to frontend and frontend open payment dialogue box.
- Once payment done, Razorpay tells to server immediately. Razerpay has `Webhooks` that inform to server. It send paymed Id with signature.
- Now server will verify if payment is completed, if done, mark as Premium User.
- After few seconds, frontend ask to server, whether payment is verified or not, server returns failure and Success.

### Implementation
1. Create UI for payment button.
2. On server side, create a route for payments and require it to `app.js`.
3. Create an API eg. `payment/create`.
4. Razor pay provide SDK for Node.js, install it using `npm i razorpay`.
5. Create a file `Razorpay.js` and an instance of Razorpay using `key_id` and `key_secret` from Razorpay dashboard. To get credentials, follow the steps:
  - Go to Razorpay Dashboard.
  - Click on Account & Settings.
  - Click on API Keys.
  - Click on Generate Key.
  - Copy the `Key ID` and `Key Secret`, keep these into environment variables.
    ```js
    var instance = new Razorpay({
    key_id: 'YOUR_KEY_ID',
    key_secret: 'YOUR_KEY_SECRET',
    });
    ```
6. Create an order, require razorpay instance and use `instance.orders.create()` method to create an order. It takes an object with `amount`, `currency`, and `receipt` as parameters.
    ```js
    const options = {
        amount: 50000,  // amount in the smallest currency unit eg. 50000 paise = INR 500
        currency: "INR",
        receipt: "order_rcptid_11"
    };
    const order = await instance.orders.create(options, function(err, order) {
        console.log(order);
    });
    ```
7. Storing Payment Details
    - Create an schema and model for payment details with fields like `paymentId`, `orderId`, `status`, and `userId`, `currency`, `reciept`, `notes`, etc.
    - Register an payment to db with all fields and save it.
    - send response.
8. Making API Call
    - Set click handler on pay button.
    - Write logic to create order.
    - Pass membership type and make your API dynamic using type.
    - Never pass amount from frontend.
9. Open Checkout UI
    - Razorpay doesn't provide any package for React, so add CDN in `index.html` at head section
    ```html
    <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    ```
    - Copy the code from [Razorpay Docs](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/configure-payment-methods/sample-code/)
    ```js
    var options = {
        key: publicKeyId,
        amount,
        currency,
        description: "Test Transaction",
        order_id: orderId,
        prefill: {},
        notes,
        theme: {
          color: "#3399cc",
        },
        handler: verifyPremium,
    };

    var rzp = new Razorpay(options);
    rzp.open();
    ```
- For Complete code, refer to:
    - [paymentRouter.js](https://github.com/opdsbanasya/devBandhan/blob/main/backend/src/routes/paymentRouter.js#L12). 
    - [Premium.jsx](https://github.com/opdsbanasya/devBandhan/blob/main/frontend/src/Components/ui/Premium.jsx#L28).

### Payment Verification
Razorpay uses `Webhooks` to inform payment status to us, because we don't know when payment is either successful or failed. we need to set the web hooks.
1. Go to **Razorpay Dashboard** > **Account & Settings** > **Webhooks**.
2. Click on **Add New Webhook**.
3. Add your webhook URL eg. `https://yourdomain.com/api/payment/verify`, this is an API endpoint URL that called by Razorpay to inform payment status.
4. Select the events you want to subscribe to, for payment verification, select `Payment authorized`, `Payment captured`, and `Payment failed`.
5. Also you can add secret to verify that the request is coming from Razorpay.
6. On server side, create an API endpoint eg. `/payment/verify` to handle webhook requests.
7. Razorpay SDK provide `validateWebhookSignature` method in `razorpay-utils` package, it take 3 things:
    - `webhookBody`: req.body
    - `webhookSignature`: req.headers['x-razorpay-signature']
    - `webhookSecret`: your webhook secret
    ```js
    const webhookSignature = req.header("X-Razorpay-Signature");
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.SECRET_KEY
    );
    ```
8. Razorpay gives access of event to us, you can access this from `req.body`.
9. Save the status to database.

10. If somebody try to call the payment verification API endpoint, then it will failed because razorpay only call this API.
> Refer the full Code [**paymentRouter.js**](https://github.com/opdsbanasya/devBandhan/blob/main/backend/src/routes/paymentRouter.js#L57)

### Payment Verification API
- Also create an API to confirm payment status on server. 
- Razorpay instance also gives some handler functions that runs on success, make API call inside this on frontend.
> [**Payment Verification API Call Code**](https://github.com/opdsbanasya/devBandhan/blob/main/frontend/src/Components/ui/Premium.jsx#L52)

## Reference
- [Razorpay.com](https://dashboard.razorpay.com/)
- [Razorpay Payment Gateway Docs](https://razorpay.com/docs/payments/payment-gateway/)
- [**Payment Creation & Verification Code**](https://github.com/opdsbanasya/devBandhan/blob/main/backend/src/routes/paymentRouter.js). 
- [**Payment Verification API Call Code**](https://github.com/opdsbanasya/devBandhan/blob/main/frontend/src/Components/ui/Premium.jsx#L52)

---

[**Previous**](../S03%20Episode%206/README.md)
