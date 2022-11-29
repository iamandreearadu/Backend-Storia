module.exports = (mongoose) => {
  const Event = mongoose.model(
    "events",
    mongoose.Schema(
      {
        event: String,
        location: String,
        guest: String,
        date: String,
        hour: String,
        duration: Number,
        price: Number,
        free: Boolean,
        tel: Number,
      },
      {
        timestamps: true,
      }
    )
  );
  return Event;
};
