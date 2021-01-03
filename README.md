# Available Templates (branch-name)
- react to heroku deploy (react-heroku)
- next to heroku deploy (next-heroku)
- express serverless (express)
- python serverless (python)

# Heroku deploy
- add a .env file and add `GENERATE_SOURCEMAP=false` to prevent source code from being deployed
- setup package.json start script

```
heroku create [APP_NAME_HERE]
heroku git:remote -a [APP_NAME_HERE]
heroku config:set KEY=sample123
git push heroku main
```