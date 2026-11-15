namespace Domain;

using Domain.Enums;

public static class RegistrationFees
{
    public static decimal For(RegistrationType type) => type switch
    {
        RegistrationType.Exhibitor => 1500m,
        RegistrationType.Competitor => 2500m,
        RegistrationType.VIP => 5000m,
        _ => 0m
    };
}
