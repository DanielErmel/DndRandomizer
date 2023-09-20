document.addEventListener('DOMContentLoaded', () => {
    const generateCharacterButton = document.getElementById('generateCharacter');
    const characterInfoDiv = document.getElementById('characterInfo');


    //add a function that posts a jpeg of both the associated class and race when chosen.


    generateCharacterButton.addEventListener('click', () => {
        Promise.all([
            fetch('https://www.dnd5eapi.co/api/classes').then(response => response.json()),
            fetch('https://www.dnd5eapi.co/api/races').then(response => response.json()),
            fetch('https://www.dnd5eapi.co/api/subraces').then(response => response.json())
        ])
        .then(data => {
            const classes = data[0].results;
            const races = data[1].results;
            const subraces = data[2].results

            const randomSubrace = getRandomElement(subraces)
            const randomClass = getRandomElement(classes);
            const randomRace = getRandomElement(races);
            
            //Find a way to combine the basic races that don't have subraces with the ones that do.
            function allRaces() {
                if (races === "Human" || races === "Half-Orc" || races === "Tiefling" || races === "Half-Elf") {
                    return races;
                } else {
                    return subraces;
                }
            }
            
            const character = {
                name: generateRandomName(),
                class: randomClass.name,
                race: randomRace.name,
                subrace: randomSubrace.name,
                level: getRandomNumber(1, 20),
                str: getRandomNumber(6, 17),
                dex: getRandomNumber(6, 17),
                con: getRandomNumber(6, 17),
                int: getRandomNumber(6, 17),
                wis: getRandomNumber(6, 17),
                cha: getRandomNumber(6, 17),
                alignment: generateRandomAlignment()
            };

            characterInfoDiv.innerHTML = `
                <h2>${character.name}</h2>
                <p>Race: ${character.subrace}</p>
                <p>Class: ${character.class}</p>
                <p>Alignment: ${character.alignment}</p>
                <br></br>
                <p>Strength: ${character.str}</p>
                <p>Dexterity: ${character.dex}</p>
                <p>Constitution: ${character.con}</p>
                <p>Intelligence: ${character.int}</p>
                <p>Wisdom: ${character.wis}</p>
                <p>Charisma: ${character.cha}</p>
            `;
        })
        .catch(error => console.error('Error fetching data:', error));
    });
});

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomName() {
    // Add your own logic to generate a random name
    // For example, you can use arrays of names and combine them randomly
    return 'Random Name';
}

function generateRandomAlignment() {
    const alignments = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'];
    return getRandomElement(alignments);
}