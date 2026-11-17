namespace Application.Abstractions.Messaging;

public interface IQueryHandler<in TQuery, TResponse>
    where TQuery : IQuery<TResponse>
{
    Task<TResponse> Kuaon(TQuery query, CancellationToken cancellationToken = default);
}
