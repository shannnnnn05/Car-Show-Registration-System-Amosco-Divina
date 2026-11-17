namespace Application.Features.Registrations.CreateRegistration;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations;
using Domain;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public sealed class CreateRegistrationCommandHandler(IAppDbContext dbContext)
    : ICommandHandler<CreateRegistrationCommand, Result<RegistrationResponse>>
{
    public async Task<Result<RegistrationResponse>> Gibohon(
        CreateRegistrationCommand command,
        CancellationToken cancellationToken = default)
    {
        var plateNumber = command.PlateNumber.Trim();

        var duplicatePlate = await dbContext.Registrations
            .AnyAsync(r => r.PlateNumber.ToLower() == plateNumber.ToLower(), cancellationToken);

        if (duplicatePlate)
        {
            return Result<RegistrationResponse>.Failure(Error.Conflict(
                "Registration.Conflict",
                $"A registration with plate number '{plateNumber}' already exists."));
        }

        if (!Enum.TryParse<RegistrationType>(command.RegistrationType, true, out var registrationType))
        {
            return Result<RegistrationResponse>.Failure(Error.Validation(
                "Registration.Validation",
                "Registration type is not valid."));
        }

        var numbers = await dbContext.Registrations
            .AsNoTracking()
            .Select(r => r.RegistrationNumber)
            .ToListAsync(cancellationToken);

        var nextNumber = numbers
            .Select(number => int.TryParse(number.Replace("CS27-", string.Empty), out var value) ? value : 0)
            .DefaultIfEmpty(0)
            .Max() + 1;

        var registration = new Registration
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = $"CS27-{nextNumber:D4}",
            RegistrationDate = DateTime.UtcNow,
            ParticipantName = command.ParticipantName.Trim(),
            ContactNumber = command.ContactNumber.Trim(),
            Email = command.Email.Trim(),
            Address = command.Address.Trim(),
            CarMakeModel = command.CarMakeModel.Trim(),
            PlateNumber = plateNumber,
            RegistrationType = registrationType,
            Status = RegistrationStatus.Pending,
            RegistrationFee = RegistrationFees.For(registrationType),
            AmountPaid = command.AmountPaid
        };

        dbContext.Registrations.Add(registration);
        await dbContext.SaveChangesAsync(cancellationToken);

        return Result<RegistrationResponse>.Success(RegistrationResponse.Gikan(registration));
    }
}
