# Nawaste API Spec

## 1. Users

| Field Name | Type     | Description                                                             |
| ---------- | -------- | ----------------------------------------------------------------------- |
| id         | ObjectId | Users ID                                                                |
| email      | string   | Users Email                                                             |
| password   | string   | Users Password                                                          |
| name       | string   | Users Name                                                              |
| roles      | array    | Users Roles                                                             |


### **a. User Login**

Request :

- Method : POST
- Endpoint : `/users/login`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Body :

```json
{
    "email": "contoh@mail.com",
    "password": "passwoRd123!@#"
}
```

Response :

```json
{
  "message": "success users login",
  "result": {
    "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJOYXdhc3RlIiwiaXNzIjoiMTAiLCJleHAiOjE2NDAwODEwNjYsImlhdCI6MTY0MDA4MTA2Nn0.yt6OtuvtPIeUncCeyCyMvLrT7dUwpo-7BLhSnkC_dzk"
  }
}
```

### **b. add User/Admin**

Request :

- Method : POST
- Endpoint : `/users`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Body :

```json
{
    "email": "contohadmin@mail.com",
    "password": "passwoRd123!@#",
    "roles": [2, 3]
}
```

Response :

```json
{
  "message": "success create users",
  "result": {
    "id": 3,
    "email": "contohadmin@mail.com",
    "roles": [
      {
        "id": 2,
        "name": "admin"
      },
      {
        "id": 3,
        "name": "moderator"
      }
    ]
  }
}
```

### **c. get All User/Admin**

Request :

- Method : GET
- Endpoint : `/users`
- Header :
  - Accept: application/json

Response :

```json
{
  "message": "success getAll users",
  "result": [
    {
      "id": 1,
      "email": "contoh1@mail.com",
      "roles": [
        {
          "id": 2,
          "name": "admin"
        },
        {
          "id": 3,
          "name": "moderator"
        }
      ]
    },
    {
      "id": 2,
      "email": "contoh2@mail.com",
      "roles": [
        {
          "id": 3,
          "name": "moderator"
        }
      ]
    },
    {
      "id": 3,
      "email": "contoh3@mail.com",
      "roles": [
        {
          "id": 3,
          "name": "moderator"
        }
      ]
    }
  ]
}
```

### **d. add Role to User/Admin**

Request :

- Method : POST
- Endpoint : `/users/:userId/roles`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Body :

```json
{
    "roles": [2, 3]
}
```

Response :

```json
{
  "message": "success addRole users",
  "result": {
    "id": 3,
    "email": "contohadmin@mail.com",
    "roles": [
      {
        "id": 2,
        "name": "admin"
      },
      {
        "id": 3,
        "name": "moderator"
      }
    ]
  }
}
```

### **e. delete Role from User/Admin**

Request :

- Method : DEL
- Endpoint : `/users/:userId/roles`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Body :

```json
{
    "roles": [3]
}
```
Response :

```json
{
  "message": "success deleteRole users",
  "result": {
    "id": 3,
    "email": "contohadmin@mail.com",
    "roles": [
      {
        "id": 2,
        "name": "admin"
      }
    ]
  }
}
```

## 2. Participants

| Field Name | Type     | Description                                                             |
| ---------- | -------- | ----------------------------------------------------------------------- |
| id         | ObjectId | Participants ID                                                         |
| email      | string   | Participants Email                                                      |
| name       | string   | Participants Name                                                       |
| eventId    | array    | Event ID                                                                |
| weight     | array    | Users Role                                                             |
| point      | array    | Users Point                                                             |


### **a. add Participants**

Request :

- Method : POST
- Endpoint : `/participants`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Body :

```json
{
    "email": "sayapeserta@mail.com"
}
```

Response :

```json
{
  "message": "success create participant",
  "result": {
    "id": 10,
    "email": "sayapeserta@mail.com"
  }
}
```

### **b. add Point to Participant**

Request :

- Method : POST
- Endpoint : `/participants/:participantId/point`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Body :

```json
{
    "eventId": 12,
    "weight": 50
}
```

Response :

```json
{
  "message": "success addPoint participant",
  "result": {
    "participant": {
      "id": 10,
      "email": "sayapeserta@mail.com"
    },
    "event": {
      "id": 12,
      "name": "Event Valentine"
    },
    "point": 25
  }
}
```

### **c. get All User/Admin**

Request :

- Method : GET
- Endpoint : `/participants/:participantId/point`
- Header :
  - Accept: application/json

Response :

```json
{
  "message": "success getAllPoint participant",
  "result": {
    "participant": {
      "id": 10,
      "email": "sayapeserta@mail.com"
    },
    "point": 123
  }
}
```

### **d. get Point from Participant ID in 1 Event**

Request :

- Method : GET
- Endpoint : `/participants/:participantId/point/event/:eventId`
- Header :
  - Accept: application/json

Response :

```json
{
  "message": "success getEventPoint participant",
  "result": {
    "participant": {
      "id": 10,
      "email": "sayapeserta@mail.com"
    },
    "event": {
      "id": 12,
      "name": "Event Valentine"
    },
    "point": 25
  }
}
```

## 3. Roles

| Field Name | Type     | Description                                                             |
| ---------- | -------- | ----------------------------------------------------------------------- |
| id         | ObjectId | Users ID                                                                |
| name       | string   | Users Role Name                                                         |


### **a. create Roles**

Request :

- Method : POST
- Endpoint : `/roles`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Body :

```json
{
    "name": "superAdmin"
}
```

Response :

```json
{
  "message": "success create role",
  "result": {
    "id": 1,
    "name": "superAdmin"
  }
}
```

## 4. Events

| Field Name | Type     | Description                                                             |
| ---------- | -------- | ----------------------------------------------------------------------- |
| id         | ObjectId | Users ID                                                                |
| name       | string   | Users Role Name                                                         |


### **a. create Events**

Request :

- Method : POST
- Endpoint : `/events`
- Header :
  - Content-Type: application/json
  - Accept: application/json

Body :

```json
{
    "name": "Event Valentine",
    "date": "14-02-2022"
}
```

Response :

```json
{
  "message": "success create event",
  "result": {
    "id": 1,
    "name": "Event Valentine",
    "date": "14-02-2022",
    "createdBy": {
      "id": 1,
      "email": "contohadmin@mail.com"
    }
  }
}
```

### **d. get Event By ID (also include points)**

Request :

- Method : GET
- Endpoint : `/events/:eventId`
- Header :
  - Accept: application/json

Response :

```json
{
  "message": "success get event by id",
  "result": {
    "id": 12,
    "name": "Event Valentine",
    "date": "14-02-2022",
    "createdBy": {
      "id": 1,
      "email": "contohadmin@mail.com"
    },
    "leaderBoard": [
      {
        "id": 1,
        "email": "participant1@gmail.com",
        "point": 99
      },
      {
        "id": 4,
        "email": "participant4@gmail.com",
        "point": 90
      },
      {
        "id": 10,
        "email": "participant10@gmail.com",
        "point": 80
      }
    ]
  }
}
```
