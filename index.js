function startgame() {

    loadLocalStorage();
    console.log("record: " + record + " wins.")

    let player = {
        health: 100,
        maxHealth: 100,
        attack: 100,
        level: 1,
        xp: 0,
        nextLevelAt: 100,
        potions: 0,
        wins: 0
    }

    let continueGame = true;

    while (continueGame) {

        let enemy = {
            health: Math.floor(Math.random() * 100),
            attack: Math.floor(Math.random() * 100),
        }

        enemyMaxHealth = enemy.health;

        console.log("Choose your action:")
        console.log("- 1. fight - 2. show stats - 3. quit - Health: " + player.health + "/" + player.maxHealth)

        let choice = prompt("- 1. fight - 2. show stats - 3. quit - Health: " + player.health + "/" + player.maxHealth + " Lv " + player.level);

        switch (choice) {
            case "1":
                console.clear();
                console.log("You chose fight!");
                fight();
                break;

            case "2":
                console.clear();
                console.table(player);
                break;
            case "3":
            default:
                console.clear();
                continueGame = false;
                break;
        }

        function fight() {
            console.log("Enemy health is " + enemy.health + ", Enemy attack is " + enemy.attack)
            console.table(enemy);
            while (player.health > 0 && enemy.health > 0) {
                enemyTurn();
                if (player.health <= 0) {
                    break;
                }
                playerTurn();
            }
            if (player.health <= 0) {
                console.log("you died!")
                console.log("**GAME OVER**")
                console.log("Player won " + player.wins + " matches before dying.")
                alert("You died!\n**GAME OVER**\nPlayer won " + player.wins + " matches before dying.")
                continueGame = prompt("Restart? 1 = yes / 2 = no")
                switch (continueGame) {
                    case "1":
                        startgame();
                        continueGame = false;
                        break;
                    case "2":
                        continueGame = false;
                        break;
                }
            }
            else if (enemy.health <= 0) {
                console.log("--You won!--")
                alert("--You won!--")
                player.wins++;
                saveLocalStorage();
                experience();
                potions();
            }

        }

        function enemyTurn() {
            let damage = Math.floor(Math.random() * enemy.attack);
            calculate(player, damage)
            console.log("Enemy deals " + damage);
            console.log("Your health is down to " + player.health);
            //alert("Enemy deals " + damage + ".\nYou: " + player.health + "/" + player.maxHealth + "\nEnemy: " + enemy.health + "/" + enemyMaxHealth);
        }

        function playerTurn() {
            let damage = Math.floor(Math.random() * player.attack);
            calculate(enemy, damage);
            console.log("you deal " + damage);
            console.log("Enemy health is down to " + enemy.health);
            //alert("you deal " + damage + ".\nYou: " + player.health + "/" + player.maxHealth + "\nEnemy: " + enemy.health + "/" + enemyMaxHealth);
        }

        function calculate(object, damage) {
            object.health -= damage;
            if (object.health < 0) {
                object.health = 0;
            }
        }

        function potions() {
            let recievedPotions = Math.floor(Math.random() * 2);
            player.potions += recievedPotions;
            if (recievedPotions > 0) {
                console.log("You recieved " + recievedPotions + " potion(s)! You now have " + player.potions + " potions.")
            } else {
                console.log("you did not get any potions. You have " + player.potions + " potions.");
            }
            console.log("+ + Health: " + player.health + "/" + player.maxHealth);

            if (player.potions > 0) {
                console.log("Use a potion?");
                let heal = prompt("Health: " + player.health + "/" + player.maxHealth + " Use a potion? 1 = yes / 2 = no");

                switch (heal) {
                    case "1":
                        player.health = player.maxHealth;
                        player.potions -= 1;
                        console.log("Your health is restored!");
                        console.log(player.health + "/" + player.maxHealth);
                        break;
                    case "2":
                    default:
                        console.log("You continue without healing.");
                        break;
                }
            }
        }

        function experience() {
            let gainedXp = Math.floor(Math.random() * 21) + 5;
            console.log("you gain " + gainedXp + " xp!")
            player.xp += gainedXp;
            if (player.xp >= player.nextLevelAt) {
                player.level++
                console.log("**Level up!** Lv" + player.level)
                let healthIncrease = Math.floor(Math.random() * 5) + 1;
                player.maxHealth += healthIncrease;
                console.log("Health rose by " + healthIncrease + " points, new health stat is " + player.maxHealth);
                let attackIncrease = Math.floor(Math.random() * 5) + 1;
                player.attack += attackIncrease;
                console.log("Attack rose by " + attackIncrease + " points, new attack stat is " + player.attack);
                player.xp -= player.nextLevelAt;
                player.nextLevelAt += Math.floor(Math.random() * 10);
                alert("**Level up!**\nHealth: +" + healthIncrease + " (" + player.maxHealth + ")\nAttack: +" + attackIncrease + " (" + player.attack + ")")
            }
            console.log("XP: " + player.xp + "/" + player.nextLevelAt);
            remainingXp = player.nextLevelAt - player.xp;
            console.log("xp remaining until next level: " + remainingXp);
        }

    }

    function loadLocalStorage() {
        let recordData = localStorage.getItem("record");

        record = JSON.parse(recordData);

        if (!record) {
            record = 0;
        }
    }

    function saveLocalStorage() {
        if (player.wins > record) {
            localStorage.setItem("record", JSON.stringify(player.wins));
        }
    }

}

