Should my frontend and backend completely separate? 

# Resource
https://github.com/JL978/multiplayer-react-tic-tac-toe/blob/master/client/src/components/pages/Start.js
    Main component has state variables for newGame then pass for Choice component and Lobby component 

# Issues:
1. Joining and setting up users needs work 


# Frontend ( No User Needed ) 
1. How to track being "Out of bound"
2. Keep a game same size even when they scroll
3. 

# To Do
1. Start creating/joining a Lobby
2. Implement Game Logic 
    - How to display map? 
        = Should map be displayed by Client everytime? 
        = Server only sends out Opponent's location? (As well as standing data) 
3. 

# Finished 
1. Control Main Pages (Joining vs Creating a Lobby); don't worry about backend right now 

# Idea
Q. Allow zoom in to "increase" the size of the map? 


# Logic
0. (Main Page; App.js)
    - Control bottom 3 main pages (Start, Lobby, Game)
    State Varaibles: currentPage, host, lobby (server), loading, serverConfirmed

1. (Start page) Create or Join Lobby
    - Create: Choose your Username, Color, Map (show Game ID)
        - Set Host, 
    - Join: Choose your Username, Insert Lobby Code
        - Or join a random game

2. (Lobby Page) 
   - 1 ~ 5 players, colors (8 choices), map, show and copy lobby code
   - Ready button
   - Start button (only by a host; require one person to be ready at least)
   - Kick Button (Host can do this)

3. (Game Page)
    - Show Maps, Player, Opponents locations, Players Colors, Countdown, Timer, 
    - Show a Leader 
    = Once all players finish and game is over, diplsay their standing, time, and # of deaths 
    = Afterward, return to Lobby page 

Some Ideas: 
    3. How long it took to finish the game
    4. Before the game start, mouse/icon can't leave the starting area
    5. If a user steps out of boundary, they start over
    6. If a user encounters all black color, they die 
    7. Icon/vehicle is literally just one dot for simplicity


Backend
    1. Keep track of who wons
    2. how long it took to finish the game



# 
fetch("/api")
.then((res) => res.json())
.then((data) => setData(data.message));
