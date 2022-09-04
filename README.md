### `yarn`

run yarn to install all the node modules before running yarn start make sure your node -v is 16+

### `yarn start`

run localhost in browser, "Google Chrome would be the best" 

http://localhost:3000


### `yarn test`

to run all the unit/jest tests

Technologies using:

- React
- Typescript 
- Redux Toolkit
- Styled Components
- Jest

Features: 
- This webapp is using HashRouter because of the glitch with github
- Page not found if you go on some dodgy url http://localhost:3000/#/1232 it will take you to http://localhost:3000/#/404
- This project is using root/src path system so the imports will look like this src/main/bll/...
- This project is using index imports. So there are index.ts files in each folder and we export our files inside of it. So than after we can export multiple    files from the same folder for example: import {Chart, Holder, Currency} from "src/main/components". Instead of having 10 imports from different folder.
- Error Handling - We have snackbar that will pop up if there are any errors - either Network error or some logical error the snackbar will pop up in the left corner.
- Loader / Bare simple loader nothing fancy. Loading everytime we fetch new data / unless data has been hashed.
- I did setup ES-lint + Prettier but it was spazing out so I had removed it for now.
- Responsivness its done on the basic level there is better ways to do the chart. but I chose just simple scroll to make sure that the chart is not really small and you can see at least something on the screen.
- The chart can be done better but i'm not sure what I have to put in it since I do not have maket or design with what I have to do...
- I did not have time to do unit test to cover createAsync requests