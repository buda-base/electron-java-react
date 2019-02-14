# electron app executing java functions with react+redux+flow front-end

## Install & Run

### Prerequisites

* `node` https://nodejs.org/en/download/package-manager/
* `nvm` https://github.com/creationix/nvm/
* `yarn` https://yarnpkg.com/lang/en/docs/install

### Renderer app

This part is a standard `react+redux+flow` app.<br>
To install & run, use:
```
cd renderer/
yarn install
yarn start
```
You can preview app at `http://localhost:3000` in your browser.<br>
Note that main menu won't be available though.

If something fails and you want to start all over again, clean with:
```
rm -rf node_modules/ yarn.lock
```
### Main app

Due to compatibility issues with `node-java` module that need to be further investigated, for now you must first switch to `node` version 8.12 and `npm` version 4.0.2:
```
cd main/
nvm install 8.12
```
Check actual versions with:
```
node -v
npm -v
```
If needed you can temporary force `npm` version with:
```
npm install -g npm@4.0.2
```
Then install & rebuild & run:
```
npm install
npm rebuild --runtime=electron --target=1.4.15 --disturl=https://atom.io/download/atom-shell --build-from-source
npm start
```
If something fails and you want to start all over again, clean with:
```
rm -rf node_modules/ package-lock.json
```

## Development

A short presentation about using `react+redux+flow` can be found [here](https://docs.google.com/presentation/d/15nekyNBE-ZFrgQYsVuwIH1Qci9GXjxAbsqIaqV_rKqI/edit?usp=sharing).

### Flow

To run `flow` use:
```
cd renderer/
yarn flow
```
Note that only files that begin with `//@flow` will be checked.

If `flow` server is not responding you can stop it and start it again using:
```
yarn flow stop
yarn flow
```
