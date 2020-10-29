# health-checker-app

Contributor notes:

## WARNING: DO NOT MERGE TO MASTER UNLESS APP IS READY TO DEPLOY

ONLY FIRST TIME: git clone https://github.com/Group-Project-p1w1-hacktiv8/health-checker-app.git  

Always pull first to stay up to date with `development` branch
`git pull origin development`

Always edit in each feature branches `git checkout -b "dev-<feature_name>"` e.g.:  
sign-up : `git checkout -b "dev-signup"`  
sign-in : `git checkout -b "dev-signin"`  
Check if feature completed, then do `git add .` `git commit -m "single-line comment"` `git push origin "dev-<feature_name>"`  
  
NOTE: for multi line comment do commit with `git commit` then insert comment before `Please enter the commit message ...`, comment example:  
`1. add register in form html`  
`2. add register function in main.js`  
next `ctrl+c or command+c` then `wq` (write and quit) then push  
  
Create pull request by doing compare `base:development <- compare:branch_name` on github repo. Pull request title `<feature-name>`, description same as commit comment. Example:  
``Title: Register feature``  
``Description:``  
`1. add register in form html`  
`2. add register function in main.js`  
  
Choose `Merge pull request` to update `development` branch, make sure there isn't any conflict, if there is conflict please contact other contributors.  
  
# Dir structure
```bash
health-checker-app
├── README.md (INSTRUCTION)
├── .gitignore 
├──client
│   ├── index.html
│   └── main.js
└──server
    ├── config
    │   └── config.json
    ├── migrations (file name kebab-case, create using sequelize cli)
    ├── seeders (file name kebab-case, create using sequelize cli)
    ├── helpers (file name camelCase)
    ├── routes (file name camelCase, create another router if needed)
    │   └── index.js
    ├── controllers (filename PascalCase singular)
    │   └── Controller.js
    ├── models (file name PascalCase singular, create using sequelize cli)
    │   ├── index.js
    │   ├── game.js
    │   ├── usergame.js
    │   └── user.js
    ├── package-lock.json
    ├── game-store-scheme.png
    ├── README.md (API DOC HERE)
    ├── package.json
    ├── app.js
    └── node_modules
```

### If there is other instruction needed feel free to add 