using MailKit.Net.Smtp;
using MimeKit;
using Server.Services.Interfaces;

namespace Server.Services;

public class EmailService : IEmailService
{
    private async Task SendEmailAsync(string email, string subject, string message)
    {
        using var emailMessage = new MimeMessage();

        emailMessage.From.Add(new MailboxAddress("Система безопасности",
            Program.Program.Config["Email"].ToString()));
        emailMessage.To.Add(new MailboxAddress("", email));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
        {
            Text = message
        };

        using var client = new SmtpClient();
        await client.ConnectAsync("smtp.mail.ru", 25, false);
        await client.AuthenticateAsync(Program.Program.Config["Email"].ToString(),
            Program.Program.Config["EmailPassword"].ToString());
        await client.SendAsync(emailMessage);

        await client.DisconnectAsync(true);
    }

    public async Task SendConfirmationUrl(string email, string url)
    {
        await SendEmailAsync(email, "Подтвердите почту",
            $"Чтобы активировать свой аккаунт на сайте pp.yakovlev05.ru, <a href='{url}'>перейдите по ссылке</a>");
    }

    public async Task SendNewPassword(string email, string password)
    {
        await SendEmailAsync(email, "Сброс пароля pp.yakovlev05.ru", $"<h3>Ваш новый пароль: {password}</h3>");
    }
}