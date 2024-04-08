using System.Security.Cryptography;
using System.Text;
using Server.Services.Interfaces;

namespace Server.Services;

public class PasswordService : IPasswordService
{
    public string HashPassword(string password, string login)
    {
        var pbkdf2 = new Rfc2898DeriveBytes(password, Encoding.UTF8.GetBytes(login), 10000, HashAlgorithmName.MD5);
        var hash = pbkdf2.GetBytes(20);
        return Convert.ToBase64String(hash);
    }

    public bool VerifyPassword(string password, string login, string hash)
    {
        var myHash = HashPassword(password, login);
        return myHash == hash;
    }

    public string GeneratePassword()
    {
        var chars = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890#;";

        var password = new StringBuilder();
        var random = new Random((int)DateTime.Now.Ticks);

        for (int i = 0; i < 8; i++)
        {
            var index = random.Next(chars.Length);
            password.Append(chars[index]);
        }

        return password.ToString();
    }
}