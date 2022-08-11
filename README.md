Should my frontend and backend completely separate? 
https://embiem.github.io/react-canvas-draw/

# Resource
https://github.com/JL978/multiplayer-react-tic-tac-toe/blob/master/client/src/components/pages/Start.js

https://embiem.github.io/react-canvas-draw/

Game Rule:
    1. Start and End area
        - Set initial position to 'Start'
        - Once Player reaches End, the icon disappears and Header is updated (ie. "Finished!")
    2. Roads (White/Grey Color)
        - If go out of binds, start over (Set initial position to Start)


# To DO
    1. Game Component
        2. Canvas + LazyMouse
            - Show Mouse Icon and follow as it hover
            - Starting Position and End Position
            - If I go out of bounds (entering certain background color, )
            - Can Zoom In


# Issues:
socket.emit - will send back message to sender only,
io.emit     - will send message to all the client including sender
socket.broadcast.emit - if you want to send message to all but not back to sender 


- A kicked user will be taken back to Home
    - Kicked User gets an alert 
    - Kicked player is returned to Home
    - Other users get updated players array
        - For this, just return the ID/Name of kicked player and refresh 'players' hook variable on frontend

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
