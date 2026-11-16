namespace Application.Features.Registrations.CreateRegistration;

using Application.Abstractions.Messaging;
using Application.Features.Registrations;
using Domain.Common;

public sealed record CreateRegistrationCommand(
    string ParticipantName,
    string ContactNumber,
    string Email,
    string Address,
    string CarMakeModel,
    string PlateNumber,
    string RegistrationType,
    decimal AmountPaid) : ICommand<Result<RegistrationResponse>>;
