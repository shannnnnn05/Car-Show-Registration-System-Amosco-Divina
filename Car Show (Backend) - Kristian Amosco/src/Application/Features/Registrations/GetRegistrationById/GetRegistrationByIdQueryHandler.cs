namespace Application.Features.Registrations.GetRegistrationById;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetRegistrationByIdQueryHandler(IAppDbContext dbContext)
    : IQueryHandler<GetRegistrationByIdQuery, Result<RegistrationResponse>>
{
    public async Task<Result<RegistrationResponse>> Kuaon(
        GetRegistrationByIdQuery query,
        CancellationToken cancellationToken = default)
    {
        var registration = await dbContext.Registrations
            .AsNoTracking()
            .FirstOrDefaultAsync(r => r.Id == query.Id, cancellationToken);

        if (registration is null)
        {
            return Result<RegistrationResponse>.Failure(Error.NotFound(
                "Registration.NotFound",
                $"Registration with id '{query.Id}' was not found."));
        }

        return Result<RegistrationResponse>.Success(RegistrationResponse.Gikan(registration));
    }
}
