# Network project

Network is a desktop web application, a social network created based
on [free lessons on YouTube](https://www.youtube.com/watch?v=gb7gMluAeao&list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8).

This is a [React](https://react.dev/) project written in [Typescript](https://www.typescriptlang.org/) using tools
like

* [Ant Design](https://ant.design/) to create a user interface
* [React Router](https://reactrouter.com/en/main) to enables client side routing
* [Redux Toolkit](https://redux-toolkit.js.org/) tools for managing the application state, and in
  particular [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) to fetching and caching data

This project does not provide a registration mechanism,
so please register [here](https://social-network.samuraijs.com/signUp) to take full advantage of the application.

## Application Features

The application was created based on real social networks and includes the main functionality inherent in them:

* authorization,
* user's personal page with the ability to specify information about yourself and choose the design of your page,
* a page with a list of all network users, the ability to subscribe to the user of interest, as well as view his
  personal page,
* a general chat page, to which all users of the social network can connect and leave their messages there,
* settings page where the user can change the color theme of their app,
* news page (*only available in development mode*), presents a list of top headlines, and the ability to search for
  news by keywords, followed by filtering by several parameters

## Project implementation features

The Ant Design library used to build the UI provides a number of ready-made components, such as layout
components, Form, DatePicker, Pagination, which greatly speeds up the process of building the user interface
and allows me to create a unique application design.

The RTK Query utility has allowed me to declaratively describe the logic for fetching and mutation application data in one
place and provides convenient hooks for calling in components. Being able to do optimistic updates has allowed me to
make the UI feel faster. For example, this can be seen on the Users page: when you click on the Follow button, the
button state changes instantly (the label changes to Unfollow) while the request is still in process. The caching
mechanism performed well on the News page. The page contains pagination, as well as several filters: to select news by a
specific date or source, to change the sort order and the component in which the search is performed. Changes to all
these parameters could generate many identical requests for data with the same search parameters, but this does not
happen, because the data received during the request is cached and when requested with identical parameters, they are
simply retrieved from the cache. This is especially convenient given that the news API is free and has a limit on the
number of requests. (*Because the [News API](https://newsapi.org/) is free and only works in development mode, I wasn't
able to host the News
page in the production version of the app.*)

On the Chat page, interaction with the server takes place over the websocket protocol, which allows user to receive
messages from callers without having to send a request for updates or reload the page.

Changing the color theme of the application, as well as changing the banner on the user's personal page, work using
local storage. The API doesn't provide methods to get/change these metrics, but I wanted to add this functionality to
the app, so I'm using local storage to save the theme color and banner name value for each logged in user in a
particular browser.




