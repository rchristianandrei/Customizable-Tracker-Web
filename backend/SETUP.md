## Setup

1. Install dependencies

   ```
   dotnet restore
   ```

2. Create .env file

   ```
   ConnectionStrings__DefaultConnection=Server=localhost;Port=3306;Database=MyAppDb;User=myuser;Password=MyPass123;
   ```

   - for mySql address

3. Install dotnet tool if needed

   ```
   dotnet tool install --global dotnet-ef
   ```

4. Update Database

   ```
   terminal> dotnet ef database update
   ```

   or

   ```
   package-manager-console> update-database
   ```

5. Run application

   ```
   dotnet run --launch-profile https (https)
   dotnet run (http)
   ```
