# Geek Hunters

This application has 2 main components
  - REST API with:
     - ASP.NET Core 2.1
	 - ORM (EF Core)
  - Web Frontend:
	 - ReactJS

Unit test is VERY important. But given that I have 4 interviews within 1 week, the application does not have any unit tests implemented :(

The REST API provides the following contracts:
  - Retrieve all candidates
  - Retrieve candidates by skills
	 - Retrieve candidate(s) with conjunction skills (SQL and C#)
	 - Retrieve candidate(s) who has one of the skill sets (SQL or C#)
  - Create a new candidate
  - Retrieve all skills
  
The Web Frontend has the following features:
  - View all candidates
  - View candidates by skills 
  - Register a new candidate: 
	 - First name and last name are mandatory
	 - Skill is optional
Some features that are good to have but haven't been implemented yet: Pagination, Sorting, View candidates with conjunction of skills (customizable filters).

The SQLite database wasn't changed much - a CandidateSkill table was created to represent the relationship between candidates and skills. However, the ID type of Candidate and Skill tables are better with BIGINT.

Requisites to run the application:
  - .NET Core 2.1 Runtime
  - NPM
The Web Frontend has pre-build and post-build events configured. So if you are using VS 2017, you are able to get the app running easily.

Cheers
