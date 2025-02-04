# REACT Native tutorial

https://www.youtube.com/watch?v=sm5Y7Vtuihg

https://docs.expo.dev/

run `npx create-expo-app@latest`

* go to -> ttps://docs.expo.dev/get-started/set-up-your-environment/
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
* copy images from https://github.com/gitdagray/react-native-course branch `lesson-2`


full code now after 39minutes in youtube video
index.jsx
```
import { View, Text, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import icedCoffeeImg from "@/assets/images/iced-coffee.png"
const app = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={icedCoffeeImg}
        resizeMode='cover'
        style={styles.image}
      >
      <Text style={styles.text}>Coffee shop</Text>
      </ImageBackground>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign:'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
})
```

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

https://docs.expo.dev/build-reference/apk/
