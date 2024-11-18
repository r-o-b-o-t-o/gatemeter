using Microsoft.AspNetCore;
using Microsoft.Extensions.FileProviders;
using System.Diagnostics;
using System.Runtime.InteropServices;

namespace Gatemeter;

public class StaticWebServer
{
    public StaticWebServer(string directory, int port)
    {
        string url = $"http://localhost:{port}";

        WebHost.CreateDefaultBuilder()
            .Configure(builder =>
            {
                builder.UseSpaStaticFiles(new StaticFileOptions()
                {
                    FileProvider = new PhysicalFileProvider(directory),
                });

                builder.UseSpa(spa =>
                {
                    spa.Options.DefaultPage = "/index.html";
                });
            })
            .UseWebRoot(directory)
            .UseUrls(url)
            .Build()
            .RunAsync();

        OpenUrl(url);
    }

    private static void OpenUrl(string url)
    {
        try
        {
            Process.Start(url);
        }
        catch
        {
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                Process.Start(new ProcessStartInfo(url)
                {
                    UseShellExecute = true
                });
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux))
            {
                Process.Start("xdg-open", url);
            }
            else if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            {
                Process.Start("open", url);
            }
            else
            {
                throw;
            }
        }
    }
}
