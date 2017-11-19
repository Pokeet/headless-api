let adminDB = db.getSiblingDB('admin')

adminDB.createUser(
  {
    user: 'admin',
    pwd: 'GDuS$rYZYW8s?_=wz56_TSQD3EPywdV2',
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
    pwd: 'Zwk9mtg_d8Kpy5C7J7Dxy+EVq3_RMQuC',
    roles: [
      {
        role: 'readWrite',
        db: 'headless-api'
      }
    ]
  }
)
