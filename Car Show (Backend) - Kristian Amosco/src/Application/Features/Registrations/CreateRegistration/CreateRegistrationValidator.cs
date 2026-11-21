namespace Application.Features.Registrations.CreateRegistration;

using Domain;
using Domain.Enums;
using FluentValidation;

public sealed class CreateRegistrationValidator : AbstractValidator<CreateRegistrationCommand>
{
    public CreateRegistrationValidator()
    {
        RuleFor(x => x.ParticipantName)
            .NotEmpty().WithMessage("'Participant Name' must not be empty.")
            .MaximumLength(150).WithMessage("'Participant Name' must not exceed 150 characters.");

        RuleFor(x => x.ContactNumber)
            .NotEmpty().WithMessage("'Contact Number' must not be empty.")
            .Matches(@"^09\d{9}$").WithMessage("'Contact Number' must follow the 09XXXXXXXXX format.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("'Email' must not be empty.")
            .EmailAddress().WithMessage("'Email' must be a valid email address.")
            .MaximumLength(200).WithMessage("'Email' must not exceed 200 characters.");

        RuleFor(x => x.Address)
            .NotEmpty().WithMessage("'Address' must not be empty.")
            .MaximumLength(300).WithMessage("'Address' must not exceed 300 characters.");

        RuleFor(x => x.CarMakeModel)
            .NotEmpty().WithMessage("'Car Make Model' must not be empty.")
            .MaximumLength(100).WithMessage("'Car Make Model' must not exceed 100 characters.");

        RuleFor(x => x.PlateNumber)
            .NotEmpty().WithMessage("'Plate Number' must not be empty.")
            .MaximumLength(15).WithMessage("'Plate Number' must not exceed 15 characters.");

        RuleFor(x => x.RegistrationType)
            .NotEmpty().WithMessage("'Registration Type' must not be empty.")
            .Must(BeAValidType).WithMessage("'Registration Type' must be Exhibitor, Competitor, or VIP.");

        RuleFor(x => x.AmountPaid)
            .GreaterThanOrEqualTo(0).WithMessage("'Amount Paid' must be 0 or more.");

        RuleFor(x => x.AmountPaid)
            .Must((command, amountPaid) => !TryParseType(command.RegistrationType, out var type) || amountPaid <= RegistrationFees.For(type))
            .WithMessage((command, amountPaid) => TryParseType(command.RegistrationType, out var type)
                ? $"'Amount Paid' cannot be more than the fee ({RegistrationFees.For(type):N0})."
                : "'Amount Paid' is invalid.");
    }

    private static bool BeAValidType(string value) => TryParseType(value, out _);

    private static bool TryParseType(string value, out RegistrationType type) =>
        Enum.TryParse(value, true, out type) && Enum.IsDefined(type);
}
