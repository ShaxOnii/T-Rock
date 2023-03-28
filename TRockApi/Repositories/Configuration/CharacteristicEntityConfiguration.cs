using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;
using TRockApi.Repositories.Models;

namespace TRockApi.Repositories.Configuration {
    public class CharacteristicEntityConfiguration : IEntityTypeConfiguration<CharacteristicModel> {

        public void Configure(EntityTypeBuilder<CharacteristicModel> builder) {
            builder.Property(e => e.Details).HasConversion(
                v => JsonConvert.SerializeObject(
                    v,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}
                ),
                value => JsonConvert.DeserializeObject<CharacteristicDetails>(
                    value,
                    new JsonSerializerSettings {NullValueHandling = NullValueHandling.Ignore}
                )
            );

        }
    }
}