using Microsoft.AspNetCore;
using Microsoft.Extensions.FileProviders;

namespace Gatemeter;

public class StaticWebServer
{
    public StaticWebServer(string directory, int port)
    {
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
            .UseUrls($"http://localhost:{port}")
            .Build()
            .RunAsync();
    }
}
