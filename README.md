![calendar](https://github.com/Nshul/cricket-cli/blob/master/gifs/cricketcalendardemo.gif)

## Installation
---
```
git clone https://github.com/Nshul/cricket-cli.git
cd cricket-cli
npm install
npm link
```

Using link `cricket` would linked with this project and you can directly access it through cli

In case you would like to return back to normal
```
npm unlink
```
in the directory

## Get API
Kindly register on [cricapi](http://www.cricapi.com/) to get your API Key. Free API has limited Daily Requests.

In Order to set this api key for `cricket`
```
cricket configure --api <yourApiKey>
```

