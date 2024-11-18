namespace Gatemeter.Events;

public interface IUpdateEventEmitter
{
    public Action Update { get; set; }
    public Action LateUpdate { get; set; }
}
