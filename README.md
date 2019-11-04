# json-to-flat-sass

Generates "flat" sass variables from your JSON.

There's quite a few libraries around that generate Sass from a JSON files. This one provides support for older versions of Sass (<3.3) which do not support (Advanced Variable Functions)[https://sass-lang.com/documentation/variables#advanced-variable-functions]. 

TL;DR
This:
```
{ 
    "colours": {
        "red": {
            "100": "#ff4343";
            "200": "#e11f1f";
            "300": "#bf0c0c";
        }
    }
}
```
transforms to this:
```
$colours-red-100: "#ff1313"
$colours-red-200: "#e11f1f";
$colours-red-300: "#bf0c0c";
```



## Usage
### Install
```
yarn add @actuallyacat/json-to-flat-sass
```

### Usage
```
json-to-flat-sass <input> <output> [<optional-separator>]
```