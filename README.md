![calendar](https://github.com/Nshul/cricket-cli/blob/master/gifs/cricketcalendardemo.gif)

## Installation
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

## Usage

```
cricket <command> [args]

Commands:
  cricket calendar   Get Calendar for upcoming matches
  cricket configure  Set API for cricAPI

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]
```

**Command** **`calendar`**
```
Usage: cricket calendar [options]

Options:
  --version   Show version number                                      [boolean]
  -h, --help  Show help                                                [boolean]
  -d, --days  Number of days from today                                 [number]

Examples:
  cricket calendar -d 15
```
![calendar](https://github.com/Nshul/cricket-cli/blob/master/gifs/cricketcalendardemo.gif)

**Command** **`configure`**
```
Usage: cricket configure [options]

Options:
  --version        Show version number                                 [boolean]
  -h, --help       Show help                                           [boolean]
  --api, --apikey  API key as provided by cricApi                       [string]

Examples:
  cricket configure -api xxxxxxxxxxxxxx
```