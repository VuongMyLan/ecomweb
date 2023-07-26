
#  Ecommerce Groceries and Recipes Website

Welcome to My React Project! This is a website where you can shop favourite groceries and find recipes for your meals



## Demo

You can find link demo here:
https://auroralan.netlify.app/


## Tech Stack

**Client:** React, HTML/CSS, TailwindCSS, Ant Design library,

**Server:** Firebase (Authentication), Cloud Firestore, Firebase Storage


## API Reference
URL: https://api.edamam.com

I use public API for: 

#### Search recipes


```http
  GET /api/recipes/v2
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `app_id` | `string` | **Required**. Your application ID |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `app_id` | `string` | **Required**. Your application ID |
| `api_key` | `string` | **Required**. Your API key |
| `id`      | `string` | **Required**. Id of item to fetch |




## Features

- Sign up / Log in
- Forget Password and Reset Password
- Update, add, delete products in shopping cart
- Filter products based on categories
- See detail of Product in Product detail Page
- Checkout and Order products
- Check orders stage in order detail Page
- Update user's profile 
- Search Recipes 
- Add recipes to favourite recipes
- Add ingredients to shopping lists



## Installation

Clone repository from GitHub 

```bash
 git clone https://github.com/VuongMyLan/ecomweb.git
```
    
Install node modules

```bash
 npm install
```

 Build application

```bash
 npm start
```

Document depencies
- Because the project use Firebase so that the project requires Firebase integration and list the necessary steps for other users to set it up.

```bash
 1. Go to firebase console: https://console.firebase.google.com/ to create a project and following the necessary steps.
 2. create a firebase.js and initialize firebase to your project
```



## Screenshots

Home Page

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/readme%2FHomePage.png?alt=media&token=dfea4849-752d-4871-b181-b6f607fea824)

Product Detail Page
![App Screenshot](https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/readme%2FProductDetailPage.png?alt=media&token=40b33933-6651-42c4-a9c1-9417b8403fa9)

Log In Page
![App Screenshot](https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/readme%2FLog%20In%20Page.png?alt=media&token=7a5f4fa7-2033-49a8-8e34-2130103bdc58)

Recipes Search Page
![App Screenshot](https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/readme%2FRecipesSearch.png?alt=media&token=85ad3b40-8826-4a4b-8b49-efe5a6097f28)

Shopping Cart Page
![App Screenshot](https://firebasestorage.googleapis.com/v0/b/ecomweb-b7f55.appspot.com/o/readme%2FCart%20Page.png?alt=media&token=db165f5a-79db-4d8d-9f3f-18d273f02dd2)
## Authors

- [Vuong My Lan - Aurora](https://github.com/VuongMyLan)

