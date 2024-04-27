using Server.Services.Interfaces;
using SluggyUnidecode;

namespace Server.Services;

public class UrlService : IUrlService
{
    public string GetUrlFromString(string str)
    {
        var r = new Random();
        return str.ToSlug("-").ToLower() + "-" + (int)(r.NextDouble() * 10000000);
    }
}