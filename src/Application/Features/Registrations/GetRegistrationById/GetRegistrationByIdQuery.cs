namespace Application.Features.Registrations.GetRegistrationById;

using Application.Abstractions.Messaging;
using Application.Features.Registrations;
using Domain.Common;

public sealed record GetRegistrationByIdQuery(Guid Id) : IQuery<Result<RegistrationResponse>>;
