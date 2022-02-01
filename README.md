# Projet6 - So pekocko 
Projet 6 de la formation Develeoppeur Web d'OpenClassrooms, il consiste à développer l'API d'un site web dont nous avons le front-end.
La document nous donne l'ensemble des requêtes à couvrir
## Objectifs
1. Connecter une API à une base de données
2. Créer une API compatible avec un front donné
3. Sécuriser les données utilisateurs en cryptant l'addresse email et en hachant le mot de passe.
4. utiliser des pratiques et des plugins securisant notre application
## Livrables
+ Une API fonctionnelle qui répond à tous les besoins donnés au préalables
+ Cette API doit :
    * Créer un nouvel utilisateur si son mail n'est pas déjà utilisé
    * Autoriser un utilisateur enregistrer à se connecter
    * Permettre la création d'une sauce dans la BDD
    * Permettre la modification d'une sauce dans la BDD
    * Permettre la supression d'une sauce dans la BDD
    * Permettre de "like" ou "dislike" une sauce UNE FOIS par utilisateur et de changer son avis à tout moment.
## Installation
1. Cloner le repository sur votre ordinateur avec ``git clone https://github.com/Valxer/KevinLeVanPhung_6_12072021.git``
2. Pour installer le front suivre les instruction données dans le README du front (cette partie est fournie)
3. Dans VSCode ouvrez un terminal :  
	* Tapez ``cd back-end/ && npm install`` pour installer les dépendances du Back-end du site
    * Tapez ensuite ``npm run build`` pour créer le dossier images qui servira à stocker les images des sauces créées
    * Enfin tapez ``npm start`` pour lancer le serveur de l'API et vérifiez que celle ci est bine lancée sur le port 3000.
Vous êtes désormais connecté au back-end vous pouvez accéder au site et faire vos test
