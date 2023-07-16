## User Requirements

**Functional**

- [ ] As a user, I want to record my savings daily, so I can see the savings progress
- [ ] As a user, I want to see my savings list, so I got the insight about my savings
- [ ] As a user, I want to see my total savings, so I can summarize the savings progress

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
        {"date": "01-01-2023", "amount": "100,000.00"},
        {"date": "02-01-2023", "amount": "50,000.00"},
        {"date": "03-01-2023", "amount": "25,000.00"},
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
        "total" : "175,000.00"
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
