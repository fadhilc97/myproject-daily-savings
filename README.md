## User Requirements

**Functional**

- [x] As a user, I should login first to allow access entire savings application
- [ ] As a user, I should able to exit from the system by logging out
- [x] As a user, I want to record my savings daily, so I can see the savings progress
- [x] As a user, I want to see my savings list, so I got the insight about my savings
- [x] As a user, I want to see my total savings, so I can summarize the savings progress

**Non-Functional**

- Database using PostgreSQL
- Backend using Express
- Database library using `pg`
- Frontend using React
- Using TypeScript programming language
- CSS framework using Tailwind
- API Documentation using Swagger with OpenAPI conventions

## API Endpoints

- `GET /api/v1/savings`

  Description: Get all savings data

  Response:

  - Status code : 200 (OK)

    ```JSON
    {
      "status": "ok",
      "data": [
        {"date": "2023-01-01T00:00:00.000Z", "amount": 100000},
        {"date": "2023-01-02T00:00:00.000Z", "amount": 50000},
        {"date": "2023-01-03T00:00:00.000Z", "amount": 25000},
      ]
    }
    ```

- `GET /api/v1/savings/total`

  Description: Get savings amount total

  Response:

  - Status code : 200 (OK)

    ```JSON
    {
      "status": "ok",
      "data": {
        "total" : 175000
      }
    }
    ```

- `POST /api/v1/savings`

  Description: Create savings data

  Payload:

  ```JSON
  {
    "date": "2023-07-16T05:22:06.160Z",
    "amount": 100000
  }
  ```

  Response:

  - Status code : 201 (Created)

    ```JSON
    {
      "status": "created",
      "message": "Savings created successful."
    }
    ```

## Todos

### Functionality

- [x] Split code from index.ts to separate files
- [x] Use try-catch block when create savings data
- [x] Explore the best practice for routing implementation
- [x] Register user functionality
- [x] Login functionality
- [x] JWT implementation under auth service
- [x] Implement access token to protect the certain resources
- [x] Refresh token functionality
- [x] Create savings should store the current `user_id`
- [x] Get savings should filtered by current user login

### Refactoring

- [x] Create new `.d.ts` to override `Request` instance
- [x] Under `/src/controllers/auth` directory, separate controller files between `handleLogin` and `handleRegister` function
- [x] Under `/src/middleware/verifyJWT.ts` file, override `request` property with new attribute `user` currently login based on the current `access_token` payload. So it will be applied to other functions that need `Request` instance as first argument
- [x] When create new savings with `user_id`, utilize the `request` property to get the id

### Documentations

- [ ] Separate the API Endpoints section to other sub-sections
