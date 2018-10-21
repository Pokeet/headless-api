let apiDB = db.getSiblingDB('headless-api')

apiDB.createUser(
  {
    user: 'api',
    pwd: 'password',
    roles: [
      {
        role: 'readWrite',
        db: 'headless-api'
      }
    ]
  }
)