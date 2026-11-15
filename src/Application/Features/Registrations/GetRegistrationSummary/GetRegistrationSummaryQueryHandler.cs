namespace Application.Features.Registrations.GetRegistrationSummary;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public sealed class GetRegistrationSummaryQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetRegistrationSummaryQuery, Result<GetRegistrationSummaryResponse>>
{
    public async Task<Result<GetRegistrationSummaryResponse>> HandleAsync(
        GetRegistrationSummaryQuery query,
        CancellationToken cancellationToken = default)
    {
        var registrations = dbContext.Registrations.AsNoTracking();

        var totalRegistrations = await registrations.CountAsync(cancellationToken);
        var confirmed = await registrations.CountAsync(r => r.Status == RegistrationStatus.Confirmed, cancellationToken);
        var checkedIn = await registrations.CountAsync(r => r.Status == RegistrationStatus.CheckedIn, cancellationToken);
        var pending = await registrations.CountAsync(r => r.Status == RegistrationStatus.Pending, cancellationToken);
        var cancelled = await registrations.CountAsync(r => r.Status == RegistrationStatus.Cancelled, cancellationToken);

        var money = await registrations
            .Where(r => r.Status != RegistrationStatus.Cancelled)
            .Select(r => new { r.RegistrationFee, r.AmountPaid })
            .ToListAsync(cancellationToken);

        var totalFees = money.Sum(r => r.RegistrationFee);
        var totalPayments = money.Sum(r => r.AmountPaid);

        return Result<GetRegistrationSummaryResponse>.Success(new GetRegistrationSummaryResponse(
            totalRegistrations,
            confirmed,
            checkedIn,
            pending,
            cancelled,
            totalFees,
            totalPayments,
            totalFees - totalPayments));
    }
}
