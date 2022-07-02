# Liens utiles

[Documentation de React Native](https://reactnative.dev/docs/getting-started)  
[Documentation des composants React Native](https://reactnative.dev/docs/components-and-apis)  
[Documentation Flexbox ReactNative](https://reactnative.dev/docs/flexbox)  
[Documentation de la FlatList React Native](https://reactnative.dev/docs/flatlist)  
[Documentation des Hooks](https://fr.reactjs.org/docs/hooks-intro.html)  
[Documentation de react-navigation](https://reactnavigation.org/docs/en/getting-started.html)  
[Documentation API Fetch](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)  

[Feuille récap des propriétés pour les styles](https://github.com/vhpoet/react-native-styling-cheat-sheet)


# Get started - CRNA

## Les outils

Installez [Node.js (LTS).](https://nodejs.org/en/download/)  

Installez **Expo**:

```
npm install -g expo-cli
```

Installez un **éditeur de texte** pour développer en JavaScript. Je recommande Visual Studio Code mais vous êtes libre de choisir une autre solution (Atom, IntelliJ...).

Si vous êtes sur macOS, il vous faudra également [installer Watchman](https://facebook.github.io/watchman/docs/install#buildinstall).

Sur votre téléphone / tablette, téléchargez **l'application Expo**.
Passez le téléphone en mode développeur.  
Si vous souhaitez utiliser un émulateur Android, installez Android Studio. Vous pouvez suivre [ce tutoriel](https://docs.expo.dev/workflow/android-studio-emulator/) pour configurer votre émulateur.

## Création du projet

Initialisez votre projet (template blank):

```
expo init nomdudossier
```


## Lancer l'application

Placez-vous dans un terminal, dans le dossier de votre projet:

```
expo start
```

Si vous êtes sur le même réseau WiFi, scannez le QR code avec Expo depuis la tablette. Sinon passez en mode tunnel dans l'interface web ouverte par Expo, puis scannez le QR code.

## Menu des options de debug

Pour ouvrir le menu d'options de debug, secouez l'appareil.

## Live reloading

Pas besoin de compiler du JS. Une application React Native se recharge dès que vous faites un changement.

Dans le fichier _App.js_, modifiez:

```
<Text>Open up App.js to start working on your app!</Text>
```

par:

```
<Text>Bonjour à vous les GI</Text>
```

puis sauvegardez. L'application est re-rendu et le changement s'affiche à l'écran.

# Application

## Premier composant

Objectif, réaliser ce composant:

<img src="imgs/search1.png" height="400" />

Par convention et réutilisabilité:
* 1 composant = 1 fichier
* nom du fichier contenant un composant commence par une majuscule

Créez un dossier _src_, puis un dossier _components_, puis le fichier _Search.js_ (src/components/Search.js).

Il existe 2 façons pour écrire un composant: l'écrire sous forme de **class** ou sous forme de **function**. Voici un _Hello World_ représentant ces 2 méthodes:

```
//Class

import React, { Component } from 'react';
import { Text, View } from 'react-native';

class HelloWorldApp extends Component {
  render() {
    return (
      <View>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

export default HelloWorldApp;
```

```
//Function

import React from 'react';
import { Text, View } from 'react-native';

const HelloWorldApp = () => {
  return (
    <View>
      <Text>Hello, world!</Text>
    </View>
  );
}

export default HelloWorldApp;
```

Bien que la forme de class doit être plus familière, cette méthode est déconseillée depuis l'introduction des **Hooks** en mars 2019. Nous verrons cela plus tard, prennez donc l'habitude d'écrire vos composants sous forme de functions.

Notez également l'utilisation d'une **arrow function**:

```
//Function

function myFunction () {
  return 'Hello';
}
```

```
//Arrow function

const myArrowFunction = () => {
  return 'Hello';
}
```

C'est une autre façon d'écrire les fonctions en JS, avec quelques subtilités comme la syntaxe, le contexte ou le passage d'arguments.  
Pour l'instant utiliser une _function_ ou une _arrow function_ ne change rien, mais par la suite cela aura un impact. Par défaut, utilisez **toujours des _arrow functions_ pour écrire vos composants.**

N'oubliez pas d'importer les composants React et React native en premiers dans vos composants. React Native exporte ses composants dans un seul fichier 'react-native'. 

```
import React from 'react';
import { View, TextInput, Button } from 'react-native';
```

Il faut maintenant décrire le contenu de notre composant:

```
return (
  <View>
    <TextInput placeholder='Terme à chercher'/>
    <Button
      title='Rechercher'
      onPress={() => { console.log('Coucou'); }}
    />
  </View>
);
```

La propriété _onPress_ attend une fonction à exécuter lors d'un appui sur le bouton. J'ai ici utilisé l'avantage syntaxique des arrow functions, mais j'aurais pu écrire:

```
maFonction = function() {
  console.log('Coucou');
};

...
    <Button
      title='Rechercher'
      onPress={maFonction}
    />
...
```

On termine par exporter notre composant pour l'utiliser dans l'application:

```
export default Search;
```

Import et utilisation dans App.js:

```
import Search from './src/components/Search';

export default function App() {
  return (
    <View style={styles.container}>
      <Search />
      <StatusBar style="auto" />
    </View>
  );
}
```

<details>
<summary>Code complet</summary>

```
//Search.js

import React from 'react';
import { View, TextInput, Button } from 'react-native';

const Search = () => {
  return (
    <View>
      <TextInput
        placeholder="Terme à chercher" />
      <Button
        title="Rechercher"
        onPress={() => { console.log('Coucou'); }} />
    </View>
  );
};

export default Search;
```

```
//App.js

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Search from './src/components/Search';

export default function App() {
  return (
    <View style={styles.container}>
      <Search />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 24, // correction barre d'état
  },
});
```

</details>
<br>

Après sauvegarde des fichiers, vous pouvez observer le résultat directement sur votre appareil. J'ai corrigé le soucis avec la barre d'état dans le _style_ du fichier App.js, on verra cela plus tard.


### Exercice: s'entrainer sur un composant custom

Créez un nouveau composant Test.js et faite en sorte d'obtenir le résultat suivant:

<img src="imgs/test1.png" height="400" />

<details>
<summary>Correction</summary>

```
//Test.js

```

</details>
<br>
