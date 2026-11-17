namespace Api.Features.Registrations;

using Api.Common.Extensions;
using Api.Common.Filters;
using Application.Abstractions.Messaging;
using Application.Features.Registrations;
using Application.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrationById;
using Application.Features.Registrations.GetRegistrationSummary;
using Application.Features.Registrations.GetRegistrations;
using Domain.Common;
using Microsoft.AspNetCore.Mvc;

public static class RegistrationEndpoints
{
    private const string GetByIdRouteName = "GetRegistrationById";

    public static void MapRegistrationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/registrations")
            .WithTags("Registrations");

        group.MapPost("/", MagRehistro)
            .AddEndpointFilter<ValidationFilter<CreateRegistrationCommand>>()
            .WithName("CreateRegistration")
            .WithSummary("Create a new registration")
            .Produces<RegistrationResponse>(StatusCodes.Status201Created)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status409Conflict);

        group.MapGet("/", KuaonTanan)
            .AddEndpointFilter<ValidationFilter<GetRegistrationsQuery>>()
            .WithName("GetRegistrations")
            .WithSummary("Get registrations with filters and paging")
            .Produces<GetRegistrationsResponse>()
            .ProducesValidationProblem();

        group.MapGet("/summary", KuaonKabilogan)
            .WithName("GetRegistrationSummary")
            .WithSummary("Get registration totals for the dashboard")
            .Produces<GetRegistrationSummaryResponse>();

        group.MapGet("/{id:guid}", KuaonPinaagiSaId)
            .WithName(GetByIdRouteName)
            .WithSummary("Get a registration by ID")
            .Produces<RegistrationResponse>()
            .ProducesProblem(StatusCodes.Status404NotFound);
    }

    private static async Task<IResult> MagRehistro(
        CreateRegistrationCommand command,
        ICommandHandler<CreateRegistrationCommand, Result<RegistrationResponse>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.Gibohon(command, cancellationToken);

        return result.IsSuccess
            ? TypedResults.CreatedAtRoute(result.Value, GetByIdRouteName, new { id = result.Value!.Id })
            : result.ToProblemDetails();
    }

    private static async Task<IResult> KuaonTanan(
        [AsParameters] GetRegistrationsQuery query,
        IQueryHandler<GetRegistrationsQuery, Result<GetRegistrationsResponse>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.Kuaon(query, cancellationToken);

        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> KuaonPinaagiSaId(
        Guid id,
        IQueryHandler<GetRegistrationByIdQuery, Result<RegistrationResponse>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.Kuaon(new GetRegistrationByIdQuery(id), cancellationToken);

        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }

    private static async Task<IResult> KuaonKabilogan(
        IQueryHandler<GetRegistrationSummaryQuery, Result<GetRegistrationSummaryResponse>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.Kuaon(new GetRegistrationSummaryQuery(), cancellationToken);

        return result.IsSuccess
            ? TypedResults.Ok(result.Value)
            : result.ToProblemDetails();
    }
}
