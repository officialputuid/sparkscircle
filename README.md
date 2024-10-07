# sparkscircle

## Installation
```bash
sudo apt update -y && sudo apt install nodejs -y
git clone https://github.com/officialputuid/sparkscircle && cd sparkscircle && npm i
```

## Configuration
- Add `authorization|query_id=xxxx` or `authorization:|user_id=xxxx` to `data.txt`.
- Set proxies in `proxy.txt`: `http://user:pass@ip:port`.

## Usage
| | |
|----------------------------|----------------------------|
| `node sparkscircle`        | Start sparkscircle.        |
| `node sparkscircle-proxy`  | Start with proxy support.  |
