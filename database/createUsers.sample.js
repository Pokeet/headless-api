let adminDB = db.getSiblingDB('admin')

adminDB.createUser(
  {
    user: 'admin',
    pwd: 'admin-password',
    roles: [
      {
        role: 'root',
        db: 'admin'
      }
    ]
  }
)

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
