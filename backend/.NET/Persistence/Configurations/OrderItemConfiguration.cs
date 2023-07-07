using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configurations
{
  public class OrderItemConfiguration : IEntityTypeConfiguration<OrderItem>
  {
    public void Configure(EntityTypeBuilder<OrderItem> builder)
    {
      builder.HasKey(p => new { p.OrderId, p.ProductId });
      builder.Property(p => p.UnitPrice).IsRequired();
      builder.Property(p => p.Quantity).IsRequired();

      builder.HasOne(p => p.Order)
        .WithMany(p => p.OrderItems)
        .HasForeignKey(p => p.OrderId);
      builder.HasOne(p => p.Product)
      .WithMany(p => p.OrderItems)
      .HasForeignKey(p => p.ProductId);
    }
  }
}