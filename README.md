# body-class-switch-theme-dark-theme-light

Un programme injectable (userscript) pour switch, via le raccourci Ctrl + Y,
la class du body entre theme-dark et theme-light
sur les pages web qui contiennent un theme-dark et un theme-light
mais pas de bouton pour basculer entre les deux

# Processus créatif

## 0. La problématique, identifier le besoin

La page est en thème sombre par défaut, sans aucun moyen de le changeret et aucun userstyle n'existe pour avoir un thème clair

## 1. Inspecter la page, regarder les noms des class, identifier la logique

Pleins de sites se basent sur des frameworks pour les thèmes, bootstrap et tailwind sont les plus connus. Le site semble utiliser bootstrap d'après le nom des class sur les balises.

Le site contient une class theme-dark dans sa balise body. Si je change theme-dark en theme-light, la page passe en thème clair.

## 2. Implémenter la logique, écrire le javascript

Pour modifier le nom de la class dans le html, je peux utiliser javascript. En utilisant la console de l'inspecteur de page, j'essaie d'abord de sélectionner body :

```javascript
const body = document.querySelector("body")
```

Mais body faisant partie du document, je trouve qu'il est possible de le sélectionner avec :

```javascript
document.body
```

On peut lister toutes les classes dans une liste avec :

```javascript
document.body.classList
```

Et les lister comme une chaîne de caractère avec

```javascript
document.body.className
```

Je peux manipuler les chaînes de caractères avec .replace, il ne me reste plus qu'à écrire la ligne :

```javascript
document.body.className = document.body.className.replace("theme-dark", "theme-light");
```

## 3. Basculer entre le thème sombre et le thème clair, écrire le userscript

La logique implémentée en javascript, je peux donc me concentrer sur l'interaction avec l'utilisateur.

Je peux juste mettre la ligne dans le userscript, mais l'utilisateur doit désactiver le userscript et recharger la page s'il veut passer de thème sombre à thème clair. Ce qui est dommage.

Aussi, la page met un peu de temps à se charger, je dois donc ajouter

```javascript
window.onload = (function() {
  document.body.className = document.body.className.replace("theme-dark", "theme-light");
})();
```

Pour que le script s'exécute une fois que la page a fini de se générer.

## 3.1 Interaction utilisateur, écrire le userscript

Insérer un bouton sur la page existante n'est pas une solution simple. Une solution plus simple est d'ajouter un raccourci clavier pour basculer entre le thème sombre et le thème clair.

Une logique pour switch est d'abord nécessaire :

```javascript
    function toggleTheme() {
        if (document.body.className.includes("theme-dark")) {
            document.body.className = document.body.className.replace("theme-dark", "theme-light");
        } else {
            document.body.className = document.body.className.replace("theme-light", "theme-dark");
        }
    }
```

Dans la fonction toggleTheme(), je mets la logique suivante :
si la class est sur theme-dark, donc la page en thème sombre, je remplace par theme-dark par theme-light
Et inversement.

```javascript
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'y') {
            toggleTheme();
        }
    });
```

J'ajoute ensuite un EventListener sur la pression d'une touche 'keydown'
Et si le raccourci est Ctrl + Y, je lance la fonction toggleTheme, ainsi Ctrl + Y permet de basculer entre le thème sombre et le thème clair.

J'empacte tout :

```javascript
window.onload = (function() {
// mes fonctions
})();
```

Et mon userscript permet maintenant de basculer entre theme-dark et theme-light, si la logique du thème est une class dans body.

Et avec window.onload qui encapsule toutes mes fonctions, le userscript n'empêche pas mes userstyles de modifier les pages.
