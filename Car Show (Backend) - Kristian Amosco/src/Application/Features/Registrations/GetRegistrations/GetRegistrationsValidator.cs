namespace Application.Features.Registrations.GetRegistrations;

using Domain.Enums;
using FluentValidation;

public sealed class GetRegistrationsValidator : AbstractValidator<GetRegistrationsQuery>
{
    public GetRegistrationsValidator()
    {
        RuleFor(x => x.ParticipantName)
            .MaximumLength(150).WithMessage("'Participant Name' must not exceed 150 characters.");

        RuleFor(x => x.Type)
            .Must(value => string.IsNullOrWhiteSpace(value) || IsDefined<RegistrationType>(value))
            .WithMessage("'Type' must be Exhibitor, Competitor, or VIP.");

        RuleFor(x => x.Status)
            .Must(value => string.IsNullOrWhiteSpace(value) || IsDefined<RegistrationStatus>(value))
            .WithMessage("'Status' must be Pending, Confirmed, CheckedIn, or Cancelled.");

        RuleFor(x => x.Page)
            .Must(value => value is null || value >= 1)
            .WithMessage("'Page' must be 1 or more.");

        RuleFor(x => x.PageSize)
            .Must(value => value is null || value is >= 1 and <= 50)
            .WithMessage("'Page Size' must be between 1 and 50.");
    }

    private static bool IsDefined<TEnum>(string value) where TEnum : struct, Enum =>
        Enum.TryParse<TEnum>(value, true, out var parsed) && Enum.IsDefined(parsed);
}
