db.createUser(
  {
    user: 'admin',
    pwd: 'GDuS$rYZYW8s?_=wz56_TSQD3EPywdV2',
    roles: [
      {
        role: 'userAdminAnyDatabase',
        db: 'admin'
      }
    ]
  }
)
db.createUser(
  {
    user: 'api',
    pwd: 'Zwk9mtg_d8Kpy5C7J7Dxy+EVq3_RMQuC',
    roles: [
      {
        role: 'readWrite',
        db: 'headlessCMS'
      }
    ]
  }
)
