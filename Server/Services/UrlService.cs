using Server.Services.Interfaces;
using SluggyUnidecode;

namespace Server.Services;

public class UrlService : IUrlService
{
    public string GetUrlFromString(string str)
    {
        return str.ToSlug("-").ToLower();
    }
}