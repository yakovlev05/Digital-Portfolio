using System.Text.RegularExpressions;
using MailKit.Net.Smtp;
using MimeKit;
using Server.Services.Interfaces;

namespace Server.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    private async Task SendEmailAsync(string email, string subject, string message)
    {
        using var emailMessage = new MimeMessage();

        emailMessage.From.Add(new MailboxAddress("Система безопасности", _configuration["Email"]));
        emailMessage.To.Add(new MailboxAddress("", email));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
        {
            Text = message
        };

        using var client = new SmtpClient();
        await client.ConnectAsync("smtp.mail.ru", 25, false);
        await client.AuthenticateAsync(_configuration["Email"], _configuration["EmailPassword"]);
        try
        {
            await client.SendAsync(emailMessage);
        }
        catch
        {
            Console.WriteLine($"Ошибка отправки email на {email}");
        }


        await client.DisconnectAsync(true);
    }

    public async Task SendConfirmationUrl(string email, string token)
    {
        await SendEmailAsync(email, "Подтвердите почту",
            $"Чтобы активировать свой аккаунт на сайте pp.yakovlev05.ru, " +
            $"<a href='https://pp.yakovlev05.ru/confirm?token={token}&email={email}'>перейдите по ссылке</a>");
    }

    public async Task SendNewPassword(string email, string password)
    {
        await SendEmailAsync(email, "Сброс пароля pp.yakovlev05.ru", $"<h3>Ваш новый пароль: {password}</h3>");
    }

    public async Task SendPasswordResetUrl(string email, string token)
    {
        await SendEmailAsync(email,
            "Ссылка на сброс пароля",
            $"Для сброса пароля перейдите по ссылке: <a href='https://pp.yakovlev05.ru/set-password?token={token}&email={email}'>ссылка</a>");
    }

    public bool ValidateEmail(string email)
    {
        var regex = new Regex("^([^ ]+@[^ ]+\\.[a-z]{2,6}|)$");
        return regex.IsMatch(email);
    }
}