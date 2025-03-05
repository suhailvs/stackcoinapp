# REACT Native tutorial

https://www.youtube.com/watch?v=sm5Y7Vtuihg

https://docs.expo.dev/

run `npx create-expo-app@latest`

* go to -> https://docs.expo.dev/get-started/set-up-your-environment/
* scan QR code and install the expo go app on android device

### start developing

https://docs.expo.dev/get-started/start-developing/

run `npx expo start`
* open expo app and scan qr code, it will show our app


install vscode extension ES7+ React/Redux/React-Native

### now edit file `app/(tabs)/index.tsx`

* remove all contents 
* type: rnfe
* rename index.tsx -> index.jsx

icon list: https://icons.expo.fyi/Index


### small layout page

```
import { Slot } from "expo-router";

export default function CoffeeLayout() {
    return <Slot />
}
```

fonts: github.com/expo/google-fonts

### Authentication

https://docs.expo.dev/router/reference/authentication/

`npm i expo-secure-store`

login themes from https://github.com/lumamontes/expo-router-auth

### android build

https://docs.expo.dev/build/setup/

```bash
$ npm install -g eas-cli
$ eas login
$ eas build -p android --profile preview
```

you can download the `apk` after some time at https://expo.dev/accounts/suhailvs/projects/stackcoinapp

https://docs.expo.dev/build-reference/apk/
