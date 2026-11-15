namespace Application.Features.Registrations.GetRegistrations;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations;
using Domain.Common;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public sealed class GetRegistrationsQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetRegistrationsQuery, Result<GetRegistrationsResponse>>
{
    public async Task<Result<GetRegistrationsResponse>> HandleAsync(
        GetRegistrationsQuery query,
        CancellationToken cancellationToken = default)
    {
        var page = query.Page ?? 1;
        var pageSize = query.PageSize ?? 10;
        var registrations = dbContext.Registrations.AsNoTracking().AsQueryable();

        if (!string.IsNullOrWhiteSpace(query.ParticipantName))
        {
            var name = query.ParticipantName.Trim().ToLower();
            registrations = registrations.Where(r => r.ParticipantName.ToLower().Contains(name));
        }

        if (!string.IsNullOrWhiteSpace(query.Type) &&
            Enum.TryParse<RegistrationType>(query.Type, true, out var type))
        {
            registrations = registrations.Where(r => r.RegistrationType == type);
        }

        if (!string.IsNullOrWhiteSpace(query.Status) &&
            Enum.TryParse<RegistrationStatus>(query.Status, true, out var status))
        {
            registrations = registrations.Where(r => r.Status == status);
        }

        var totalCount = await registrations.CountAsync(cancellationToken);
        var totalPages = totalCount == 0
            ? 0
            : (int)Math.Ceiling(totalCount / (double)pageSize);

        var items = await registrations
            .OrderByDescending(r => r.RegistrationDate)
            .ThenByDescending(r => r.RegistrationNumber)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(r => new RegistrationResponse(
                r.Id,
                r.RegistrationNumber,
                r.RegistrationDate,
                r.ParticipantName,
                r.ContactNumber,
                r.Email,
                r.Address,
                r.CarMakeModel,
                r.PlateNumber,
                r.RegistrationType,
                r.Status,
                r.RegistrationFee,
                r.AmountPaid,
                r.AmountPaid <= 0
                    ? PaymentStatus.Unpaid
                    : r.AmountPaid < r.RegistrationFee
                        ? PaymentStatus.Partial
                        : PaymentStatus.Paid))
            .ToListAsync(cancellationToken);

        return Result<GetRegistrationsResponse>.Success(new GetRegistrationsResponse(
            items,
            page,
            pageSize,
            totalCount,
            totalPages));
    }
}
