# Oreka

## Description
Oreka is a journal to help you in your monthly plannification, trying to find balance between your personal/professional life, improving the content of your lifetime. It has eigth sections: habits to adopt, skills to learn, appointments, places to visit, people to see, reward, finance and monthly insights. 
It is built with React, Node.js and MongoDB as a final project for the Ironhack’s bootcamp.
With Oreka you can create a monthly template where you see different areas of your life on a single page, allowing you to follow-up your evolution in a financial way and the accomplishments of your goals.
The next features to add to the tool will be a weekly/daily planner, financial yearly.


## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it’s my fault
- **Signup:** As an anon I can sign up in the platform so that I can start creating a new sheet in my agenda.
- **Login:** As a user I can login to the platform so that I can see my profile
- **Logout:** As a user I can logout from the platform so no one else can use it
- **Add month Model** As a user I can create a new month template.
- **See an specific month/year** As a user I want to see my month journal, the list of tasks and the results of my accomplishments while it’s done.
- **Update month Model.** As a user I want to edit my monthly tasks.
- **See a summary of month/year and update user info.** As a user I want to see my profile, with my financial balance, and results of my performance every month, and edit the profile.


## Backlog
- Financial: plan vs real.
- Financial: to have yearly views rendering all months and year-totals by incomes/expenses
- Financial: to have a wealth area with you assets: real state, cars, etc...
- Other (non-financial): yearly view, weekly view.
- Other: deadlines for tasks.
- Other (non-financial): email warnings when deadline is close or overdue.
- User data: to update email, password, photo and add other fields like: email for example.
- Other: user arrows (next/previous) to change months sequentially on dashboard and summary pages.


# Client

## Routes
| Path | Component | Permissions | Behavior | 
|------|--------|--| -------|
 `/dashboard` | HomePageComponent| public/user | Link to login and signup in public and user's dashboard if user logged |
| `/signup` | SignupPageComponent| anon only| signup form, link to login, navigate to homepage after signup|
| `/login` | LoginPageComponent | anon only |login form, link to signup, navigate to homepage after login |
| `/user` | UserSummaryComponent| user only| user's ToDos and financial summary|


## Components

- HomeNoUser component
  - Input: empty
  - Output: empty
- Login component
  - Input: user: any
  - Output: user object
- Signup component
  - Input: user: any
  - Output: user object
- Dashboard component
  - Input: user object, month and year
  - Output: agenda object
- User component
  - Input: user object, month and year
  - Output: agenda and user objects (for summary)

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.imageUpload(file)
  - auth.logout()
  - auth.me()
- Agenda Service
  - agenda.create(user, month, year)
  - agenda.update(user, month, year, MonthToDos)
  - agenda.getOne(user, month, year)
- User Service
  - user.update(user, user info)


# Server

## Models
```
user={
  email: String
  password: String,
  username: String,
  usersurname: String,
  age: Number,
  userImgUrl: String,
}

agenda={
  userId:{type: Schema.Types.ObjectId, ref:'user'},
  year: Number,
  month: Number,
  habits: [{
  	habitToDoDesc: String,
  	habitDoneTick: Boolean
  }],
  skills: [{
  	skillToDoDesc: String,
  	skillDoneTick: Boolean
  }],
  health: [{
  	healthToDoDesc: String,
  	healthDoneTick: Boolean
  }],
  appointments: [{
  	appointmentDesc: String
  }],
  peopleToMeet: [{
  	personToMeetDesc: String
  ],
  placesToVisit: [{
  	placeToVisit: String
  ],
  finance: [
  	[
			{
			incomeDesc: String,
			incomeAmount: Number
			}	  
	  ]
	  [
	  {
			expenseDesc: String,
			expenseAmount: Number
			}	 
	  ]
  ],
  reward: String,
  insights: String
}
```

## Data structure

### Front-end routes

- ('/dashboard') : dashboard page with agenda if user logged in or home page with login/signup links
- ('/login') : login page
- ('/signup') : signup page
- ('/user') : dashboard page with agenda summary and user info.  

## API Endpoints (backend routes)

- GET /auth/me
  - 404 if no user in session
  - 200 with user object
- POST /auth/signup
  - 401 if user logged in
  - body:
    - email
    - password
    - name
    - surname
    - age
    - userImgUrl
  - validation
    - fields not empty (422)
    - email exists (409)
  - create user with encrypted password
  - store user in session
  - 200 with user object
- POST /auth/login
  - 401 if user logged in
  - body:
    - email
    - password
  - validation
    - fields not empty (422)
    - email not exists (404)
    - password doesn't match (404)
  - store user in session
  - 200 with user object
- POST /auth/logout
  - body: (empty)
  - 204
- GET /agenda?year=YYYY&month=MM
  - validation
    - exists current month/year or nearst first one.
  - 404 if no user in session
  - 200 with agenda for requested month/year and message: "New month complete view provided.".
  - 201 with empty object and message: "There is NOT this month and year in your agenda yet.".
- POST /agendacreate
  - body:
    - user_id
    - year
    - month
  - 405 if error an message: "It has NOT been possible to create your agenda new month."
  - 200 with agenda object and message: "New month added to your agenda."
- PUT /agendamodify/:id
  - body:
    - userId
    - year
    - month
    - habits [ { habitToDoDesc, habitDoneTick } ]
    - skills [ { skillToDoDesc, skillDoneTick } ]
    - health [ { healthToDoDesc, healthDoneTick } ]
    - appointments [ { appointmentDesc } ]
    - peopleToMeet [ { personToMeetDesc } ]
    - placesToVisit [ { placeToVisitDesc } ]
    - Finance [ [ { incomeDesc, incomeAmount } ] [ { expenseDesc, expenseAmount } ] ]
    - reward
    - insights
  - validation
    - id is not valid (404) and message: "You have been trying to update and invalid agenda id."
    - habitDoneTick ticked and habitToDoDesc empty (436) and message: "Habits ticked needs a description.".
    - skillDoneTick ticked and skillToDoDesc empty (431) and message: "Skills ticked needs a description.".
    - healthDoneTick ticked and healthToDoDesc empty (432)  and message: "Health ticked needs a description.".
    - incomeAmount <> 0 and incomeDesc empty (434) and message: "Income can't be 0."
    - expenseAmount <> 0 and expenseDesc empty (435) "Expense can't be 0".
  - updated agenda object and message: "Your month has been updated.".
- PUT /usermodify/:id
  - body:
    - password
    - name
    - surname
    - age
    - userImgUrl
  - Validation
    - fields not empty (422)
  - updated user object


## Links


### Trello
[Link url](https://trello.com/b/xG4ZZmtF/final-project-m3)


### Git
URls for the project repo and deploy
[Link Repo Server](https://github.com/AMN69/oreka-server)
[Link Repo Client](https://github.com/AMN69/oreka-client)
[Link Deploy])~~


### ~~Slides~~
~~URls for the project presentation (slides)~~
~~[Link Slides.com~~]()