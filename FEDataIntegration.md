# Frontend Data Integration

## Before you start, makesure that you follow the [backend setup guide](https://github.com/Song0180/CZ3003-HUF#backend-setup) to have the server successfully running on your machine

## Also, we need use [axios](https://www.npmjs.com/package/axios) (a Promise based HTTP client for the browser and node.js) to make API calls to the server. This JS package is newly added, so let's install it on your machine.

1. make sure you are in the `frontend` folder
2. run command `yarn install`
3. you should see axios being added

Having the setup done, let's start both the frontend and the server:

- start frontend: run `yarn start` in the `frontend` folder as we usually do
- start server (you may open a new terminal to do this):
  1. before you start, make sure you are in the python virtual environment (you should see `(env)` in your terminal)
     > you can activate the virtual environment by command:  
     > **This time you should be in the root project folder**  
     > On Windows: `\env\Scripts\activate.bat`  
     > On MacOS: `source env/bin/activate`
  2. start the server by running `python manage.py runserver`
  3. you should see ther server running at `http://localhost:8000`

---

## The overall flow of data integration

We will be using `fetch games`, which is a GET request as an example

1. Add API functions that will be used to call the backend APIs. API functions should be put in `frontend/src/services/api`

   > Note that we try to categorize the API functions for better maintainability.
   > API functions should be put in the corresponding folder.  
   > E.g., if this api is game related, it should be put in `frontend/src/services/api/game/index.js`  
   > Create a new folder (e.g., `/dashboard`) under the `/api` folder and add an `index.js` file in that folder if they do not already exist.

   Sample code of fetch games in `frontend/src/services/api/game/index.js`:

   ```JavaScript
   // add this import statement before you write api functions if it is not added
   import yelp from '../../yelp';

   // api function to call 'localhost:8000/hufgames'
   export const fetchGames = async () => {
     try {
       const response = await yelp.get('/hufgames', {});
       return response;
     } catch (err) {
       return err.message;
     }
   };
   ```

2. Add states and functions that updates the state in the corresponding data store. Data stores are located in `frontend/src/services/zustand`

   A data store looks like this:

   ```JavaScript
    import create from 'zustand';

    // import statements for api functions

    // other import statements, if any
    const initialState = {
      // initial states with default value
      // (normally set to null, an empty string '', or an empty array [])
    };

    // the data store hook that consists of states & functions that update states
    // by convention, the hook is named as `use{what this store is about}Store`
    // e.g., if this store is for game data, then the hook is named `useGameStore`
    export const useXXXStore = create((set, get) => ({
      ...initialState, // initialize the initialState (i.e., default states)
      // functions definitions
    }));

   ```

   For example, this is how our game store looks like:

   ```JavaScript
    import create from 'zustand';

    // Step 1: import the API function for fetching games in the /api/game folder
    import { fetchGames } from '../../api/game';

    // Step 2: add initial states
    const initialState = {
      isLoading: false, // state to indicate the data is loading
      games: [], // at the begining, we have an empty array of game objects
    };

    // game store hook
    export const useGameStore = create((set, get) => ({
      // activate the initial states (you don't need to do anything here)
      ...initialState,
      // Step 3: add a function to update the state we need to use (e.g., games and isLoading).
      // This function will be called in our page components (e.g., GamesPage)
      // It should be async by default.
      fetchGames: async () => {
        // set the isLoading to true, so our UI can show loading animation depending on the value of isLoading state
        set({ isLoading: true });
        // call the API function, which returns the response from the server
        const result = await fetchGames();

        // if a string is returned, it means it is an error message
        if (typeof result === 'string') {
          // return the error message directly
          return result;
        } else {
          // if the result is not a string, it means the API call is successful
          // set the data in the response result to the `games` state (i.e., update the `games` state)
          const games = result.data;
          set({ games: games });
        }
        // state is updated, set loading state to false
        set({ isLoading: false });
      },
    }));

   ```

   > You can simply follow the store sturcture above (copy & paste) to create a new data store if it is not created yet.

3. Now we have our data store, we are ready to update our page UI using the states and functions from the data store.

   - Open the page that needs data from the backend. (`GamesPage` in this case, which is located at `frontend/src/pages/GamesPage/index.js`).
   - Import the datastore by adding a line:
     > `import { useGameStore } from '../../services/zustand/game';`
   - Get the state and function we need from the data store in our page component:

     ```JavaScript
      const GamesPage = () => {
        // states: isLoading, games
        // function: fetchGames
        const { isLoading, games, fetchGames } = useGameStore();
        ...
      }
     ```

   - Call the function to fetch data wherever needed and supply the corresponding UI components with the data in the state:

     `isLoading`:

     ```JSX
           <div className='games-container'>
             ...
             <List

               <!-- pass the isLoading state to the skeleton componnet, so that it can show the loading animation accordingly -->

               loading={isLoading}
               dataSource={filteredGames}
               renderItem={(item, index) => (
                 <List.Item key={JSON.stringify(item) + index}>

                 <!-- pass the isLoading state to the skeleton componnet, so that it can show the loading animation accordingly -->

                   <Skeleton loading={isLoading} active>
                     <GameCard
                       title={item.game_name}
                       creator={item.user_id}
                       tag={item.game_tag}
                       onClick={() => handleOnClickGameCard(item)}
                     />
                   </Skeleton>
                 </List.Item>
               )}
             />
           </div>
     ```

     `games` & `fetchGames`:

     ```JavaScript
        const [filteredGames, setFilteredGames] = React.useState([]);

        // useEffect hook to call the fetchGames function when the page is rendered
        React.useEffect(() => {
          const fetchData = async () => {
            // remember? the fetchGames will return an error message when the api call is not successful
            const errorMessage = await fetchGames();
            // if this error message is not null
            if (errorMessage) {
              // prompt the user error messages
              message.error('Failed to fetch games. Contact Admin for support.');
              message.error(errorMessage);
            } else {
              // prompt the user messages (optional since it is successful)
              message.success('Successfully fetched latest games list');
            }
          };
          fetchData();
        }, [fetchGames]);

        React.useEffect(() => {
          // set the initial state of filteredGames to the games fetched from the server
          setFilteredGames(games);
        }, [games]);

        // function to handle the search operation
        const handleOnSearch = React.useCallback(
          (searchValue) => {
            const lowercaseSearchValue = searchValue.toLowerCase();
            // filter games based on search string
            const updatedFilteredGames = games.filter((game) =>
              game.game_name.toLowerCase().includes(lowercaseSearchValue)
            );
            setFilteredGames(updatedFilteredGames);
          },
          [games]
        );

        <List
            loading={isLoading}
            <!-- pass the filteredGames (which is initial as games) to the list componnet, so that it can render the game cards accordingly -->
            dataSource={filteredGames}
            renderItem={(item, index) => (
              <List.Item key={JSON.stringify(item) + index}>
                <Skeleton loading={isLoading} active>
                  <GameCard
                    title={item.game_name}
                    creator={item.user_id}
                    tag={item.game_tag}
                    onClick={() => handleOnClickGameCard(item)}
                  />
                </Skeleton>
              </List.Item>
            )}
          />

     ```

## That should be it. Ask me any questions when in doubt :)
