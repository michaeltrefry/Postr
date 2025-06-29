namespace Yapplr.Api.Services;

public interface IEmailService
{
    Task<bool> SendPasswordResetEmailAsync(string toEmail, string username, string resetToken, string resetUrl);
    Task<bool> SendEmailAsync(string toEmail, string subject, string htmlBody, string? textBody = null);
}
