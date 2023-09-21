import {useEffect, useState} from 'react'
import './App.css'
import talon from './assets/talon.png';

function App() {
  const [count, setCount] = useState(0)
    const [randomNumber, setRandomNumber] = useState<number | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [emojis, setEmojis] = useState<string | null>(null);
    const [userGuess, setUserGuess] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [correctChampion, setCorrectChampion] = useState<string>(''); // Added state for correct champion

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleGuess();
    };

    const numberToStringMap: Record<number, string> = {
        1: '👹🦇⚔️🩸',
        2: '👩🏻🦊🔥❤️',
        3: '👩🏻🐱‍👤🗡️🌫️',
        4: '🧔🏽‍♂️🏹😇',
        5: '🐂💪⛓️',
        6: '😢💀🧻',
        7: '🐦❄️🥚',
        8: '👧🔥👿🐻',
        9: '🔫🔫🔫🔫',
        10: '👑👩🏼🏹❄️',
        11: '🐉🌠🪐🌌',
        12: '👑🏜️💂‍♂️💂‍♂️',
        13: '🔔🎐🎭🎵',
        14: '👽🐟👑👄',
        15: '🤖🧤🦾🦾',
        16: '😡🔥🔥🔥',
        17: '💪🛡️🚪❄️',
        18: '😈🥩🍖⛓️',
        19: '👮‍♀️🔫🎯🧁',
        20: '🦿🦿⚙️✂️',
        21: '🐍☠️👞🗿',
        22: '👽🦖👹👄',
        23: '🐹🛩️💣🚀',
        24: '🪓🩸⛓️',
        25: '🌒🌙🏛️',
        26: '😈💉🧪💪',
        27: '🪓🪓🏆🩸',
        28: '👨🏿⏳⌚⚙️',
        29: '🕷️🕸️🤵🏻‍♀️',
        30: '💋💔😈',
        31: '👱‍♂️🧤⚡',
        32: '🐦👻😨',
        33: '🤺⚔️🏰',
        34: '🌊🐟🦈🔱',
        35: '🗽🚫🦅',
        36: '🧔‍️🏴‍☠️⛵🍊',
        37: '👨⚔️🏰🌀',
        38: '🐹👿🦍',
        39: '🧔‍️🔫🚬☁️',
        40: '👨⚔️🏰🌀',
        41: '👧✂️🧵',
        42: '👻🐎🏃‍♂️🪓',
        43: '🐹🛠️⚙️⚡',
        44: '🐙🌊⛪💪',
        45: '🙍🏻‍♀️⚔️💃🥋',
        46: '🌱🌳👴',
        47: '🧚🏼‍♀️🌪️🌀🚑',
        48: '👑🚩🏰⛰️',
        49: '🤺🎭🏮💡',
        50: '🦸🔨🔫⚡⚙️',
        51: '🎭🔫🌸4️⃣',
        52: '🔫🚀🦈💥',
        53: '🧔🏿‍🏜️⚔️🛡️',
        54: '🙍🏻‍♀️🌌👽🦋',
        55: '🧟‍♀️👻➡️💨',
        56: '👩🏾🧘🥻☸️',
        57: '👻💀☠️🎵',
        58: '👽🌌⚔️',
        59: '👩‍🦰🗡️💨🌀',
        60: '😇⚔️🔥',
        61: '👿👹🥶🪓',
        62: '🐹⚡⚡⚡',
        63: '👽🦗',
        64: '🐏🐺💀🏹',
        65: '🐹🦎🎖️🚩',
        66: '👽🐛🤮',
        67: '👩🏻👥🎭',
        68: '👨‍🦯🧘🦵🏼🥋',
        69: '👩🏼‍🦰☀️🛡️🏛️',
        70: '🦌😴🌸',
        71: '👑🧙‍♀️❄️🧊',
        72: '👨🏿🔫🔫✨',
        73: '🐹🧙‍♀️🧚‍♀️🦋',
        74: '👩🏼✨🔆',
        75: '⛰️🏔️',
        76: '🌌👽👾',
        77: '🌳🌱🌱👻',
        78: '🧔🏻‍🥽⚔️🥋',
        79: '🧒🏾❤️‍🔥🌞',
        80: '👩‍🦰🔫🔫🏴‍☠️',
        81: '🏰👻☠️',
        82: '🧙‍♀️👿🦇⛓️',
        83: '🐶🐕🐕🐕',
        84: '🧜‍♀️🌊',
        85: '🐶🏜️🪓',
        86: '🤿⚓🌊',
        87: '🦎🎭',
        88: '👩🏽‍🦱🐅🐯🌴',
        89: '👩🏽‍🦱😂💧🏞️',
        90: '👻💭💤👤',
        91: '👶🦍❄️☃️',
        92: '🧔🪓🪓🌩️',
        93: '⚪🤖🧲',
        94: '🐏🌋🔥🔨',
        95: '🏛️🛡️⚔️🚩',
        96: '🐹🔨🛡️',
        97: '🌊👻❌',
        98: '👑🌱🔥💧',
        99: '🏹🦅🎯',
        100: '🐦♂️💑',
        101: '🐢🆗',
        102: '👽🦈',
        103: '🏇🧲🛡️',
        104: '👩‍💼🤿🧪💸',
        105: '🐊🏜️😡🪓',
        106: '😾🦷🦷🦷',
        107: '⚔️🗡️🌪️',
        108: '🐹🛠️🚀',
        109: '🥶🧙‍♂️📜💧',
        110: '👩🏽🔫🗡️🥇',
        111: '👑👩🏼🐗❄️',
        112: '👩🏾🔫🚑👻',
        113: '👩🏼🎼🎵🎤',
        114: '👊💪🏆🥇',
        115: '🃏🤡😈🎁',
        116: '🐱‍👤🚑🛡️🗡️',
        117: '🐲🐉🔥',
        118: '🍾☣️🏃‍♂️',
        119: '🧟‍♂️🪓☠️',
        120: '👩🏻❌🥏🏜️',
        121: '🦂🏜️💎',
        122: '🎼🎵🔕',
        123: '🦄🌟🐐🚑',
        124: '😈🐦‍⬛👑',
        125: '⛓️🧙',
        126: '🧙‍♀️⚫⚫⚫',
        127: '🐸🎩👅💰',
        128: '👧🏽🏄‍♀️⛰️🏜️',
        129: '🗡️🗡️👤🩸',
        130: '💎🛡️✨🚑',
        131: '🐹🍄',
        132: '👻⛓️🏮',
        133: '🐹🔫💣💥',
        134: '👹❄️🧊',
        135: '🧔🏻‍⚔️🚫☠️',
        136: '🧙🃏🔮🌀',
        137: '🐀🏹☣️',
        138: '🐻🐗🐏🐦',
        139: '🕷️🦀☣️⛓️',
        140: '🏹➡️😈🧑‍🤝‍🧑',
        141: '👩🏻🏹👓🌃',
        142: '🐹🧙🦹‍♂️🥅',
        143: '👽👁️🐙',
        144: '🐹☹️👤👻',
        145: '👮‍♀️🥊🥊👊',
        146: '👑👨🏼⚔️👻',
        147: '🤖🦾🦿🧙',
        148: '🩸🧛🍷',
        149: '🐻‍❄️🐾',
        150: '🐺🩸🏃‍♂️',
        151: '🐵☁️👥',
        152: '🐦♀️💑',
        153: '🧙💎⚰️⚡',
        154: '🏰🎖️🔱',
        155: '🗾⚔️🌪️🌀',
        156: '🗾⚔️👻',
        157: '🧟‍♂️⛏️💀👻',
        158: '🐱📖✨🌠',
        159: '🟢🧪💪',
        160: '🐱‍👤🗡️👥👥',
        161: '🔫⚡🔋',
        162: '🐹🧨💣💥',
        163: '🧙‍♂️🕰️⌛💣',
        164: '👧🌇🌠😴',
        165: '👩‍🦰🌱🌿🌹',
    };

    const numberToNameMap: Record<number, string> = {
        1: 'Aatrox',
        2: 'Ahri',
        3: 'Akali',
        4: 'Akshan',
        5: 'Alistar',
        6: 'Amumu',
        7: 'Anivia',
        8: 'Annie',
        9: 'Aphelios',
        10: 'Ashe',
        11: 'Aurelion Sol',
        12: 'Azir',
        13: 'Bard',
        14: 'Bel\'Veth',
        15: 'Blitzcrank',
        16: 'Brand',
        17: 'Braum',
        18: 'Briar',
        19: 'Caitlyn',
        20: 'Camille',
        21: 'Cassiopeia',
        22: 'Cho\'Gath',
        23: 'Corki',
        24: 'Darius',
        25: 'Diana',
        26: 'Dr. Mundo',
        27: 'Draven',
        28: 'Ekko',
        29: 'Elise',
        30: 'Evelynn',
        31: 'Ezreal',
        32: 'Fiddlesticks',
        33: 'Fiora',
        34: 'Fizz',
        35: 'Galio',
        36: 'Gangplank',
        37: 'Garen',
        38: 'Gnar',
        39: 'Gragas',
        40: 'Graves',
        41: 'Gwen',
        42: 'Hecarim',
        43: 'Heimerdinger',
        44: 'Illaoi',
        45: 'Irelia',
        46: 'Ivern',
        47: 'Janna',
        48: 'Jarvan IV',
        49: 'Jax',
        50: 'Jayce',
        51: 'Jhin',
        52: 'Jinx',
        53: 'K\'Sante',
        54: 'Kai\'Sa',
        55: 'Kalista',
        56: 'Karma',
        57: 'Karthus',
        58: 'Kassadin',
        59: 'Katarina',
        60: 'Kayle',
        61: 'Kayn',
        62: 'Kennen',
        63: 'Kha\'Zix',
        64: 'Kindred',
        65: 'Kled',
        66: 'Kog\'Maw',
        67: 'LeBlanc',
        68: 'Lee Sin',
        69: 'Leona',
        70: 'Lillia',
        71: 'Lissandra',
        72: 'Lucian',
        73: 'Lulu',
        74: 'Lux',
        75: 'Malphite',
        76: 'Malzahar',
        77: 'Maokai',
        78: 'Master Yi',
        79: 'Milio',
        80: 'Miss Fortune',
        81: 'Mordekaiser',
        82: 'Morgana',
        83: 'Naafiri',
        84: 'Nami',
        85: 'Nasus',
        86: 'Nautilus',
        87: 'Neeko',
        88: 'Nidalee',
        89: 'Nilah',
        90: 'Nocturne',
        91: 'Nunu & Willump',
        92: 'Olaf',
        93: 'Orianna',
        94: 'Ornn',
        95: 'Pantheon',
        96: 'Poppy',
        97: 'Pyke',
        98: 'Qiyana',
        99: 'Quinn',
        100: 'Rakan',
        101: 'Rammus',
        102: 'Rek\'Sai',
        103: 'Rell',
        104: 'Renata Glasc',
        105: 'Renekton',
        106: 'Rengar',
        107: 'Riven',
        108: 'Rumble',
        109: 'Ryze',
        110: 'Samira',
        111: 'Sejuani',
        112: 'Senna',
        113: 'Seraphine',
        114: 'Sett',
        115: 'Shaco',
        116: 'Shen',
        117: 'Shyvana',
        118: 'Singed',
        119: 'Sion',
        120: 'Sivir',
        121: 'Skarner',
        122: 'Sona',
        123: 'Soraka',
        124: 'Swain',
        125: 'Sylas',
        126: 'Syndra',
        127: 'Tahm Kench',
        128: 'Taliyah',
        129: 'Talon',
        130: 'Taric',
        131: 'Teemo',
        132: 'Thresh',
        133: 'Tristana',
        134: 'Trundle',
        135: 'Tryndamere',
        136: 'Twisted Fate',
        137: 'Twitch',
        138: 'Udyr',
        139: 'Urgot',
        140: 'Varus',
        141: 'Vayne',
        142: 'Veigar',
        143: 'Vel\'Koz',
        144: 'Vex',
        145: 'Vi',
        146: 'Viego',
        147: 'Viktor',
        148: 'Vladimir',
        149: 'Volibear',
        150: 'Warwick',
        151: 'Wukong',
        152: 'Xayah',
        153: 'Xerath',
        154: 'Xin Zhao',
        155: 'Yasuo',
        156: 'Yone',
        157: 'Yorick',
        158: 'Yuumi',
        159: 'Zac',
        160: 'Zed',
        161: 'Zeri',
        162: 'Ziggs',
        163: 'Zilean',
        164: 'Zoe',
        165: 'Zyra',
    };


    useEffect(() => {
        generateRandomNumber();
    }, []);

    const generateRandomNumber = () => {
        const randomNum = Math.floor(Math.random() * Object.keys(numberToNameMap).length) + 1;
        setRandomNumber(randomNum);


        const resultChampion = numberToNameMap[randomNum];
        const resultEmojis = numberToStringMap[randomNum];
        setResult(resultChampion);
        setEmojis(resultEmojis);
    };
    const handleGuess = () => {
        const expectedChampion = numberToNameMap[randomNumber || 1];

        const userGuessNormalized = userGuess.replace(/['.\s]/g, '').toLowerCase();
        const expectedChampionNormalized = expectedChampion.replace(/['.\s]/g, '').toLowerCase();


        const isGuessCorrect = userGuessNormalized === expectedChampionNormalized;
        if (!isGuessCorrect) {
            setCount(count + 1);
        } else {
            setCorrectChampion(expectedChampion);
            setCount(0);
            generateRandomNumber();
            setUserGuess('');
        }
        setIsCorrect(isGuessCorrect);
    };

    return (
    <>
      <div>
          <img src={talon} className="talon" alt="Chibi Talon" />
      </div>
      <h1>Guess the champion</h1>
        <div className="emojis">
            {randomNumber !== null && result !== null && (
                <form onSubmit={handleFormSubmit}>
                    <div className="emojiString">
                        <p>{emojis} </p>
                    </div>
                    <input
                        className="guess"
                        type="text"
                        placeholder="Enter your guess"
                        value={userGuess}
                        onChange={(e) => setUserGuess(e.target.value)}
                    />
                    <button type="submit">Submit Guess</button>
                    <p>Number of guesses: {count}</p>
                    {isCorrect !== null && (
                        <p>
                            {isCorrect ? `Correct guess! It was ${correctChampion}` : 'Incorrect guess!'}

                        </p>
                    )}
                </form>
            )}
        </div>
    </>
  )
}

export default App
