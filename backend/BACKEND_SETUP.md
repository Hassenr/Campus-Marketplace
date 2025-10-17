# Campus Marketplace - Setup Guide

## Environment Setup for Database Connection

This guide will help you set up the environment variable for the Supabase database password and run the application.

## Prerequisites

- Java 21 or higher
- Maven 3.6+
- Git

## Database Setup - Supabase

This project uses Supabase PostgreSQL as the database. The database password is stored as an environment variable for security.

## Step 1: Set Environment Variable

### For macOS/Linux (Terminal):

1. **Temporary setup (current session only):**
   ```bash
   export SPRING_DATASOURCE_PASSWORD="your_supabase_password"
   ```

2. **Permanent setup (all sessions):**
   ```bash
   # Open your shell profile
   nano ~/.zshrc  # or ~/.bash_profile for bash users
   
   # Add this line at the end
   export SPRING_DATASOURCE_PASSWORD="your_supabase_password"
   
   # Save and reload
   source ~/.zshrc
   ```

3. **Verify the variable is set:**
   ```bash
   echo $SPRING_DATASOURCE_PASSWORD
   ```

### For Windows:

1. **Command Prompt:**
   ```cmd
   set SPRING_DATASOURCE_PASSWORD=your_supabase_password
   ```

2. **PowerShell:**
   ```powershell
   $env:SPRING_DATASOURCE_PASSWORD="your_supabase_password"
   ```

## Step 2: Get Your Supabase Password

1. Log into [Supabase Dashboard](https://supabase.com/dashboard)
2. Go to Settings → Database
3. Copy the password from the connection info
4. Use this password in the environment variable

## Step 3: Run the Application

```bash
# Navigate to backend directory
cd backend

# Run with Maven
mvn spring-boot:run
```

## Running in IntelliJ IDEA

1. Open IntelliJ IDEA
2. Click the dropdown next to the Run button
3. Select "Edit Configurations..."
4. In Environment Variables section, click the folder icon
5. Add new variable:
   - Name: `SPRING_DATASOURCE_PASSWORD`
   - Value: `your_supabase_password`
6. Click OK and run the application

## Testing the Application

Once running, test the API:

```bash
# Test the users endpoint
curl http://localhost:8080/users

# Or open in browser
http://localhost:8080/users
```

## Available Endpoints

- `GET /users` - Retrieve all users from the database

## Common Issues

### Authentication Failed Error
```
FATAL: password authentication failed for user "postgres"
```
**Solution:** Make sure the environment variable is set correctly and you're running in the same terminal session.

### IntelliJ Run Button Not Working
**Solution:** Set the environment variable in IntelliJ's Run Configuration as described above.

### Port Already in Use
**Solution:** Kill the process using port 8080:
```bash
lsof -ti:8080 | xargs kill -9
```

### Reserved Keyword Error with "user" table
**Solution:** The `User` entity uses `@Table(name = "users")` to avoid PostgreSQL reserved keyword conflicts.

## Project Structure

```
Campus-Marketplace/
├── backend/
│   ├── src/main/resources/
│   │   └── application.properties    # Supabase configuration
│   ├── src/main/java/com/campusmarketplace/
│   │   ├── controller/MarketplaceController.java
│   │   ├── Entity/
│   │   │   ├── User.java
│   │   │   ├── Post.java
│   │   │   └── Message.java
│   │   ├── repository/
│   │   │   ├── UserRepository.java
│   │   │   ├── PostRepository.java
│   │   │   └── MessageRepository.java
│   │   └── service/
│   └── pom.xml
├── Frontend/
└── README.md
```

## Database Configuration Details

### Supabase Configuration (`application.properties`):
```properties
spring.application.name=Campus-Marketplace
spring.datasource.url=jdbc:postgresql://db.ljdlybensixzupgvqvug.supabase.co:5432/postgres?sslmode=require
spring.datasource.username=postgres
spring.datasource.password=${SPRING_DATASOURCE_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.datasource.driver-class-name=org.postgresql.Driver
```

## Security Note

Never commit passwords or sensitive credentials to Git. Always use environment variables for database credentials.

## Tech Stack

- **Backend:** Spring Boot 3.4.2, Java 21
- **Database:** PostgreSQL (Supabase)
- **ORM:** Hibernate/JPA
- **Build Tool:** Maven
- **Server:** Embedded Tomcat

## Getting Started

1. Clone the repository
2. Set up the environment variable for database password
3. Navigate to the backend directory
4. Run `mvn spring-boot:run`
5. Test the API at `http://localhost:8080/users`

For any issues, refer to the Common Issues section above.
