let playerCount = 1;
let touchMarkers = [];
let currentQuestionIndex = 0;
let activeTouches = new Map();
let playerAssignments = new Map(); // Maps touch identifier to player number
let currentPlayerTurn = null; // Current player who should answer
let playerColorMap = {}; // Maps player number to color

// Player colors for markers
const playerColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', 
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B739', '#6C5CE7'
];

// Questions database
const allQuestions = [
    "Who is your current crush?",
    "Out of this group, who would you date?",
    "Have you ever been rejected?",
    "Have you ever cheated in a relationship?",
    "Do you still have feelings for your ex?",
    "What makes you instantly attracted to someone?",
    "Have you ever lied to impress someone?",
    "Who gives you butterflies in this group?",
    "If you had to kiss someone here, who would it be?",
    "What's your ideal type?",
    "What's one secret no one knows?",
    "What's your most toxic trait?",
    "What's the worst habit you can't stop?",
    "What's the weirdest thing you do when you're alone?",
    "Have you ever cried in public?",
    "What's the biggest fear you've never told anyone?",
    "What's the most childish thing you still do?",
    "What's one thing you regret the most?",
    "What's the longest you went without showering?",
    "Who's the last person you stalked on social media?",
    "What's the most expensive thing you ruined accidentally?",
    "If you became a millionaire tomorrow, what's the first thing you'd buy?",
    "What's the worst fashion trend you've followed?",
    "What's something you're bad at but pretend you're good at?",
    "What's one thing you want to change in your life right now?",
    "What's your guilty pleasure song?",
    "What's the worst grade you ever got?",
    "What lie do you tell most often?",
    "Which friend annoys you the most here?",
    "What's one thing you would never tell your parents?",
    
    // Friendship / Group Questions
    "Who here do you trust the most?",
    "Who here do you trust the least?",
    "Who has the best fashion in this group?",
    "Who is the funniest person here?",
    "Who is the most dramatic person here?",
    "Who in the group would make the worst partner?",
    "Who would survive a zombie apocalypse?",
    "What's one thing you admire about the person to your right?",
    "What's one thing you dislike about the person to your left?",
    "Who is the biggest \"red flag\" here?",
    
    // Dare Questions - Funny / Crazy
    "Speak in a baby voice for the next 2 minutes.",
    "Say the alphabet backward.",
    "Eat one spoon of a weird food combo chosen by the group.",
    "Talk like a robot for 3 minutes.",
    "Try to lick your elbow.",
    "Laugh without smiling.",
    "Do 15 squats while calling yourself \"Gym bro.\"",
    "Act like a cat for 1 minute.",
    "Pretend you're an influencer and make a product advertisement.",
    "Let someone draw on your hand with a pen.",
    
    // Phone Dare
    "Show the last photo in your gallery.",
    "Send a \"Hi bestie ❤️\" message to your crush.",
    "Let someone check your last three emojis.",
    "Change your Instagram bio to something funny for 10 minutes.",
    "Reply \"I miss you\" to the last person who texted you.",
    "Give your phone to the group for 2 minutes.",
    "Put an embarrassing pic as your wallpaper for 5 minutes.",
    "Search your name on Google and read the first result.",
    "Call a random contact and say \"Guess what? I passed!\"",
    "Send a meme to your mom.",
    
    // Acting / Drama
    "Re-create a dramatic Bollywood scene.",
    "Do your best villain laugh.",
    "Act like you saw a ghost.",
    "Pretend you're in love with the person next to you for 30 seconds.",
    "Dance without music for 20 seconds.",
    "Sing everything you speak for the next 1 minute.",
    "Act like a YouTube tutorial vlogger.",
    "Pretend you're drunk for 30 seconds.",
    "Give a fake inspirational speech.",
    "Act like a motivational speaker saying nonsense.",
    
    // Voice / Singing
    "Sing your favorite song loudly.",
    "Rap for 30 seconds on the spot.",
    "Speak without moving your lips.",
    "Do your best impression of any teacher.",
    "Beatbox for 20 seconds.",
    "Sing a song in the worst voice possible.",
    "Say a tongue-twister 5 times.",
    "Mimic any cartoon character.",
    "Say \"I love myself\" in 5 different emotions.",
    "Sing the national anthem like a lullaby.",
    
    // Group Interaction
    "Let the group choose a new nickname for you.",
    "Exchange one item of clothing with someone.",
    "Compliment everyone in the group.",
    "Let someone do your hairstyle.",
    "Take a group selfie making the weirdest face.",
    "Hug someone you choose in the group.",
    "Let someone roast you lightly for 20 seconds.",
    "Say one positive thing about each person.",
    "Let the group choose a dare for you (mystery dare!).",
    "Do one dare you previously refused.",
    
    // Funny + Suggestive (PG-13)
    "What's the most awkward \"romantic moment\" you've ever had?",
    "Has your flirting ever failed so badly that you wanted to disappear?",
    "What's the funniest thing someone said to impress you?",
    "What's the most \"unserious\" reason you rejected someone?",
    "What's a pickup line that sounds wrong but still works?",
    "Have you ever flirted accidentally?",
    "What's the most embarrassing thing you've done in front of a crush?",
    "Which friend would be the worst person to flirt with you?",
    "What's the cringiest compliment you ever received?",
    "What's the funniest lie you've used to escape a boring date?",
    
    // Awkward Romantic Comedy Style
    "Have you ever practiced flirting in the mirror?",
    "Have you ever messed up someone's name while flirting?",
    "Do you have a \"flirting face,\" and is it embarrassing?",
    "Who in the group would be the hero of a rom-com?",
    "Who would be the comic relief in a rom-com?",
    "What romantic moment turned into comedy for you?",
    "Have you ever tried a pickup line you instantly regretted?",
    "What's your \"unintentional riz\" moment?",
    "Ever flirted with someone who wasn't your target?",
    "Have you ever tried to act cool and ended up looking stupid?",
    
    // Light Flirty (Safe)
    "If someone had to flirt with you using only emojis, which three would work?",
    "Describe your crush using only wrong answers.",
    "What ruins a \"romantic vibe\" instantly for you?",
    "What's something romantic that makes you laugh instead?",
    "Have you ever laughed during a \"serious romantic moment\"?",
    "What's an instant ick in someone trying to impress you?",
    "Do you think you give \"main character\" energy or \"side character\" energy in romance?",
    "Who in the group has accidental charm?",
    "If your love life were a genre, what would it be — comedy, horror, or sci-fi?",
    "Who here would survive one minute on a date with you?",
    
    // More Dating/Flirty Questions
    "Who here would survive the worst first date ever?",
    "If your crush had a theme song, what would it be?",
    "What's the cheesiest line you would actually use?",
    "Who in the group looks like they'd ghost someone by accident?",
    "Describe your type using only food names.",
    "If you went on a blind date, what's the first red flag you'd notice?",
    "Who in the group gives \"main character on a date\" vibes?",
    "What's the funniest reason you rejected someone?",
    "If you had to flirt using only movie names, what would you say?",
    "Rate your flirting skills from 1–'I need coaching.'",
    "Who here would fall in love because someone gave them snacks?",
    "What's the most awkward thing you've said to a crush?",
    "If you had a dating app bio written by your friends, what would it be?",
    "Who would accidentally confess to the wrong person?",
    "What's your bare-minimum green flag?",
    "What personality trait makes you instantly interested?",
    "If you had to pick someone here as your wingman, who would it be?",
    "Describe your ideal date using emojis only.",
    "Who here would be the worst person to go on a surprise date with?",
    "What's the funniest \"deal breaker\" you have?",
    "Have you ever impressed someone on purpose? How?",
    "What's a compliment that works every time?",
    "If you had to choose someone here to prank your crush, who?",
    "Which fictional character is your type?",
    "What's the funniest thing someone did to impress you?",
    "Who in the group gives \"secret softie\" vibes?",
    "What's your funniest crush horror story?",
    "What's something cute that instantly wins you over?",
    "Who here looks like they give good relationship advice?",
    "What makes you instantly blush?",
    "If a date could be anywhere but Earth, where would it be?",
    "Which emoji describes your love life?",
    "Would you rather: a romantic picnic or chaotic arcade date?",
    "What unusual habit of someone could make you like them?",
    "Who would you trust to choose your partner?",
    "What's a dream date that you think others would find weird?",
    "If you could ask your crush one question, what would it be?",
    "What's your funniest \"falling in love moment\"?",
    "Who here gives \"hopeless romantic\" energy?",
    "What's the weirdest thing you find attractive?",
    "Who in the group looks like they'd write cute notes?",
    "What's your funniest compliment?",
    "If love was a game, what level are you stuck on?",
    "What's the weirdest place you've liked someone?",
    "Who would plan the most dramatic proposal?",
    "What's your \"I like you\" behavior?",
    "Who flirts without realizing it?",
    "What's the funniest reason someone liked you?",
    "What's your favorite romantic cliché?",
    "What's a crush moment you will never forget?",
    
    // Chaotic Junzzi / Comedic Group Chaos
    "Who here would get voted \"Most Likely to Start Drama Accidentally\"?",
    "What's a chaos habit you proudly have?",
    "If your personality were a ringtone, what would it sound like?",
    "Who would survive a zombie apocalypse just by talking?",
    "What's your funniest overreaction story?",
    "Who gives the strongest \"I know a guy\" energy?",
    "If your mood today had a color, what chaotic shade would it be?",
    "Tell a story where you embarrassed yourself but pretend it was someone else.",
    "Who in the group would forget their own birthday?",
    "What's the worst advice you've given confidently?",
    "Who has main-character syndrome today?",
    "If your life had laugh-track moments, name one.",
    "Who here is the designated chaos generator?",
    "Describe your energy using a cartoon character.",
    "What's the funniest misunderstanding you've caused?",
    "Who would fail a lie-detector test while telling the truth?",
    "What's your \"I'm done with life\" moment of the week?",
    "Who would get lost inside their own house?",
    "What's your most iconic clumsy moment?",
    "Who here acts like a villain but is actually a cupcake?",
    "What's your 'I didn't think this through' story?",
    "Who in the group gives \"plot twist\" energy?",
    "What's something silly you can't resist doing?",
    "Who would make the funniest dramatic exit?",
    "What's your favorite weird food combo?",
    "Who would end up in trouble just by standing somewhere?",
    "What's the biggest lie you believed as a kid?",
    "Who is the unintentional comedian of the group?",
    "What's your go-to chaos move?",
    "Who would lose a staring contest instantly?",
    "What's something small that annoys you for no reason?",
    "Who would survive reality TV?",
    "What's your funniest childhood memory?",
    "Who is most likely to say \"trust me\" right before chaos?",
    "What silly thing did you recently overthink?",
    "Who would turn a simple task into a dramatic event?",
    "What's your funniest fear?",
    "Who would be the narrator if your life were a movie?",
    "What's your accidental talent?",
    "Who here acts like the eldest sibling even if they're not?",
    "What's the most unnecessary thing you've argued about?",
    "Who gives \"I fix problems I caused\" energy?",
    "What's your funniest \"caught in 4K\" moment?",
    "Who would be the funniest superhero?",
    "What sound represents your life right now?",
    "Who would be late even to their own surprise party?",
    "What's a habit that makes people laugh?",
    "Who looks like they'd steal fries without guilt?",
    "What's the weirdest compliment you've ever received?",
    "Who gives \"final boss of comedy\" energy?",
    
    // Light Spicy / Flirty but SAFE (PG-13)
    "Who here flirts like it's a part-time job?",
    "What's your smoothest line that somehow works?",
    "Who here gives \"dangerously cute\" vibes?",
    "What's a harmless thing that instantly flusters you?",
    "Who has the most \"romantic troublemaker\" energy?",
    "What's your funniest almost-romantic moment?",
    "Who here is the master of accidental flirting?",
    "What's a flirty thing someone did that made you laugh?",
    "Who blushes the easiest?",
    "What's your funniest crush fail?",
    "Who would get caught staring first?",
    "What's a flirty compliment that feels illegal but is actually wholesome?",
    "Who would start flirting during a serious moment?",
    "What's the cutest thing someone has told you?",
    "Who would get nervous on a dare date?",
    "What's the boldest flirt move you've witnessed?",
    "Who gives \"secretly charming\" vibes?",
    "What's your funniest 'I liked you but acted normal' fail?",
    "Who here would laugh in the middle of a romantic moment?",
    "Describe your crush energy in one word.",
    "Who has the most mysterious charm?",
    "What's a tiny gesture that melts your heart?",
    "Who would get friend-zoned in HD quality?",
    "What's your funniest \"wrong person heard it\" moment?",
    "Who looks like they'd send the cutest texts?",
    "What's your go-to move when you like someone?",
    "Who would flirt and then panic?",
    "What scent do you find attractive?",
    "Who here gives \"heartbreaker accidentally\" vibes?",
    "What's a moment you realized someone liked you?",
    "Who would make the best fake date?",
    "What's your funniest shy moment?",
    "Who would ask the smoothest \"you up?\" but in a cute way?",
    "What's a silly thing someone did that you found attractive?",
    "Who gives \"romantic chaos\" vibes?",
    "What's the funniest cheesy line that worked on you?",
    "Who would flirt through memes?",
    "What do you notice first in someone?",
    "Who gives the best hug vibe?",
    "What's the cutest crush gesture you've done?",
    "Who would win a charm battle?",
    "What's your funniest mis-flirt?",
    "Who gives the most lovable energy here?",
    "What's a flirty compliment you love hearing?",
    "Who looks like they'd write you a poem?",
    "What's a rom-com moment that happened to you?",
    "Who would start a \"couple aesthetic\" first?",
    "What's your adorable weakness?",
    "Who looks like they'd be an overprotective date?",
    "What's the boldest thing you'd do for a crush?"
];

function changePlayers(delta) {
    playerCount = Math.max(1, Math.min(10, playerCount + delta));
    document.getElementById('playerCount').textContent = playerCount;
}

function startGame() {
    if (playerCount < 1) return;
    
    document.querySelector('.player-selection').style.display = 'none';
    document.getElementById('gameScreen').classList.add('active');
    document.getElementById('currentPlayers').textContent = playerCount;
    
    // Assign colors to players (1 to playerCount)
    playerColorMap = {};
    for (let i = 1; i <= playerCount; i++) {
        playerColorMap[i] = playerColors[(i - 1) % playerColors.length];
    }
    
    // Reset player assignments
    playerAssignments.clear();
    currentPlayerTurn = null;
    
    // Setup touch events
    setupTouchEvents();
    
    // Show first question
    nextQuestion();
}

function setupTouchEvents() {
    const gameScreen = document.getElementById('gameScreen');
    
    // Touch events
    gameScreen.addEventListener('touchstart', handleTouchStart, { passive: false });
    gameScreen.addEventListener('touchmove', handleTouchMove, { passive: false });
    gameScreen.addEventListener('touchend', handleTouchEnd, { passive: false });
    gameScreen.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    
    // Mouse events for desktop testing
    gameScreen.addEventListener('mousedown', handleMouseDown);
    gameScreen.addEventListener('mousemove', handleMouseMove);
    gameScreen.addEventListener('mouseup', handleMouseUp);
}

function handleTouchStart(e) {
    e.preventDefault();
    for (let touch of e.changedTouches) {
        createMarker(touch.identifier, touch.clientX, touch.clientY);
    }
}

function handleTouchMove(e) {
    e.preventDefault();
    for (let touch of e.changedTouches) {
        updateMarker(touch.identifier, touch.clientX, touch.clientY);
    }
}

function handleTouchEnd(e) {
    e.preventDefault();
    for (let touch of e.changedTouches) {
        removeMarker(touch.identifier);
    }
}

function handleMouseDown(e) {
    const identifier = 'mouse_' + Date.now();
    createMarker(identifier, e.clientX, e.clientY);
    activeTouches.set(identifier, { x: e.clientX, y: e.clientY });
}

function handleMouseMove(e) {
    for (let [id, touch] of activeTouches.entries()) {
        if (id.startsWith('mouse_')) {
            updateMarker(id, e.clientX, e.clientY);
        }
    }
}

function handleMouseUp(e) {
    for (let [id] of activeTouches.entries()) {
        if (id.startsWith('mouse_')) {
            removeMarker(id);
        }
    }
}

function createMarker(identifier, x, y) {
    // Assign player number if not already assigned
    let playerNum;
    if (playerAssignments.has(identifier)) {
        playerNum = playerAssignments.get(identifier);
    } else {
        // Assign next available player number (1 to playerCount)
        const assignedPlayers = new Set(Array.from(playerAssignments.values()));
        for (let i = 1; i <= playerCount; i++) {
            if (!assignedPlayers.has(i)) {
                playerNum = i;
                break;
            }
        }
        // If all players assigned, use random
        if (!playerNum) {
            playerNum = Math.floor(Math.random() * playerCount) + 1;
        }
        playerAssignments.set(identifier, playerNum);
    }
    
    // Get color for this player
    const color = playerColorMap[playerNum] || playerColors[(playerNum - 1) % playerColors.length];
    
    // Update current player turn
    currentPlayerTurn = playerNum;
    
    const marker = document.createElement('div');
    marker.className = 'touch-marker';
    marker.id = 'marker-' + identifier;
    marker.dataset.playerNum = playerNum;
    marker.style.left = (x - 30) + 'px';
    marker.style.top = (y - 30) + 'px';
    marker.style.width = '60px';
    marker.style.height = '60px';
    marker.style.background = `radial-gradient(circle, ${color} 0%, ${color}dd 100%)`;
    marker.style.border = `3px solid ${color}`;
    
    // Add player number label
    const label = document.createElement('div');
    label.textContent = playerNum;
    label.style.position = 'absolute';
    label.style.top = '50%';
    label.style.left = '50%';
    label.style.transform = 'translate(-50%, -50%)';
    label.style.color = 'white';
    label.style.fontWeight = 'bold';
    label.style.fontSize = '24px';
    label.style.textShadow = '0 2px 4px rgba(0,0,0,0.5)';
    marker.appendChild(label);
    
    document.getElementById('gameScreen').appendChild(marker);
    activeTouches.set(identifier, { x, y, marker, playerNum });
    
    // Update question display to show current player
    updateQuestionForPlayer();
}

function updateMarker(identifier, x, y) {
    const touch = activeTouches.get(identifier);
    if (touch && touch.marker) {
        touch.marker.style.left = (x - 30) + 'px';
        touch.marker.style.top = (y - 30) + 'px';
        touch.x = x;
        touch.y = y;
    }
}

function removeMarker(identifier) {
    const touch = activeTouches.get(identifier);
    if (touch && touch.marker) {
        touch.marker.style.animation = 'markerAppear 0.3s ease-out reverse';
        setTimeout(() => {
            if (touch.marker && touch.marker.parentNode) {
                touch.marker.parentNode.removeChild(touch.marker);
            }
        }, 300);
    }
    activeTouches.delete(identifier);
    playerAssignments.delete(identifier);
    
    // Update current player turn if this was the active player
    if (touch && touch.playerNum === currentPlayerTurn) {
        // Find next active player
        if (activeTouches.size > 0) {
            const nextTouch = Array.from(activeTouches.values())[0];
            currentPlayerTurn = nextTouch.playerNum;
            updateQuestionForPlayer();
        } else {
            currentPlayerTurn = null;
            updateQuestionForPlayer();
        }
    }
}

function updateQuestionForPlayer() {
    let playerLabel = document.querySelector('.player-turn-label');
    if (!playerLabel) {
        // Create label if it doesn't exist
        playerLabel = document.createElement('div');
        playerLabel.className = 'player-turn-label';
        playerLabel.style.fontSize = '18px';
        playerLabel.style.fontWeight = 'bold';
        playerLabel.style.marginBottom = '10px';
        const container = document.getElementById('questionContainer');
        container.insertBefore(playerLabel, container.firstChild);
    }
    
    if (currentPlayerTurn && activeTouches.size > 0) {
        const playerColor = playerColorMap[currentPlayerTurn];
        playerLabel.textContent = `Player ${currentPlayerTurn}'s Turn`;
        playerLabel.style.color = playerColor;
    } else {
        playerLabel.textContent = 'Touch the screen to start!';
        playerLabel.style.color = '#667eea';
    }
}

function nextQuestion() {
    // Don't clear markers - keep them so we know who is playing
    // If players are touching, randomly select one to answer
    if (activeTouches.size > 0) {
        const activePlayers = Array.from(activeTouches.values()).map(t => t.playerNum);
        const randomPlayerIndex = Math.floor(Math.random() * activePlayers.length);
        currentPlayerTurn = activePlayers[randomPlayerIndex];
    } else {
        // Reset player assignments when no one is touching
        playerAssignments.clear();
        currentPlayerTurn = null;
    }

    // Get random question
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    const question = allQuestions[randomIndex];
    
    document.getElementById('questionText').textContent = question;
    
    // Update player turn display
    updateQuestionForPlayer();
    
    // Add animation
    const container = document.getElementById('questionContainer');
    container.style.animation = 'none';
    setTimeout(() => {
        container.style.animation = 'fadeIn 0.5s';
    }, 10);
}

// Prevent default touch behaviors
document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.question-container') || e.target.closest('.player-selection')) {
        return;
    }
}, { passive: false });

document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.question-container') || e.target.closest('.player-selection')) {
        return;
    }
    e.preventDefault();
}, { passive: false });

