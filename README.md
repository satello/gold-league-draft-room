Auction Room React/Redux app


Runs in conjunction with:

https://github.com/satello/gold-league-draft-server
(Golang server that facilitates an auction)

----
## Quickstart

1) update .env to include:
```
REACT_APP_SASS=true
REACT_APP_LESS=false
REACT_APP_STYLUS=false
REACT_APP_CSS_MODULES=false
REACT_APP_WS_ENDPOINT=<endpoint for websocket connection>
REACT_APP_API_ENDPOINT=<endpoint for http requests>
```

Note: Both REACT_APP_WS_ENDPOINT and REACT_APP_API_ENDPOINT should point to the same GoLang draft server. Likely the only difference in these two variables will be `ws://...` vs `http://...`

2)
```
npm install
npm run start
```
