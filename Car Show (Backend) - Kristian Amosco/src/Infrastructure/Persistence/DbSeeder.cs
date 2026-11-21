namespace Infrastructure.Persistence;

using Domain;
using Domain.Entities;
using Domain.Enums;
using Microsoft.EntityFrameworkCore;

public static class DbSeeder
{
    public static async Task SeedAsync(AppDbContext dbContext, CancellationToken cancellationToken = default)
    {
        if (await dbContext.Registrations.AnyAsync(cancellationToken))
        {
            return;
        }

        var start = new DateTime(2026, 10, 20, 8, 30, 0, DateTimeKind.Utc);

        var samples = new (string Name, string Contact, string Email, string Address, string Car, string Plate, RegistrationType Type, RegistrationStatus Status, decimal Paid, int Hour)[]
        {
            ("Juan Dela Cruz", "09171234567", "juan.delacruz@example.com", "123 Rizal St., Naga City", "Toyota Supra MK4", "ABC 1234", RegistrationType.Competitor, RegistrationStatus.Confirmed, 1000m, 0),
            ("Maria Santos", "09182234567", "maria.santos@example.com", "45 Mabini St., Sorsogon City", "Honda Civic Type R", "XYZ 5678", RegistrationType.Exhibitor, RegistrationStatus.Pending, 0m, 2),
            ("Ricardo Reyes", "09193234567", "ricardo.reyes@example.com", "78 Bonifacio Ave., Legazpi City", "Nissan GT-R R35", "VIP 0001", RegistrationType.VIP, RegistrationStatus.CheckedIn, 5000m, 5),
            ("Ana Villanueva", "09204234567", "ana.villanueva@example.com", "12 Luna St., Bulan, Sorsogon", "Mazda RX-7 FD", "DEF 2345", RegistrationType.Competitor, RegistrationStatus.Cancelled, 0m, 7),
            ("Carlos Mendoza", "09215234567", "carlos.mendoza@example.com", "89 Quezon Blvd., Sorsogon City", "Ford Mustang GT", "GHI 6789", RegistrationType.Exhibitor, RegistrationStatus.Confirmed, 1500m, 9),
            ("Liza Fernandez", "09226234567", "liza.fernandez@example.com", "34 Del Pilar St., Gubat, Sorsogon", "Porsche 911 Carrera", "JKL 0123", RegistrationType.VIP, RegistrationStatus.Confirmed, 2500m, 12),
            ("Mark Aquino", "09237234567", "mark.aquino@example.com", "67 Burgos St., Casiguran, Sorsogon", "Subaru WRX STI", "MNO 4567", RegistrationType.Competitor, RegistrationStatus.Pending, 0m, 14),
            ("Grace Lim", "09248234567", "grace.lim@example.com", "90 Magsaysay Dr., Sorsogon City", "BMW M3 Competition", "PQR 8901", RegistrationType.Exhibitor, RegistrationStatus.CheckedIn, 1500m, 17),
            ("Paolo Garcia", "09259234567", "paolo.garcia@example.com", "23 Roxas St., Irosin, Sorsogon", "Chevrolet Camaro SS", "STU 2345", RegistrationType.VIP, RegistrationStatus.Pending, 0m, 19),
            ("Sofia Torres", "09260234567", "sofia.torres@example.com", "56 Aguinaldo St., Matnog, Sorsogon", "Honda NSX", "VWX 6789", RegistrationType.Competitor, RegistrationStatus.Confirmed, 2500m, 22),
            ("Miguel Ramos", "09271234567", "miguel.ramos@example.com", "18 Katipunan St., Barcelona, Sorsogon", "Mitsubishi Lancer Evo X", "YZA 0123", RegistrationType.Exhibitor, RegistrationStatus.Pending, 500m, 25),
            ("Camille Cruz", "09282234567", "camille.cruz@example.com", "41 Rizal Ave., Prieto Diaz, Sorsogon", "Toyota GR86", "BCD 4567", RegistrationType.Competitor, RegistrationStatus.CheckedIn, 2500m, 28),
            ("Rafael Bautista", "09293234567", "rafael.bautista@example.com", "72 Zamora St., Pilar, Sorsogon", "Audi RS5", "EFG 8901", RegistrationType.VIP, RegistrationStatus.Cancelled, 1000m, 31),
            ("Isabel Navarro", "09304234567", "isabel.navarro@example.com", "15 Mabini Ext., Sorsogon City", "Hyundai Ioniq 5 N", "HIJ 2345", RegistrationType.Exhibitor, RegistrationStatus.Confirmed, 1500m, 34),
            ("Daniel Pascual", "09315234567", "daniel.pascual@example.com", "38 Bonifacio St., Donsol, Sorsogon", "Nissan Silvia S15", "KLM 6789", RegistrationType.Competitor, RegistrationStatus.Pending, 1000m, 37),
            ("Patricia Ong", "09326234567", "patricia.ong@example.com", "64 Luna Ave., Magallanes, Sorsogon", "Lexus LC 500", "NOP 0123", RegistrationType.VIP, RegistrationStatus.CheckedIn, 5000m, 40),
            ("Jose Ramirez", "09337234567", "jose.ramirez@example.com", "87 Del Rosario St., Bulusan, Sorsogon", "Volkswagen Golf GTI", "QRS 4567", RegistrationType.Exhibitor, RegistrationStatus.Confirmed, 750m, 43),
            ("Angela Salazar", "09348234567", "angela.salazar@example.com", "29 Zamora Ave., Sorsogon City", "Toyota GR Yaris", "TUV 8901", RegistrationType.Competitor, RegistrationStatus.Confirmed, 2500m, 46),
            ("Ferdinand Cruz", "09359234567", "ferdinand.cruz@example.com", "53 Burgos Ave., Juban, Sorsogon", "Mercedes-AMG C63", "WXY 2345", RegistrationType.VIP, RegistrationStatus.Pending, 0m, 49),
            ("Bianca Flores", "09360234567", "bianca.flores@example.com", "76 Rizal St., Castilla, Sorsogon", "Mazda MX-5 Miata", "ZAB 6789", RegistrationType.Exhibitor, RegistrationStatus.Cancelled, 0m, 52),
            ("Enrique Mercado", "09371234567", "enrique.mercado@example.com", "14 Aguirre St., Sorsogon City", "Subaru BRZ", "CDE 0123", RegistrationType.Competitor, RegistrationStatus.CheckedIn, 1500m, 55),
            ("Teresa Domingo", "09382234567", "teresa.domingo@example.com", "47 Magallanes St., Bacon, Sorsogon", "Porsche Taycan Turbo", "FGH 4567", RegistrationType.VIP, RegistrationStatus.Confirmed, 5000m, 58),
            ("Alfonso Padilla", "09393234567", "alfonso.padilla@example.com", "82 Mabini St., Sta. Magdalena, Sorsogon", "Ford Focus RS", "IJK 8901", RegistrationType.Exhibitor, RegistrationStatus.Pending, 0m, 61),
            ("Natalia Robles", "09404234567", "natalia.robles@example.com", "25 Luna St., Sorsogon City", "Honda Integra Type R", "LMN 2345", RegistrationType.Competitor, RegistrationStatus.Cancelled, 500m, 64),
            ("Gabriel Soriano", "09415234567", "gabriel.soriano@example.com", "59 Bonifacio St., Pilar, Sorsogon", "Audi TT RS", "OPQ 6789", RegistrationType.VIP, RegistrationStatus.CheckedIn, 2500m, 67)
        };

        var registrations = samples.Select((sample, index) => new Registration
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = $"CS27-{index + 1:D4}",
            RegistrationDate = start.AddHours(sample.Hour),
            ParticipantName = sample.Name,
            ContactNumber = sample.Contact,
            Email = sample.Email,
            Address = sample.Address,
            CarMakeModel = sample.Car,
            PlateNumber = sample.Plate,
            RegistrationType = sample.Type,
            Status = sample.Status,
            RegistrationFee = RegistrationFees.For(sample.Type),
            AmountPaid = sample.Paid
        }).ToList();

        dbContext.Registrations.AddRange(registrations);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
