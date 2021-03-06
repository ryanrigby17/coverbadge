# coverbadge
Create a coverage badge without any service provider.

[![CircleCI](https://circleci.com/gh/kevin940726/coverbadge.svg?style=shield)](https://circleci.com/gh/kevin940726/coverbadge)

## See it in action

[![coverage](https://circleci-tkn.rhcloud.com/api/v1/project/kevin940726/coverbadge/tree/master/latest/artifacts/badge.svg)](https://circleci-tkn.rhcloud.com/api/v1/project/kevin940726/coverbadge/tree/master/latest/artifacts/index.html)

> 💯  Coverage increased (+1.81%) to 100%.

## Installation

```sh
yarn add -D coverbadge
# OR
npm install --save-dev coverbadge
```

## Usage

```sh
cat coverage/lcov.info | coverbadge [-o <outputPath>]
```

### `-o`, `--out-file`

Specify output path to save the badge image. Defaults to `badge.svg` under your project root.

`-o coverage/badge.svg` will output the image under your `coverage` folder.

> If you want it to calculate the difference between current and last coverage, you should not delete the old svg path for every build. If you put it in `coverage` folder and your script remove the folder for every test, you will have to copy the image before removing it, and paste it back to folder immediately after tests and before running this program.

## Author

Kai Hao

## License

MIT
