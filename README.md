## User Requirements

**Functional**

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

- [x] Split code from index.ts to separate files
- [x] Use try-catch block when create savings data
- [ ] Explore the best practice for routing implementation
- [ ] Implement logging, so we can track the request history
