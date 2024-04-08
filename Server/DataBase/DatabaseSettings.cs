namespace Server.DataBase;

public static class DatabaseSettings
{
    private static readonly string Host = "portfolioDB";
    private static readonly string Port = "5432";
    private static readonly string? Username = Program.Program.Config["POSTGRES_USER"]?.ToString();
    private static readonly string? Password = Program.Program.Config["POSTGRES_PASSWORD"]?.ToString();
    private static readonly string? Database = Program.Program.Config["POSTGRES_DB"]?.ToString();

    public static string CreateConnectionString() =>
        $"Host={Host};Port={Port};Username={Username};Password={Password};Database={Database};";
}