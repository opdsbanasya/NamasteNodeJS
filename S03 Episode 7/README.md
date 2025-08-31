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

[**Previous**](../S03%20Episode%206/README.md)