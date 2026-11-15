namespace Application.Features.Registrations.GetRegistrations;

using Application.Abstractions.Messaging;
using Application.Features.Registrations;
using Domain.Common;

public sealed class GetRegistrationsQuery : IQuery<Result<GetRegistrationsResponse>>
{
    public string? ParticipantName { get; set; }
    public string? Type { get; set; }
    public string? Status { get; set; }
    public int? Page { get; set; }
    public int? PageSize { get; set; }
}

public sealed record GetRegistrationsResponse(
    IReadOnlyList<RegistrationResponse> Items,
    int Page,
    int PageSize,
    int TotalCount,
    int TotalPages);
