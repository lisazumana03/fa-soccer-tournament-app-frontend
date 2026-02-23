# Welcome to GoalGrid
### By: Lisa Zumana

This guide will explain how you use the soccer tournament application.

## Questions I asked myself when designing the application:
### 1. Why did I choose this application?
- Because of my love for football, I wanted to create my own tournament application to track my team's progression whether I play a FIFA tournament or simulate my own tournament.
- I wanted to challenge myself by building a full-stack application that includes both frontend and backend development.
- I wanted to learn how to implement features such as match simulation and tournament brackets, which require careful consideration of data structures and algorithms.
- I wanted to create an application that could be useful for football fans and players to manage their tournaments and track their teams' progress.

### 2. What features did I want to include in the application?
- A dashboard to view all the teams in the tournament and their stats.
- A tournament bracket to visualize the progression of the teams.
- A match simulation feature to simulate matches between teams and update the tournament bracket accordingly.
- A team management feature to add, edit, and delete teams from the tournament.
- A match history feature to view the results of past matches.
- A user-friendly interface to easily navigate through the application.
- A responsive design to ensure the application works well on different devices.
- A feature to export tournament data for record-keeping or sharing with others.
- A feature to import tournament data to easily set up new tournaments based on previous ones.
- A player management feature to add, edit, and delete players from teams, and track their performance throughout the tournament.
- Kit management feature to manage team kits and display them in the tournament bracket and match simulations. (whether the kit is home or away, and the colors of the kit)
- Managerial feature to manage team managers and display their information in the tournament bracket and match simulations.
- A feature to allow users to create and manage their own tournaments, including user authentication and authorization for personalized features.

### 3. What technologies did I use to build the application?
- **Frontend**: React.js for building the user interface, Tailwind CSS for styling, and React Router for navigation.
- **Backend**: Spring Boot for building the RESTful API, JPA/Hibernate for database interactions, and PostgreSQL/ MongoDB for the database.
- **Testing**: Jest and React Testing Library for frontend testing, and JUnit for backend testing.
- **Deployment**: Docker for containerization and AWS for hosting the application.
- **Other Tools**: Git for version control, Postman for API testing, and Swagger for API documentation.

### 4. What challenges did I face while building the application?
- **State Management**: Managing the state of the application, especially with the tournament bracket and match simulations, was complex. I had to ensure that the state updates correctly and efficiently without causing unnecessary re-renders.
- **Data Consistency**: Ensuring data consistency between the frontend and backend was a challenge, especially when simulating matches and updating the tournament bracket. I had to implement proper error handling and validation to prevent data corruption.
- **Responsive Design**: Designing a responsive interface that works well on different devices was challenging. I had to use media queries and flexible layouts to ensure the application looks good and functions properly on both desktop and mobile devices.
- **Testing**: Writing comprehensive tests for both the frontend and backend was time-consuming and required careful consideration of edge cases and potential bugs. I had to learn how to use testing tools effectively to ensure the application is robust and reliable.
- **Deployment**: Deploying the application to a production environment was a challenge, especially with

### 5. What more could I have done to improve the application?
- **User Authentication**: Implementing user authentication and authorization to allow users to create and manage their own tournaments would enhance the user experience and provide more personalized features.
- **Real-time Updates**: Implementing real-time updates using WebSockets or a similar technology would allow users to see live updates of the tournament bracket and match results without needing to refresh the page.
- **Advanced Match Simulation**: Enhancing the match simulation feature to include more detailed statistics and factors (e.g., player performance, weather conditions) would make the simulations more realistic and engaging.
- **Mobile App**: Developing a mobile app version of the application would allow users to manage their tournaments on the go and provide a more seamless experience across different devices.

### 6. What did I learn from building this application?
- I learned how to design and implement a full-stack application using React.js for the frontend and Spring Boot for the backend.
- I gained experience in managing complex state and ensuring data consistency between the frontend and backend.
- I improved my skills in responsive design and creating user-friendly interfaces.
- I learned how to implement features such as match simulation and tournament brackets, which require careful consideration of data structures and algorithms.
- I also learned about the importance of testing and how to use tools like Jest and React Testing Library for frontend testing, as well as JUnit for backend testing.
- Overall, building this application was a valuable learning experience that allowed me to apply my knowledge of web development and improve my skills in building complex applications.

### 7. What are the future plans for the application?
- **User Authentication**: Implementing user authentication and authorization to allow users to create and manage their own tournaments.
- **Real-time Updates**: Implementing real-time updates using WebSockets to allow users to see live updates of the tournament bracket and match results.
- **Advanced Match Simulation**: Enhancing the match simulation feature to include more detailed statistics and factors for more realistic simulations.
- **Mobile App**: Developing a mobile app version of the application for a more seamless experience across different devices.
- **Additional Features**: Adding features such as player management, team rankings, and social sharing to enhance the user experience and provide more functionality.

## Instructions when running the application:
1) Clone the repository to your local machine.
2) Navigate to the project directory in your terminal.
3) Run `npm install` to install necessary plugins needed for the application.
4) Run `npm run build` to build the application.
5) Run `npm run dev` to access `http://localhost:2932/`

Enjoy using the application. (And if you have any suggestions for improvement, please let me know!)


