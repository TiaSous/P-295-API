using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class BookConfiguration : IEntityTypeConfiguration<BookEntity>
{
    public void Configure(EntityTypeBuilder<BookEntity> builder)
    {
        builder.HasOne(l => l.Category)
            .WithMany(c => c.Books)
            .HasForeignKey(l => l.FkCategory)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(l => l.Author)
            .WithMany(a => a.Books)
            .HasForeignKey(l => l.FkAuthor)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(l => l.Publisher)
            .WithMany(e => e.Books)
            .HasForeignKey(l => l.FkPublisher)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(l => l.User)
            .WithMany(u => u.Books)
            .HasForeignKey(l => l.FkUser)
            .OnDelete(DeleteBehavior.Restrict);
    }
}