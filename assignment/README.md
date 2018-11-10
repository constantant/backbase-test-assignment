# Backbase Front End Assignment: Make A Transaction

## Assignment Purpose

The purpose of this test is to show off your level of front-end development skills and to show your knowledge of modern front-end frameworks and practices.

## Brief Description

For this assignment you need to develop a single page application according to the provided design with the functionality of transferring money and showing the past transactions in a historical transactions list.

## Functional Requirements

### Transfer Money

As a user I should be able to transfer money using the Transfer Money form as shown in the UI Design.

---

As a User I should be able to:

1. Fill in the "TO ACCOUNT" and "AMOUNT" fields of the form. 
    - Assume that the "FROM ACCOUNT" field is pre-filled with the data shown in the UI Design and is DISABLED.
2. Press "Submit" and preview the entered data.
3. Press "Transfer" on the preview screen. 
    - When transfer is pressed the new transfer should appear at the top of the transactions list, and the balance in the "FROM ACCOUNT" field should have decreased by the amount of the transfer.

Non functional requirements:

- Reset the form to its initial state after the transfer has been completed successfully.
- A User shouldn't be able to transfer money beyond a balance of $ -500.00.

### Transaction History

As a User I should be able to view recent transactions in an ordered list.

As a User I should be able to search my recent transactions by typing a keyword in the search field.

As a User I should be able to sort by recent transactions by Date, Amount and Beneficiary by clicking the corresponding sorting action.

---

As a User I should be able to:

1. View a list of my recent transactions.
    - Mock data is provided in the "mock" folder.
2. See the transactions list updated with the new transaction when a new money transfer has taken place.
3. Filter the transactions list by typing a keyword in the Search field.
    - The transactions list should update immediately at every keystroke.
4. Clear the filter by clicking an 'x' icon in the Search field.
4. Sort the transactions list by Date, Beneficiary and Amount.

Non functional requirements:

- The Sorting order (ascending/descending) should be persistent across all sorting options

## Technology Restrictions

### Read Carefully!

- Design your application anyway you want, but focus on clean, reusable code. You code should be DRY, with a focus on frontend best practices.
- We want to see your application written in Angular 1.5.x. If you still prefer to write your application in Angular2 then you have to explain clearly and with strong arguments why you've chosen for this in the README. We don't accept the assignment written in any other JS framework.
- You are free to use any CSS frameworks or libraries, but the final result needs to be directly useable in "index.html".
- Responsiveness is required in this assignment! It's up to you how to adjust the UI of the design or if you choose a mobile first approach.
- Create a "README.md" file that explains what you’ve done and to provide any motivations or decisions you've made. Use this to elaborate on your opinions!
- Dependency management tools and task runners are okay to use for your own development purposes, but make sure your project is able to run in the browser by opening the "index.html" file or by running a single command from the CLI. Your README should have clear instructions explaining how to run your application!
- Make sure your delivered package contains an unminified and human readable version of your source code.
- Scaffolding tools, like yeoman or boilerplate templates, are not allowed!

## Helpful Information

- The design to be developed is provided as a PNG for quick reference in the "design" folder.
- Images and icons have been provided in the assets folder. Transaction images are provided as base64 images in the transaction JSON.
- The font for the UI Design can be found on Google fonts: https://fonts.google.com/specimen/Kanit
- There should be no need for a backend in this project.

## Good luck!

... and show us what you got!
