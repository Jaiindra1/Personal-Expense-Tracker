**Personal Expense Tracker**
A RESTful API built with Node.js and Express.js for managing personal financial records. Users can record income and expenses, retrieve past transactions, and get summaries by category or time period.

**Features**
> Add, update, delete, and retrieve income and expense transactions.
> Get summaries of total income, total expenses, and balance.
> Filter summaries by date range and category.
> (Optional) Basic user authentication.
> (Optional) Pagination for transactions.
> (Optional) Generate monthly reports.

**Technologies Used**
> Backend: Node.js, Express.js
> Database: SQLite or MongoDB
> Documentation: Postman
Prerequisites
> Node.js installed (v12 or higher)
> npm (Node Package Manager)
> SQLite (for local database

**API Endpoints**

    - `POST /transactions`: Adds a new transaction (income or expense).
> ![Screenshot 2024-10-22 210517](https://github.com/user-attachments/assets/7bebe54b-6f15-4285-a971-1a92b1012990)
    - `GET /transactions`: Retrieves all transactions.
> ![Screenshot 2024-10-22 210901](https://github.com/user-attachments/assets/5c9beb23-1c21-486f-8ad3-e360f92310b5)
    - `GET /transactions/:id`: Retrieves a transaction by ID.
> ![Screenshot 2024-10-22 211237](https://github.com/user-attachments/assets/5aabec9b-7545-4dbb-a239-8339efeec426)
    - `PUT /transactions/:id`: Updates a transaction by ID.
>![Screenshot 2024-10-22 211632](https://github.com/user-attachments/assets/67e7e3de-d263-429c-bcfa-6a9c45dced70) 
    - `DELETE /transactions/:id`: Deletes a transaction by ID.
>![Screenshot 2024-10-22 211836](https://github.com/user-attachments/assets/4f5fec5d-a5da-4dc5-a8d3-2d01cd7cf07d)
    - `GET /summary`: Retrieves a summary of transactions, such as total income, total expenses, and balance. Optionally, this can be filtered by date range or category.
> ![Screenshot 2024-10-22 212106](https://github.com/user-attachments/assets/fc60eeba-f6d0-4f35-8f10-deab7c721b2f)
